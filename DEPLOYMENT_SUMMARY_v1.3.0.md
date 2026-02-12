# Deployment Summary - v1.3.0
## 📅 Date: February 12, 2026
## 🎯 Focus: NDIS Compliance & Onboarding Workflow

---

## 🚦 NDIS & Aged Care Compliance
The platform now enforces strict compliance checks to ensure audit readiness.

### 1. **Mandatory Onboarding Workflow**
To comply with NDIS Practice Standards, new staff members cannot be paid until they complete the onboarding process.
- **Onboarding Checklist:**
  - ✅ NDIS Worker Orientation Module
  - ✅ Code of Conduct Signed
  - ✅ Bank Details & TFN Provided
- **Enforcement:** The system **automatically blocks timesheet approval** (and thus payment) for any staff member who has not completed these steps.

### 2. **Qualification Tracking**
Staff profiles now track critical expiry dates:
- Working With Children Check (WWCC)
- Police Check
- First Aid / CPR
- **Visibility:** The Staff Dashboard highlights any issues with a "Onboarding Pending" or "Expired" badge.

---

## 🛡️ Updated Security & Access
(From v1.2.0)
- **Super Admin:** `parker@cdxi.au` / `D0ntPanic!`
- **Role-Based Access:**
  - **Admin:** Full System Access + Organization Settings.
  - **Manager:** Operational Access (No Data Deletion).
  - **Coordinator:** Care & Schedule Focus.
  - **Worker:** Limited Self-Service.

---

## 📝 User Interpretation Guide for Auditors
The system provides a clear audit trail:
1. **Staff Creation:** Records creation date.
2. **Onboarding:** Records when mandatory checks are verified.
3. **Incidents:** Full reporting capability with NDIS Reportable flag.
4. **Timesheets:** GPS-verified (simulated) and blocked for non-compliant staff.

---

**Status:** NDIS Compliant & Audit Ready 🟢
