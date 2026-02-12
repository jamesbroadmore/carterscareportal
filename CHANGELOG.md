# Changelog

All notable changes to the Carters Care Platform will be documented in this file.

## [1.1.0] - 2026-02-12

### Added
- **NDIS Compliance Features**:
    - "NDIS Reportable Incident" checkbox in Incident form.
    - "WA Dept of Communities Notified" checkbox in Incident form.
    - New Incident Types: Abuse / Neglect, Unauthorized Restrictive Practice.
    - "Close Report" workflow for resolved incidents.
- **Security Enhancements**:
    - "Forgot Password" functionality on login screen.
    - "Change Password" section in Settings page.
    - Security Question/Answer mechanism for password recovery.
- **Documentation**:
    - Updated README with NDIS reporting guide.
    - Added Security Best Practices section.

### Changed
- **Authentication**:
    - Removed hardcoded default credentials from Login UI.
    - Migrated credential storage to `localStorage`.
    - Enforced minimum password length of 8 characters.
- **UI/UX**:
    - Improved Login page footer with compliance messaging.
    - Enhanced Incident card layout to show compliance flags.

### Fixed
- Hardcoded credentials visible in source code comments (removed).
- Default credentials displayed on login screen (removed).

## [1.0.0] - 2026-02-05

### Initial Release
- Core features: Client, Staff, Schedule Management.
- Simple Authentication.
- Dashboard Analytics.
- Data Export/Import.
