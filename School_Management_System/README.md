# School Employee Sign-In System

A comprehensive sign-in system for school employees including management, teaching staff, and support personnel.

## Features

### Employee Roles Supported
- **Preschool Head** (1)
- **Primary School Head** (1)
- **Head of Departments (HoDs)**
- **Class Teachers**
- **Non-management Teams & Leaders**
- **Security Teams**
- **Cleaners**
- **Bakery & Kitchen Staff**
- **Admin Staff**
- **Nurse**

### System Capabilities
- **Employee Sign-In**: Easy-to-use interface with role selection
- **Admin Dashboard**: Complete employee management system
- **Attendance Tracking**: Real-time attendance monitoring
- **Reporting**: Daily and statistical reports
- **Employee Management**: Add, edit, and delete employee records

## Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- No additional software required

### Installation
1. Download all files to a local folder
2. Open `index.html` in your web browser
3. The system is ready to use

### Default Employees
The system comes with sample employees for testing:
- EMP001: Sarah Johnson (Preschool Head)
- EMP002: Michael Chen (Primary Head)
- EMP003: Emily Davis (Head of Department)
- EMP004: James Wilson (Class Teacher)
- EMP005: Maria Garcia (Admin Staff)
- EMP006: Robert Taylor (Security)
- EMP007: Linda Martinez (Cleaner)
- EMP008: David Brown (Bakery/Kitchen)
- EMP009: Jennifer Lee (Nurse)

## How to Use

### For Employees
1. Enter your Employee ID
2. Select your role from the grid
3. Click "Sign In" to record your attendance

### For Administrators
1. Click "Admin" button to access dashboard
2. Use tabs to navigate between:
   - **Employees**: Manage employee records
   - **Attendance**: View daily attendance
   - **Reports**: See statistics and summaries

## Data Storage
- Currently uses browser localStorage for data persistence
- Data is stored locally in the browser
- In production, this should be connected to a proper database

## Security Features
- Employee ID validation
- Role-based access control
- Duplicate sign-in prevention
- Admin authentication (basic implementation)

## Technical Stack
- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Styling**: Tailwind CSS
- **Icons**: Font Awesome
- **Storage**: LocalStorage (demo version)

## File Structure
```
School_Management_System/
├── index.html          # Main application interface
├── styles.css          # Custom styles and animations
├── script.js           # Application logic and data management
└── README.md          # This documentation file
```

## Browser Compatibility
- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## Future Enhancements
- Database integration (MySQL/PostgreSQL)
- User authentication system
- Sign-out functionality
- Monthly/Yearly reports
- Export to PDF/Excel
- Mobile app version
- Biometric integration
- Email notifications
- Leave management system

## Support
For issues or questions, please contact the system administrator.

---

**Note**: This is a demonstration version. For production use, ensure proper backend implementation and security measures.
