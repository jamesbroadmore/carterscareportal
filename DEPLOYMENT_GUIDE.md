# Carters Care Platform - Full-Stack Deployment Guide

## 🌟 Overview
The Carters Care Platform is now a **Full-Stack Web Application** with a Node.js/Express backend and a responsive frontend. It uses file-based persistence by default for easy deployment and zero-configuration setup.

## 🚀 Quick Start (Local Development)

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Run in Development Mode**:
   ```bash
   npm run dev
   ```
   The app will be available at `http://localhost:3000`.

3. **Run in Production Mode**:
   ```bash
   npm start
   ```

## 📋 Architecture

- **Frontend**: Vanilla JS, CSS3, HTML5 (Single Page Application style)
- **Backend**: Node.js & Express.js
- **Database**: Local JSON Storage (stored in `/data` directory)
- **Authentication**: JWT-ready login system with local and server fallbacks

## 📂 File Structure

```
Carters_Care_Platform/
├── server.js               # Express Backend
├── package.json            # Dependencies & Scripts
├── .env                    # Environment Configuration
├── data/                   # JSON Database Files
├── src/                    # Frontend Assets
│   ├── js/                 # App Logic, Auth, Storage
│   ├── css/                # Styling
│   └── images/             # Media
└── index.html              # Main UI
```

## 🌐 Deployment Options

### 1. Docker (Recommended)
Build and run the container:
```bash
docker build -t carters-care .
docker run -p 3000:3000 carters-care
```

### 2. Vercel (Optimized for Serverless)
1. **Connect Repository**: Push your code to GitHub/GitLab.
2. **Import to Vercel**: Create a new project in the Vercel Dashboard.
3. **Environment Variables**: 
   - Add `MONGODB_URI` with your connection string.
   - *Note: Vercel's filesystem is read-only, so a database is required.*
4. **Deploy**: Vercel will automatically detect `vercel.json` and the `api/` folder.


### 3. Traditional VPS (DigitalOcean, AWS, Linode)
1. Clone the repository
2. Install Node.js and PM2
3. Run: `pm2 start server.js --name carters-care`

## 🔐 Security Configuration

### Environment Variables (.env)
- `PORT`: Server port (default 3000)
- `AUTH_SECRET`: Secret key for JWT/Sessions
- `DATA_DIR`: Path to data storage

### Default Credentials
- **Super Admin**: `parker@cdxi.au` / `D0ntPanic!`
- **Demo Admin**: `admin` / `CartersCare2026`

## ✅ Deployment Verification
1. [ ] Server starts without errors
2. [ ] `http://localhost:3000` loads the login screen
3. [ ] Login works with Super Admin credentials
4. [ ] Data persists after server restart (check `/data` files)
5. [ ] Dashboard metrics reflect the data in JSON files

---
**Version:** 2.0.0
**Status:** Full-Stack Enabled
**Last Updated:** February 2026
