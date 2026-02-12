# Testing Guide - Carters Care Platform v1.1.0

## Quick Test Checklist

### 🚀 Initial Load Test
1. Open `index.html` in a browser
2. Verify the page loads without errors
3. Check browser console (F12) for any errors
4. Verify version shows "v1.1.0 Enhanced" in sidebar footer

### ⌨️ Keyboard Shortcuts Test
1. Press `?` - Shortcuts modal should appear
2. Press `Esc` - Modal should close
3. Press `1` - Should navigate to Dashboard
4. Press `2` - Should navigate to Clients
5. Press `3` - Should navigate to Staff
6. Press `4` - Should navigate to Schedule
7. On Clients page, press `Ctrl/Cmd + N` - Should open Add Client modal
8. Press `Ctrl/Cmd + K` - Should focus search bar (if on Clients/Staff page)

### 📝 Client Management Test
1. Navigate to Clients page (press `2` or click sidebar)
2. Click "+ Add Client" button
3. **Test Validation**:
   - Try to save without name → Should show error
   - Enter invalid email (e.g., "notanemail") → Should show error
   - Enter invalid phone (e.g., "abc123") → Should show error
4. **Test Success**:
   - Enter valid name: "John Doe"
   - Enter valid email: "john@example.com"
   - Enter valid phone: "01234567890"
   - Select care level: "Intermediate"
   - Add notes: "Test client"
   - Click "Save Client"
   - Should see success toast with ✓ icon
   - Client should appear in table

### 👔 Staff Management Test
1. Navigate to Staff page (press `3`)
2. Click "+ Add Staff Member"
3. **Test Validation**:
   - Try to save without name → Should show error
   - Try to save without email → Should show error
   - Enter invalid email → Should show error
4. **Test Success**:
   - Enter name: "Jane Smith"
   - Select position: "Carer"
   - Enter email: "jane@example.com"
   - Enter phone: "07123456789"
   - Check "Active"
   - Click "Save Staff"
   - Should see success toast
   - Staff should appear in table

### 📅 Schedule Test
1. Navigate to Schedule page (press `4`)
2. Click "+ Create Shift"
3. **Test Validation**:
   - Select staff member
   - Select client
   - Enter today's date
   - Enter start time: "09:00"
   - Enter end time: "08:00" (before start) → Should show error
4. **Test Success**:
   - Change end time to "17:00"
   - Add notes: "Regular shift"
   - Click "Create Shift"
   - Should see success toast
   - Shift should appear in calendar

### 📊 Dashboard Test
1. Navigate to Dashboard (press `1`)
2. Verify metrics show:
   - Active Clients: 1 (or your count)
   - Active Staff: 1 (or your count)
   - Shifts This Week: (should show weekly count)
   - Pending Approvals: 0
3. Check trend badges (may show "—" if no historical data)
4. Verify "Recent Activity" shows your recent actions
5. Check timestamps show relative time (e.g., "Just now", "5 minutes ago")

### 🔍 Search & Filter Test
1. Navigate to Clients page
2. Add multiple clients with different care levels
3. **Test Search**:
   - Type in search box → Should filter results
   - Search by name, email, or phone
   - Press `Ctrl/Cmd + K` to focus search
4. **Test Filter**:
   - Select "Basic" from care level dropdown
   - Should show only basic care clients
   - Select "All Care Levels" to reset

### ✅ Compliance Test
1. Navigate to Compliance page (press `6`)
2. Check/uncheck compliance items
3. Changes should save automatically
4. Click "Generate Report"
5. Should download a text file with compliance status

### ⚙️ Settings Test
1. Navigate to Settings page
2. **Test Organization Settings**:
   - Change organization name
   - Add email and phone
   - Click "Save Settings"
   - Should see success toast
   - Refresh page → Settings should persist
3. **Test Data Export**:
   - Click "Export Data"
   - Should download JSON file
   - Open file → Should contain all your data
4. **Test Data Import**:
   - Click "Import Data"
   - Select the exported JSON file
   - Should see success message
   - Page should reload with data intact

### 🎨 UI/UX Test
1. **Test Toast Notifications**:
   - Perform various actions
   - Verify toasts appear with correct icons:
     - Success: ✓ (green)
     - Error: ✕ (red)
     - Warning: ⚠ (orange)
   - Verify smooth slide-in animation
   - Verify auto-dismiss after 4 seconds

2. **Test Modals**:
   - Open any modal
   - Press `Esc` → Should close
   - Open modal again
   - Click outside modal → Should close
   - Verify smooth animations

3. **Test Responsive Design**:
   - Resize browser window
   - Verify layout adapts
   - Test on mobile device (or use browser dev tools)

### 🔒 Security Test
1. **Test Input Sanitization**:
   - Try entering `<script>alert('test')</script>` in name field
   - Should be sanitized (< and > removed)
   - Data should save safely

2. **Test Email Validation**:
   - Try various invalid emails:
     - "notanemail"
     - "@example.com"
     - "test@"
     - "test @example.com" (space)
   - All should show validation error

3. **Test Phone Validation**:
   - Try invalid phones:
     - "abc123"
     - "123-abc-456"
   - Should show validation error
   - Valid formats should work:
     - "01234567890"
     - "+44 1234 567890"
     - "(01234) 567890"

### 📱 Cross-Browser Test
Test on multiple browsers:
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile Safari (iOS)
- [ ] Mobile Chrome (Android)

### 🐛 Error Scenarios Test
1. **Test with Full localStorage**:
   - Fill localStorage to capacity
   - Try to save data
   - Should show appropriate error

2. **Test with Disabled localStorage**:
   - Disable localStorage in browser settings
   - Try to use app
   - Should show appropriate errors

3. **Test Data Corruption**:
   - Manually corrupt localStorage data
   - Reload app
   - Should handle gracefully

## Expected Results

### ✅ All Tests Should Pass
- No console errors
- All features work as expected
- Validation catches all invalid inputs
- Data persists correctly
- UI is responsive and smooth
- Keyboard shortcuts work
- Toast notifications appear correctly
- Modals behave properly

### 🎯 Performance Benchmarks
- Page load: < 1 second
- Modal open: < 100ms
- Search filter: < 50ms
- Data save: < 100ms
- Toast animation: Smooth 60fps

## Common Issues & Solutions

### Issue: Keyboard shortcuts not working
**Solution**: Make sure you're not focused in an input field. Click outside inputs first.

### Issue: Data not saving
**Solution**: Check browser console for errors. Verify localStorage is enabled.

### Issue: Validation not working
**Solution**: Ensure you're using the latest version (v1.1.0). Clear browser cache.

### Issue: Trends not showing
**Solution**: Trends require 7+ days of historical data. Use the app for a week or manually add historical data.

### Issue: Relative times incorrect
**Solution**: Check your system time is correct. Relative times are based on system time.

## Automated Testing (Future)

For future releases, consider implementing:
- Unit tests for validation functions
- Integration tests for CRUD operations
- E2E tests for user workflows
- Performance tests for large datasets
- Accessibility tests (WCAG compliance)

## Test Report Template

```
Test Date: _______________
Tester Name: _______________
Browser: _______________
OS: _______________

Initial Load: [ ] Pass [ ] Fail
Keyboard Shortcuts: [ ] Pass [ ] Fail
Client Management: [ ] Pass [ ] Fail
Staff Management: [ ] Pass [ ] Fail
Schedule: [ ] Pass [ ] Fail
Dashboard: [ ] Pass [ ] Fail
Search & Filter: [ ] Pass [ ] Fail
Compliance: [ ] Pass [ ] Fail
Settings: [ ] Pass [ ] Fail
UI/UX: [ ] Pass [ ] Fail
Security: [ ] Pass [ ] Fail

Issues Found:
1. _______________
2. _______________
3. _______________

Overall Status: [ ] Pass [ ] Fail
Notes: _______________
```

---

**Happy Testing! 🎉**

If you find any issues, please document them with:
1. Steps to reproduce
2. Expected behavior
3. Actual behavior
4. Browser and OS version
5. Screenshots if applicable
