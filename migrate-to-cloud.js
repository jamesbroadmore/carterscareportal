const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI;
const DATA_DIR = path.join(__dirname, 'data');

if (!MONGODB_URI) {
    console.error('❌ MONGODB_URI not found in .env file');
    process.exit(1);
}

const GenericSchema = new mongoose.Schema({ id: String }, { strict: false });

async function migrate() {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log('✅ Connected to MongoDB');

        const files = fs.readdirSync(DATA_DIR).filter(f => f.endsWith('.json'));

        for (const file of files) {
            const resource = file.replace('.json', '');
            const data = JSON.parse(fs.readFileSync(path.join(DATA_DIR, file), 'utf8'));

            if (Array.isArray(data) && data.length > 0) {
                const Model = mongoose.models[resource] || mongoose.model(resource, GenericSchema);

                console.log(`⏳ Migrating ${resource} (${data.length} items)...`);

                // Clear existing data in the cloud to avoid duplicates on first run
                await Model.deleteMany({});
                await Model.insertMany(data);

                console.log(`✅ ${resource} migrated successfully.`);
            }
        }

        console.log('\n✨ Database attachment complete!');
        process.exit(0);
    } catch (error) {
        console.error('❌ Migration failed:', error);
        process.exit(1);
    }
}

migrate();
