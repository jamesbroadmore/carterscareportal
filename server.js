const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const bcryptjs = require('bcryptjs');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;
const DATA_DIR = path.join(__dirname, 'data');
const NODE_ENV = process.env.NODE_ENV || 'development';

// ============================================
// MIDDLEWARE & CONFIG
// ============================================

app.use(cors({
    origin: process.env.CORS_ORIGIN || '*',
    credentials: true
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use(express.static(__dirname));

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Request logging middleware
app.use((req, res, next) => {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] ${req.method} ${req.path}`);
    next();
});

// ============================================
// AUTHENTICATION & SECURITY
// ============================================

const SUPER_ADMIN = {
    email: 'parker@cdxi.au',
    passwordHash: bcryptjs.hashSync('D0ntPanic!', 10)
};

const hashPassword = (password) => bcryptjs.hashSync(password, 10);
const verifyPassword = (password, hash) => bcryptjs.compareSync(password, hash);

// ============================================
// DATA MANAGEMENT HELPERS
// ============================================

const getData = (resource) => {
    try {
        const filePath = path.join(DATA_DIR, `${resource}.json`);
        if (!fs.existsSync(filePath)) return [];
        const data = fs.readFileSync(filePath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error(`Error reading ${resource}:`, error);
        return [];
    }
};

const saveData = (resource, data) => {
    try {
        const filePath = path.join(DATA_DIR, `${resource}.json`);
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
        return true;
    } catch (error) {
        console.error(`Error saving ${resource}:`, error);
        return false;
    }
};

// ============================================
// API ENDPOINTS - AUTHENTICATION
// ============================================

app.post('/api/auth/login', (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ 
                success: false, 
                error: 'Username and password required' 
            });
        }

        // Check Super Admin
        if (username.toLowerCase() === SUPER_ADMIN.email.toLowerCase()) {
            if (verifyPassword(password, SUPER_ADMIN.passwordHash)) {
                return res.json({
                    success: true,
                    user: {
                        id: 'super-admin',
                        name: 'Super Admin',
                        email: SUPER_ADMIN.email,
                        role: 'admin'
                    },
                    token: generateToken('super-admin', 'admin')
                });
            }
        }

        // Check staff database
        const staff = getData('staff');
        const user = staff.find(s => 
            s.email && s.email.toLowerCase() === username.toLowerCase() && s.active
        );

        if (!user) {
            return res.status(401).json({ 
                success: false, 
                error: 'Invalid credentials or account inactive' 
            });
        }

        // For existing staff, support both hashed and plain passwords (migration period)
        const passwordValid = user.passwordHash 
            ? verifyPassword(password, user.passwordHash)
            : password === user.password;

        if (!passwordValid) {
            return res.status(401).json({ 
                success: false, 
                error: 'Invalid credentials' 
            });
        }

        res.json({
            success: true,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role || 'worker'
            },
            token: generateToken(user.id, user.role || 'worker')
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ 
            success: false, 
            error: 'Server error during login' 
        });
    }
});

// ============================================
// HELPER FUNCTIONS
// ============================================

const generateToken = (userId, role) => {
    return Buffer.from(JSON.stringify({ userId, role, iat: Date.now() })).toString('base64');
};

const verifyToken = (token) => {
    try {
        return JSON.parse(Buffer.from(token, 'base64').toString());
    } catch {
        return null;
    }
};

const validateInput = (data, allowedFields) => {
    const validated = {};
    allowedFields.forEach(field => {
        if (field in data) {
            const value = data[field];
            if (typeof value === 'string') {
                validated[field] = value.trim().substring(0, 1000);
            } else {
                validated[field] = value;
            }
        }
    });
    return validated;
};

// ============================================
// API ENDPOINTS - GENERIC CRUD
// ============================================

// GET all resources
app.get('/api/:resource', (req, res) => {
    try {
        const { resource } = req.params;
        if (!resource.match(/^[a-z_]+$/)) {
            return res.status(400).json({ error: 'Invalid resource name' });
        }
        const data = getData(resource);
        res.json(data);
    } catch (error) {
        console.error('GET error:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

// GET single resource by ID
app.get('/api/:resource/:id', (req, res) => {
    try {
        const { resource, id } = req.params;
        if (!resource.match(/^[a-z_]+$/)) {
            return res.status(400).json({ error: 'Invalid resource name' });
        }
        const items = getData(resource);
        const item = items.find(i => i.id === id);
        if (!item) return res.status(404).json({ error: 'Not found' });
        res.json(item);
    } catch (error) {
        console.error('GET by ID error:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

// POST - Create new resource
app.post('/api/:resource', (req, res) => {
    try {
        const { resource } = req.params;
        if (!resource.match(/^[a-z_]+$/)) {
            return res.status(400).json({ error: 'Invalid resource name' });
        }

        const items = getData(resource);
        const newItem = {
            ...req.body,
            id: uuidv4(),
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };

        // Hash password for staff
        if (resource === 'staff' && newItem.password) {
            newItem.passwordHash = hashPassword(newItem.password);
            delete newItem.password; // Remove plain password
        }

        items.push(newItem);
        if (saveData(resource, items)) {
            res.status(201).json(newItem);
        } else {
            res.status(500).json({ error: 'Failed to save' });
        }
    } catch (error) {
        console.error('POST error:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

// PUT - Update resource
app.put('/api/:resource/:id', (req, res) => {
    try {
        const { resource, id } = req.params;
        if (!resource.match(/^[a-z_]+$/)) {
            return res.status(400).json({ error: 'Invalid resource name' });
        }

        let items = getData(resource);
        const index = items.findIndex(i => i.id === id);
        if (index === -1) return res.status(404).json({ error: 'Not found' });

        const updatedItem = {
            ...items[index],
            ...req.body,
            updatedAt: new Date().toISOString(),
            id: items[index].id, // Prevent ID changes
            createdAt: items[index].createdAt
        };

        // Hash new password for staff if provided
        if (resource === 'staff' && req.body.password) {
            updatedItem.passwordHash = hashPassword(req.body.password);
            delete updatedItem.password;
        }

        items[index] = updatedItem;
        if (saveData(resource, items)) {
            res.json(updatedItem);
        } else {
            res.status(500).json({ error: 'Failed to save' });
        }
    } catch (error) {
        console.error('PUT error:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

// DELETE - Remove resource
app.delete('/api/:resource/:id', (req, res) => {
    try {
        const { resource, id } = req.params;
        if (!resource.match(/^[a-z_]+$/)) {
            return res.status(400).json({ error: 'Invalid resource name' });
        }

        let items = getData(resource);
        const initialLength = items.length;
        items = items.filter(i => i.id !== id);

        if (items.length === initialLength) {
            return res.status(404).json({ error: 'Not found' });
        }

        if (saveData(resource, items)) {
            res.status(204).send();
        } else {
            res.status(500).json({ error: 'Failed to delete' });
        }
    } catch (error) {
        console.error('DELETE error:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

// ============================================
// HEALTH CHECK
// ============================================

app.get('/api/health', (req, res) => {
    res.json({ 
        status: 'ok', 
        version: '2.0.0',
        environment: NODE_ENV
    });
});

// ============================================
// SPA FALLBACK
// ============================================

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// ============================================
// ERROR HANDLING
// ============================================

app.use((err, req, res, next) => {
    console.error('Unhandled error:', err);
    res.status(500).json({ 
        error: 'Internal server error' 
    });
});

// ============================================
// SERVER START
// ============================================

module.exports = app;

if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`\n✅ Carters Care Platform Server`);
        console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
        console.log(`🌐 Server: http://localhost:${PORT}`);
        console.log(`📁 Data Directory: ${DATA_DIR}`);
        console.log(`🔧 Environment: ${NODE_ENV}`);
        console.log(`📦 Version: 2.0.0`);
        console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`);
    });
}