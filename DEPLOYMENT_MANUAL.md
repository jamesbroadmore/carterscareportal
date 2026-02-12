# Carters Care Platform - Deployment & Handover Manual
## 🚀 System Overview
**Version:** 1.3.0 (Enterprise Compliance Edition)
**Target Environment:** Local / Web Server (Static Hosting)

This manual guides the administrator through the final checks and deployment process for the Carters Care Platform.

---

## 📋 1. Pre-Deployment Checklist
Before handing over to staff, ensure the following configuration is complete:

### **User Accounts (RBAC)**
- [ ] **Super Admin:** Log in with `parker@cdxi.au` / `D0ntPanic!`
- [ ] **Create Staff:** Go to **Staff Management**. Add your core team.
- [ ] **Assign Roles:** Ensure at least one `Manager` is assigned.
- [ ] **Passwords:** Set initial passwords for all staff.

### **Compliance Data**
- [ ] **Qualifications:** Enter WWCC, Police Check, and First Aid expiry dates for all staff.
- [ ] **Onboarding:** Verify new staff have completed NDIS Module & Code of Conduct.
- [ ] **Blocking Test:** Try to approve a timesheet for a staff member with incomplete onboarding. *It should block you.*

### **Client Data**
- [ ] **Load Clients:** Add active clients in **Client Management**.
- [ ] **Care Plans:** Ensure Care Levels and Notes are accurate.

---

## 🔧 Technical Architecture
- **Frontend:** HTML5, CSS3, Vanilla JavaScript (ES6+).
- **Backend:** Simulation using `localStorage`. Application state persists in the browser.
- **Security:**
  - Role-Based Access Control (Admin/Manager/Coord/Worker).
  - Session Management (24h expiry).
  - Compliance Blocking logic (Payment protection).

---

## 🚨 Troubleshooting & FAQ

**Q: I can't approve a timesheet.**
A: Check the staff member's profile. If "Onboarding" checks are missing, payment is blocked by NDIS compliance rules.

**Q: The detailed settings are missing.**
A: You are likely logged in as a Manager or Coordinator. Only `Admin` role can access Organization and Data Management settings.

**Q: How do I backup data?**
A: Currently data is stored in the browser. Use **Settings > Data Management > Export JSON** (Planned Feature). For now, do not clear browser cache.

---

## 📅 Maintenance Schedule
- **Daily:** Check **Incidents** dashboard for new reports.
- **Weekly:** Run **Compliance Report** to check for expiring qualifications.
- **Monthly:** Audit **User Access** and deactivate old accounts.

---

**System Ready for Operations.** 🟢
