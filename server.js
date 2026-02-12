// server.js - Updated with fixed version, proper imports, error handling, security improvements, and authentication handling

const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const session = require('express-session');
const { BlobServiceClient } = require('@azure/storage-blob');

// Load environment variables from .env file
dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Set up session middleware for authentication
app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
}));

// Azure Blob Storage client setup
const blobServiceClient = BlobServiceClient.fromConnectionString(process.env.AZURE_STORAGE_CONNECTION_STRING);

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    // Authenticate user
    if (username === process.env.USERNAME && password === process.env.PASSWORD) {
        req.session.user = username;
        return res.status(200).send('Login successful');
    }
    return res.status(401).send('Unauthorized');
});

app.get('/secure-data', (req, res) => {
    if (!req.session.user) {
        return res.status(403).send('Forbidden');
    }
    // Example secure data retrieval
    res.status(200).send('This is secured data');
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});