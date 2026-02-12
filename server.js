const path = require('path');
const { v4: uuidv4 } = require('uuid');
const mongoose = require('mongoose');

require('dotenv').config();
const MONGODB_URI = process.env.MONGODB_URI;
const IS_MONGODB = !!MONGODB_URI;

const app = express();
const PORT = process.env.PORT || 3000;
const DATA_DIR = path.join(__dirname, 'data');

// --- Database Configuration ---
if (IS_MONGODB) {
    mongoose.connect(MONGODB_URI)
        .then(() => console.log('✅ Connected to MongoDB Atlas'))
        .catch(err => console.error('❌ MongoDB connection error:', err));
} else {
    // Ensure data directory exists for local JSON fallback
    if (!fs.existsSync(DATA_DIR)) {
        fs.mkdirSync(DATA_DIR);
    }
    console.log('📂 Using local JSON storage');
}

// Define Generic Schema for MongoDB (flexible for any resource)
const GenericSchema = new mongoose.Schema({
    id: String,
    createdAt: { type: String, default: () => new Date().toISOString() },
    updatedAt: String
}, { strict: false });

const getModel = (resource) => mongoose.models[resource] || mongoose.model(resource, GenericSchema);

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname)); // Serve static files from root

// Helper to get data
const getData = async (resource) => {
    if (IS_MONGODB) {
        return await getModel(resource).find({}).lean();
    } else {
        const filePath = path.join(DATA_DIR, `${resource}.json`);
        if (!fs.existsSync(filePath)) return [];
        return JSON.parse(fs.readFileSync(filePath, 'utf8'));
    }
};

// Helper to save data (for local) or update (for Mongo)
const saveData = async (resource, data, newItem = null) => {
    if (IS_MONGODB) {
        if (newItem) {
            await getModel(resource).create(newItem);
        } else {
            // For Bulk updates or specific logic
            // In Mongo, we typically update individual items via API calls
        }
    } else {
        const filePath = path.join(DATA_DIR, `${resource}.json`);
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    }
};

// --- API Endpoints ---

// Generic GET all
app.get('/api/:resource', async (req, res) => {
    const { resource } = req.params;
    const data = await getData(resource);
    res.json(data);
});

// Generic GET by ID
app.get('/api/:resource/:id', async (req, res) => {
    const { resource, id } = req.params;
    const items = await getData(resource);
    const item = items.find(i => i.id == id);
    if (!item) return res.status(404).json({ error: 'Not found' });
    res.json(item);
});

// Generic POST (Create)
app.post('/api/:resource', async (req, res) => {
    const { resource } = req.params;
    const newItem = { ...req.body, id: uuidv4(), createdAt: new Date().toISOString() };

    if (IS_MONGODB) {
        await getModel(resource).create(newItem);
    } else {
        const items = await getData(resource);
        items.push(newItem);
        await saveData(resource, items);
    }
    res.status(201).json(newItem);
});

// Generic PUT (Update)
app.put('/api/:resource/:id', async (req, res) => {
    const { resource, id } = req.params;
    const updates = { ...req.body, updatedAt: new Date().toISOString() };

    if (IS_MONGODB) {
        const item = await getModel(resource).findOneAndUpdate({ id: id }, updates, { new: true });
        if (!item) return res.status(404).json({ error: 'Not found' });
        res.json(item);
    } else {
        let items = await getData(resource);
        const index = items.findIndex(i => i.id == id);
        if (index === -1) return res.status(404).json({ error: 'Not found' });

        items[index] = { ...items[index], ...updates };
        await saveData(resource, items);
        res.json(items[index]);
    }
});

// Generic DELETE
app.delete('/api/:resource/:id', async (req, res) => {
    const { resource, id } = req.params;

    if (IS_MONGODB) {
        const result = await getModel(resource).findOneAndDelete({ id: id });
        if (!result) return res.status(404).json({ error: 'Not found' });
        res.status(204).send();
    } else {
        let items = await getData(resource);
        const initialLength = items.length;
        items = items.filter(i => i.id != id);

        if (items.length === initialLength) {
            return res.status(404).json({ error: 'Not found' });
        }

        await saveData(resource, items);
        res.status(204).send();
    }
});

// Auth endpoint
app.post('/api/auth/login', async (req, res) => {
    const { username, password } = req.body;

    // 1. Check Default Admin
    if (username === 'admin' && password === 'CartersCare2026') {
        return res.json({
            success: true,
            user: { name: 'Admin', role: 'admin' },
            token: 'mock-jwt-token-' + Date.now()
        });
    }

    // 2. Check Staff Database
    const staff = await getData('staff');
    const user = staff.find(s =>
        (s.email && s.email.toLowerCase() === username.toLowerCase()) &&
        s.password === password &&
        s.active
    );

    if (user) {
        res.json({
            success: true,
            user: {
                id: user.id,
                name: user.name,
                role: user.role || 'worker',
                email: user.email
            },
            token: 'mock-jwt-token-' + Date.now()
        });
    } else {
        res.status(401).json({ success: false, error: 'Invalid credentials or account inactive' });
    }
});

// Fallback to index.html for unknown routes (SPA behavior)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Export for Netlify Functions
module.exports = app;

if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`Server running at http://localhost:${PORT}`);
        console.log('Static files served from:', __dirname);
        console.log('Data files stored in:', DATA_DIR);
    });
}
