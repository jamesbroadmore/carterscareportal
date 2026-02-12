# 🌸 Carters Care Group - Care Management Platform

<div align="center">

![Carters Care Logo](data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMTAwIDEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICAgIDxjaXJjbGUgY3g9IjMwIiBjeT0iMzAiIHI9IjE1IiBmaWxsPSIjQzQxRThDIi8+CiAgICA8Y2lyY2xlIGN4PSI3MCIgY3k9IjMwIiByPSIxNSIgZmlsbD0iIzAwQTRFRiIvPgogICAgPGNpcmNsZSBjeD0iNTAiIGN5PSI1MCIgcj0iMTIiIGZpbGw9IiMxQTNCOEMiLz4KICAgIDxjaXJjbGUgY3g9IjIwIiBjeT0iNzAiIHI9IjE1IiBmaWxsPSIjRkY2QjM1Ii8+CiAgICA8Y2lyY2xlIGN4PSI1MCIgY3k9Ijc1IiByPSIxNSIgZmlsbD0iI0ZGQTUwMCIvPgogICAgPGNpcmNsZSBjeD0iODAiIGN5PSI3MCIgcj0iMTUiIGZpbGw9IiM3RENBM0MiLz4KPC9zdmc+)

**A comprehensive care management solution for modern care providers**

[Features](#-features) • [Getting Started](#-getting-started) • [User Guide](#-user-guide) • [Support](#-support)

</div>

---

## 📖 Overview

The Carters Care Platform is a modern, user-friendly care management system designed to streamline operations for care providers. Built with simplicity and efficiency in mind, it helps manage clients, staff, schedules, and compliance all in one place.

### ✨ Key Highlights

- 🎨 **Beautiful Interface** - Modern, intuitive design with smooth animations
- 🔐 **Secure Login** - Protected access with session management
- 📊 **Real-time Dashboard** - Live metrics and insights at a glance
- 💾 **Local Storage** - No internet required, data stays on your device
- 📱 **Fully Responsive** - Works perfectly on desktop, tablet, and mobile
- 🚀 **Zero Setup** - No installation, no configuration, just open and use

## 🎯 Features

### 👥 Client Management
- Add, edit, and delete client records
- Track care levels (Basic, Intermediate, Advanced)
- Store contact information and notes
- View client status at a glance

### 👔 Staff Management
- Manage staff members and their roles
- Track active/inactive status
- Store contact details and positions
- Quick staff overview

### ⚠️ Incident Management (NDIS Compliant)
- Report incidents with NDIS specific fields
- Track severity and types
- Record immediate actions and notifications (Emergency, Family, WA Dept)
- Status workflow (Open -> Closed)

### 📅 Schedule Management
- Create and manage shifts
- Assign staff to clients
- Visual calendar view
- Track shift times and notes
- Delete completed shifts

### ✅ Compliance Tracking
- Staff compliance checklists
- DBS checks tracking
- Training certifications
- Generate compliance reports

### ⚙️ Settings & Security
- Organization settings
- **Password Management** (Change password, Reset via Security Question)
- Export data (JSON format)
- Import data from backups
- Clear all data option

### 📈 Dashboard Analytics
- Active clients count
- Active staff count
- Weekly shifts overview
- Pending approvals
- Recent activity feed
- Quick action buttons

## 🚀 Getting Started

### System Requirements
- Modern web browser (Chrome, Firefox, Safari, Edge)
- JavaScript enabled
- 5MB localStorage space
- Screen resolution: 1024x768 or higher (recommended)

### Installation

### System Access & Roles

The system uses a Role-Based Access Control (RBAC) model:

- **Administrator:** Full system access.
- **Manager:** Full operational access (excluding system settings).
- **Coordinator:** Schedule, Clients, Staff (View), Notes.
- **Support Worker:** Schedule (My Shifts), Timesheets, Client Notes, Incidents.

### Super Admin Credentials

Use these credentials for initial system setup and management:

```
Email:    parker@cdxi.au
Password: D0ntPanic!
```

⚠️ **Security Note:** This Super Admin account has overriding privileges.

## 📚 User Guide

### First Time Setup

1. **Login as Super Admin**
   - Use the `parker@cdxi.au` credentials.

2. **Create Staff Accounts**
   - Navigate to **Staff**.
   - Click **+ Add Staff Member**.
   - Enter their details.
   - **Crucial:** Select a **System Role** (e.g., Coordinator) and set a **Login Password**.
   - Save.

3. **Distribute Credentials**
   - Provide the email and password to your staff member.
   - They can now log in with their own account.

4. **Add Clients**
   - Navigate to "Clients"
   - Click "+ Add Client"
   - Enter client information
   - Select care level
   - Click "Save Client"

5. **Create Shifts**
   - Navigate to "Schedule"
   - Click "+ Create Shift"
   - Select staff member and client
   - Choose date and times
   - Add notes (optional)
   - Click "Create Shift"

### Daily Operations

#### Managing Incidents (NDIS)
- **Report Incident:** Click "Incidents" -> "+ Report Incident"
- **Fill Details:** Complete all fields including NDIS checkboxes
- **Notifications:** Ensure strictly "WA Dept of Communities" is notified if reportable
- **Review:** Use the filter bar to see "Open" or "Critical" incidents

#### Managing Clients
- **View All Clients:** Click "Clients" in sidebar
- **Add New Client:** Click "+ Add Client" button
- **Edit Client:** Click "Edit" button next to client name
- **Delete Client:** Click "Delete" button (requires confirmation)

#### Managing Staff
- **View All Staff:** Click "Staff" in sidebar
- **Add New Staff:** Click "+ Add Staff Member" button
- **Edit Staff:** Click "Edit" button next to staff name
- **Delete Staff:** Click "Delete" button (requires confirmation)
- **Toggle Status:** Edit staff and check/uncheck "Active"

#### Managing Schedule
- **View Schedule:** Click "Schedule" in sidebar
- **Create Shift:** Click "+ Create Shift" button
- **View by Date:** Shifts are grouped by date automatically
- **Delete Shift:** Click "Delete" button on shift card

#### Compliance Tracking
- **View Checklist:** Click "Compliance" in sidebar
- **Check Items:** Click checkboxes to mark complete
- **Generate Report:** Click "Generate Report" button

### Data Management

#### Exporting Data
1. Navigate to "Settings"
2. Scroll to "Data Management"
3. Click "📥 Export Data"
4. Save the JSON file to a secure location
5. **Recommended:** Export weekly backups

#### Importing Data
1. Navigate to "Settings"
2. Click "📤 Import Data"
3. Select your JSON backup file
4. Confirm the import
5. Page will reload with imported data

#### Clearing Data
⚠️ **Warning:** This cannot be undone!
1. Navigate to "Settings"
2. Click "🗑️ Clear All Data"
3. Confirm twice
4. All data will be permanently deleted

### Tips & Best Practices

✅ **Do:**
- Export data backups regularly (weekly recommended)
- Use strong passwords for staff accounts
- Keep login credentials secure
- Update client and staff information promptly
- Review compliance checklist regularly
- Use descriptive notes in shifts

❌ **Don't:**
- Share login credentials
- Clear data without backing up first
- Use on public/shared computers without logging out
- Rely solely on browser storage for critical data

## 🎨 Interface Guide

### Navigation
- **Sidebar:** Main navigation menu (left side)
- **Top Bar:** Page title and user menu (top)
- **Main Area:** Current page content (center)

### Color Coding
- 🟣 **Purple (Primary):** Main actions and highlights
- 🔵 **Blue (Secondary):** Information and secondary actions
- 🟢 **Green:** Active status, success messages
- 🔴 **Red:** Delete actions, warnings
- 🟡 **Orange:** Warnings, pending items

### Status Indicators
- **Active:** Green badge
- **Inactive:** Red badge
- **Trend Badges:** Show percentage changes

## 🔧 Troubleshooting

### Common Issues

**Problem:** Can't login
- **Solution:** Check email and password. Ensure caps lock is off.

**Problem:** Data not saving
- **Solution:** Check localStorage is enabled, verify browser storage space

**Problem:** Page not loading correctly
- **Solution:** Refresh page (F5), clear cache, check JavaScript is enabled

**Problem:** Shifts not showing in calendar
- **Solution:** Ensure staff and clients exist, check date format, refresh page

**Problem:** Export not working
- **Solution:** Check browser allows downloads, try different browser

### Browser Console
For technical issues:
1. Press F12 to open Developer Tools
2. Click "Console" tab
3. Look for error messages (red text)
4. Share errors with support team

## 📱 Mobile Usage

The platform is fully responsive and works on mobile devices:

- **Portrait Mode:** Optimized for phone screens
- **Landscape Mode:** Tablet-friendly layout
- **Touch Friendly:** Large buttons and touch targets
- **Swipe Navigation:** Smooth scrolling and interactions

## 🔐 Security & Privacy

### Data Storage
- All data stored locally in your browser
- No data sent to external servers
- No tracking or analytics
- Complete privacy

### Session Security
- Sessions expire after 24 hours
- Automatic logout on session expiry
- Secure password handling (hashing/encryption recommended for production)

### Recommendations
- Use strong passwords
- Don't share credentials
- Logout when finished
- Regular data backups
- Use on trusted devices only

## 📊 Data Structure

### Export Format
Data is exported as JSON with the following structure:

```json
{
  "clients": [...],
  "staff": [...],
  "schedules": [...],
  "settings": {...},
  "exportDate": "2026-02-12T12:00:00.000Z"
}
```

## 🆘 Support

### Getting Help
1. Check this README
2. Review [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md)
3. Check browser console for errors
4. Contact your system administrator

### Reporting Issues
When reporting issues, include:
- Browser name and version
- Operating system
- Steps to reproduce
- Error messages (from console)
- Screenshots (if applicable)

## 🔄 Updates & Maintenance

### Version History
- **v1.2.0** (February 2026) - Enterprise Role Management
  - Super Admin (`parker@cdxi.au`) implementation.
  - Role-Based Access Control (Admin, Manager, Coordinator, Worker).
  - Staff Login capability.
- **v1.1.0** (February 2026) - NDIS & Aged Care Compliance Update
  - Incident Management (NDIS fields)
  - Pasword Reset & Management
  - UI Security Enhancements
- **v1.0.0** (February 2026) - Initial release
  - Full CRUD operations
  - Authentication system
  - Dashboard analytics
  - Data export/import
  - Responsive design

### Planned Features
- Backend integration
- Multi-user support
- Advanced reporting
- Email notifications
- Mobile app
- Calendar integrations

## 📄 License

Proprietary - Carters Care Group  
© 2026 Carters Care Group. All rights reserved.

## 🙏 Acknowledgments

Built with care for care providers.

---

<div align="center">

**Carters Care Group**  
*Care Management Platform v1.0.0*

Made with ❤️ for better care management

</div>
