// School Sign-In System JavaScript

// Data storage (in real app, this would be connected to a database)
let employees = [];
let attendanceRecords = [];
let selectedRole = null;
let currentEmployee = null;
let punchMode = 'scan';
let html5QrCode = null;
let currentPunchSession = null;

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    loadEmployees();
    loadAttendanceRecords();
    setTodayDate();
    updateDashboardStats();
    initializeQRScanner();
    updateCurrentTime();
    setInterval(updateCurrentTime, 1000);
}

function setTodayDate() {
    const today = new Date().toISOString().split('T')[0];
    const attendanceDateInput = document.getElementById('attendanceDate');
    if (attendanceDateInput) {
        attendanceDateInput.value = today;
    }
}

// Navigation functions
function showSignIn() {
    document.getElementById('signInSection').classList.remove('hidden');
    document.getElementById('adminSection').classList.add('hidden');
    resetSignInForm();
    startQRScanner();
}

function showAdmin() {
    document.getElementById('signInSection').classList.add('hidden');
    document.getElementById('adminSection').classList.remove('hidden');
    stopQRScanner();
    loadEmployeesTable();
    loadIDCardEmployees();
    updateDashboardStats();
}

// Punch mode functions
function setPunchMode(mode) {
    punchMode = mode;
    
    // Update UI
    const scanBtn = document.getElementById('scanModeBtn');
    const manualBtn = document.getElementById('manualModeBtn');
    const scannerSection = document.getElementById('scannerSection');
    const manualSection = document.getElementById('manualSection');
    
    if (mode === 'scan') {
        scanBtn.className = 'punch-mode-btn bg-blue-600 text-white px-6 py-3 rounded-lg transition';
        manualBtn.className = 'punch-mode-btn bg-gray-200 text-gray-700 px-6 py-3 rounded-lg transition';
        scannerSection.classList.remove('hidden');
        manualSection.classList.add('hidden');
        startQRScanner();
    } else {
        scanBtn.className = 'punch-mode-btn bg-gray-200 text-gray-700 px-6 py-3 rounded-lg transition';
        manualBtn.className = 'punch-mode-btn bg-blue-600 text-white px-6 py-3 rounded-lg transition';
        scannerSection.classList.add('hidden');
        manualSection.classList.remove('hidden');
        stopQRScanner();
    }
    
    resetSignInForm();
}

// QR Scanner functions
function initializeQRScanner() {
    html5QrCode = new Html5Qrcode("qr-reader");
}

function startQRScanner() {
    if (!html5QrCode && punchMode === 'scan') {
        initializeQRScanner();
    }
    
    if (html5QrCode && punchMode === 'scan') {
        Html5Qrcode.getCameras().then(devices => {
            if (devices && devices.length) {
                const cameraId = devices[0].id;
                html5QrCode.start(
                    cameraId,
                    {
                        fps: 10,
                        qrbox: { width: 250, height: 250 }
                    },
                    (decodedText, decodedResult) => {
                        handleQRCodeScan(decodedText);
                    },
                    (errorMessage) => {
                        // Handle scan error silently
                    }
                ).catch((err) => {
                    console.error(`Unable to start scanning: ${err}`);
                });
            }
        }).catch((err) => {
            console.error(`Unable to get cameras: ${err}`);
        });
    }
}

function stopQRScanner() {
    if (html5QrCode) {
        html5QrCode.stop().then(() => {
            console.log("QR Scanner stopped");
        }).catch((err) => {
            console.error(`Failed to stop scanning: ${err}`);
        });
    }
}

function handleQRCodeScan(decodedText) {
    try {
        const data = JSON.parse(decodedText);
        if (data.employeeId) {
            processEmployeeIdentification(data.employeeId);
        }
    } catch (e) {
        // If not JSON, treat as plain employee ID
        processEmployeeIdentification(decodedText);
    }
}

function processEmployeeIdentification(employeeId) {
    const employee = employees.find(emp => emp.id === employeeId);
    if (employee) {
        currentEmployee = employee;
        displayEmployeeInfo(employee);
        stopQRScanner();
    } else {
        showMessage('Employee not found. Please contact admin.', 'error');
    }
}

function displayEmployeeInfo(employee) {
    const employeeInfo = document.getElementById('employeeInfo');
    const employeeName = document.getElementById('employeeName');
    const employeeRole = document.getElementById('employeeRole');
    const currentStatus = document.getElementById('currentStatus');
    const punchButtons = document.getElementById('punchButtons');
    
    employeeName.textContent = employee.name;
    employeeRole.textContent = getRoleDisplayName(employee.role);
    
    // Check current punch status
    const today = new Date().toISOString().split('T')[0];
    const todayRecords = attendanceRecords.filter(record => 
        record.employeeId === employee.id && record.date === today
    );
    
    const activeSession = todayRecords.find(record => !record.punchOutTime);
    
    if (activeSession) {
        currentPunchSession = activeSession;
        currentStatus.textContent = 'Currently punched in';
        document.getElementById('punchInBtn').classList.add('hidden');
        document.getElementById('punchOutBtn').classList.remove('hidden');
    } else {
        currentPunchSession = null;
        currentStatus.textContent = 'Ready to punch in';
        document.getElementById('punchInBtn').classList.remove('hidden');
        document.getElementById('punchOutBtn').classList.add('hidden');
    }
    
    employeeInfo.classList.remove('hidden');
    punchButtons.classList.remove('hidden');
}

function updateCurrentTime() {
    const now = new Date();
    const timeElement = document.getElementById('currentTime');
    const dateElement = document.getElementById('currentDate');
    
    if (timeElement) {
        timeElement.textContent = now.toLocaleTimeString();
    }
    if (dateElement) {
        dateElement.textContent = now.toLocaleDateString();
    }
}

// Role selection
function selectRole(role) {
    selectedRole = role;
    
    // Update UI to show selected role
    document.querySelectorAll('.role-btn').forEach(btn => {
        btn.classList.remove('selected');
    });
    event.target.closest('.role-btn').classList.add('selected');
}

// Punch-in functionality
function punchIn() {
    if (!currentEmployee) {
        showMessage('Please scan your ID card or enter your Employee ID', 'error');
        return;
    }
    
    const today = new Date().toISOString().split('T')[0];
    const now = new Date();
    
    // Check if already punched in today
    const existingRecord = attendanceRecords.find(record => 
        record.employeeId === currentEmployee.id && 
        record.date === today && 
        !record.punchOutTime
    );
    
    if (existingRecord) {
        showMessage('You are already punched in', 'warning');
        return;
    }
    
    // Record punch-in
    const attendanceRecord = {
        id: Date.now(),
        employeeId: currentEmployee.id,
        employeeName: currentEmployee.name,
        role: currentEmployee.role,
        date: today,
        punchInTime: now.toISOString(),
        punchInDisplay: now.toLocaleTimeString(),
        status: 'present'
    };
    
    attendanceRecords.push(attendanceRecord);
    saveAttendanceRecords();
    
    // Update UI
    currentPunchSession = attendanceRecord;
    document.getElementById('currentStatus').textContent = 'Currently punched in';
    document.getElementById('punchInBtn').classList.add('hidden');
    document.getElementById('punchOutBtn').classList.remove('hidden');
    
    // Show success message
    showMessage(`Punched in successfully! Welcome, ${currentEmployee.name}`, 'success');
    
    updateDashboardStats();
}

// Punch-out functionality
function punchOut() {
    if (!currentPunchSession) {
        showMessage('No active punch session found', 'error');
        return;
    }
    
    const now = new Date();
    
    // Update punch-out time
    currentPunchSession.punchOutTime = now.toISOString();
    currentPunchSession.punchOutDisplay = now.toLocaleTimeString();
    
    // Calculate work hours
    const punchIn = new Date(currentPunchSession.punchInTime);
    const punchOut = new Date(currentPunchSession.punchOutTime);
    const workHours = (punchOut - punchIn) / (1000 * 60 * 60); // Convert to hours
    currentPunchSession.workHours = Math.round(workHours * 100) / 100; // Round to 2 decimal places
    
    saveAttendanceRecords();
    
    // Update UI
    currentPunchSession = null;
    document.getElementById('currentStatus').textContent = 'Ready to punch in';
    document.getElementById('punchInBtn').classList.remove('hidden');
    document.getElementById('punchOutBtn').classList.add('hidden');
    
    // Show success message with work hours
    showMessage(`Punched out successfully! Work hours: ${currentPunchSession.workHours} hours`, 'success');
    
    updateDashboardStats();
}

// Manual employee ID submission
function submitManualEmployeeId() {
    const employeeId = document.getElementById('employeeId').value.trim();
    
    if (!employeeId) {
        showMessage('Please enter your Employee ID', 'error');
        return;
    }
    
    if (!selectedRole) {
        showMessage('Please select your role', 'error');
        return;
    }
    
    // Find employee
    const employee = employees.find(emp => emp.id === employeeId);
    if (!employee) {
        showMessage('Employee ID not found. Please contact admin.', 'error');
        return;
    }
    
    // Verify role matches
    if (employee.role !== selectedRole) {
        showMessage('Role does not match our records. Please select the correct role.', 'error');
        return;
    }
    
    currentEmployee = employee;
    displayEmployeeInfo(employee);
}

function resetSignInForm() {
    document.getElementById('employeeId').value = '';
    selectedRole = null;
    currentEmployee = null;
    currentPunchSession = null;
    document.querySelectorAll('.role-btn').forEach(btn => {
        btn.classList.remove('selected');
    });
    document.getElementById('employeeInfo').classList.add('hidden');
    document.getElementById('punchButtons').classList.add('hidden');
}

// Employee management
function showAddEmployeeModal() {
    document.getElementById('addEmployeeModal').classList.remove('hidden');
}

function hideAddEmployeeModal() {
    document.getElementById('addEmployeeModal').classList.add('hidden');
    document.getElementById('addEmployeeForm').reset();
}

// Add employee form submission
document.getElementById('addEmployeeForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const employeeId = document.getElementById('newEmployeeId').value.trim();
    const name = document.getElementById('newEmployeeName').value.trim();
    const role = document.getElementById('newEmployeeRole').value;
    
    // Check if employee ID already exists
    if (employees.find(emp => emp.id === employeeId)) {
        showMessage('Employee ID already exists', 'error');
        return;
    }
    
    // Add new employee
    const newEmployee = {
        id: employeeId,
        name: name,
        role: role,
        status: 'active',
        createdAt: new Date().toISOString()
    };
    
    employees.push(newEmployee);
    saveEmployees();
    loadEmployeesTable();
    hideAddEmployeeModal();
    showMessage('Employee added successfully', 'success');
    updateDashboardStats();
});

// Admin tabs
function showAdminTab(tabName) {
    // Hide all tabs
    document.querySelectorAll('.admin-tab-content').forEach(tab => {
        tab.classList.add('hidden');
    });
    
    // Remove active state from all tab buttons
    document.querySelectorAll('.admin-tab').forEach(btn => {
        btn.classList.remove('border-blue-500', 'text-blue-600');
        btn.classList.add('border-transparent', 'text-gray-500');
    });
    
    // Show selected tab
    document.getElementById(tabName + 'Tab').classList.remove('hidden');
    
    // Set active state for selected tab button
    const activeTabBtn = event.target;
    activeTabBtn.classList.remove('border-transparent', 'text-gray-500');
    activeTabBtn.classList.add('border-blue-500', 'text-blue-600');
    
    // Load tab-specific data
    if (tabName === 'attendance') {
        loadAttendance();
    } else if (tabName === 'idcards') {
        loadIDCardEmployees();
    } else if (tabName === 'reports') {
        updateDashboardStats();
    }
}

// ID Card functionality
function loadIDCardEmployees() {
    const select = document.getElementById('idCardEmployeeSelect');
    select.innerHTML = '<option value="">Choose an employee...</option>';
    
    employees.forEach(employee => {
        const option = document.createElement('option');
        option.value = employee.id;
        option.textContent = `${employee.name} - ${employee.id}`;
        select.appendChild(option);
    });
    
    // Add change event listener
    select.onchange = function() {
        const employeeId = this.value;
        if (employeeId) {
            const employee = employees.find(emp => emp.id === employeeId);
            if (employee) {
                displayIDCardPreview(employee);
            }
        } else {
            document.getElementById('idCardPreview').classList.add('hidden');
        }
    };
}

function displayIDCardPreview(employee) {
    const preview = document.getElementById('idCardPreview');
    const nameElement = document.getElementById('cardEmployeeName');
    const roleElement = document.getElementById('cardEmployeeRole');
    const idElement = document.getElementById('cardEmployeeId');
    
    nameElement.textContent = employee.name;
    roleElement.textContent = getRoleDisplayName(employee.role);
    idElement.textContent = `ID: ${employee.id}`;
    
    preview.classList.remove('hidden');
}

function generateIDCard() {
    const select = document.getElementById('idCardEmployeeSelect');
    const employeeId = select.value;
    
    if (!employeeId) {
        showMessage('Please select an employee', 'error');
        return;
    }
    
    const employee = employees.find(emp => emp.id === employeeId);
    if (!employee) return;
    
    // Generate QR code
    const qrData = JSON.stringify({
        employeeId: employee.id,
        name: employee.name,
        role: employee.role
    });
    
    const qr = qrcode(0, 'M');
    qr.addData(qrData);
    qr.make();
    
    const qrContainer = document.getElementById('qrCodeContainer');
    qrContainer.innerHTML = qr.createImgTag(4);
    
    showMessage('QR Code generated successfully!', 'success');
}

function printIDCard() {
    const select = document.getElementById('idCardEmployeeSelect');
    const employeeId = select.value;
    
    if (!employeeId) {
        showMessage('Please select an employee and generate QR code first', 'error');
        return;
    }
    
    // Create print-friendly version
    const employee = employees.find(emp => emp.id === employeeId);
    if (!employee) return;
    
    const printWindow = window.open('', '_blank');
    const qrData = JSON.stringify({
        employeeId: employee.id,
        name: employee.name,
        role: employee.role
    });
    
    const qr = qrcode(0, 'M');
    qr.addData(qrData);
    qr.make();
    
    printWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>ID Card - ${employee.name}</title>
            <style>
                body { font-family: Arial, sans-serif; margin: 0; padding: 20px; }
                .card { width: 400px; height: 250px; border: 2px solid #1e40af; padding: 15px; margin: 0 auto; background: linear-gradient(135deg, #f8fafc 0%, #e0f2fe 100%); }
                .header { text-align: center; margin-bottom: 10px; }
                .school-logo { width: 40px; height: 40px; margin-bottom: 5px; }
                .school-name { font-weight: bold; font-size: 12px; color: #1e40af; margin: 0; }
                .school-address { font-size: 8px; color: #64748b; margin: 2px 0; }
                .employee-id-title { font-size: 10px; color: #64748b; margin: 5px 0 0 0; }
                .content { display: flex; margin-top: 10px; }
                .photo { width: 80px; height: 80px; background: #e2e8f0; border: 1px solid #cbd5e1; margin-right: 15px; display: flex; align-items: center; justify-content: center; }
                .info { flex: 1; }
                .name { font-weight: bold; font-size: 16px; color: #1e293b; margin: 0 0 3px 0; }
                .role { color: #475569; font-size: 12px; margin: 0 0 5px 0; }
                .id { font-family: monospace; font-size: 11px; color: #1e40af; font-weight: bold; margin: 5px 0; }
                .qr { margin-top: 8px; text-align: center; }
                .qr img { border: 1px solid #cbd5e1; padding: 2px; background: white; }
                .footer { text-align: center; font-size: 9px; color: #64748b; margin-top: 10px; border-top: 1px solid #e2e8f0; padding-top: 5px; }
            </style>
        </head>
        <body>
            <div class="card">
                <div class="header">
                    <img src="TES-Logo-nobg.png" alt="TES Logo" class="school-logo">
                    <p class="school-name">TREASURELAND ELEMENTARY SCHOOL</p>
                    <p class="school-address">Off Stadium Road, Block 37, GRA, Ijebu Ode</p>
                    <p class="employee-id-title">EMPLOYEE IDENTIFICATION CARD</p>
                </div>
                <div class="content">
                    <div class="photo">
                        <i class="fas fa-user" style="font-size: 30px; color: #94a3b8;"></i>
                    </div>
                    <div class="info">
                        <div class="name">${employee.name}</div>
                        <div class="role">${getRoleDisplayName(employee.role)}</div>
                        <div class="id">ID: ${employee.id}</div>
                        <div class="qr">${qr.createImgTag(3)}</div>
                    </div>
                </div>
                <div class="footer">
                    Valid Until December 2025 | Authorized Signature Required
                </div>
            </div>
            <script>
                window.onload = function() {
                    window.print();
                    window.close();
                }
            </script>
        </body>
        </html>
    `);
    
    printWindow.document.close();
}

// Load employees table
function loadEmployeesTable() {
    const tbody = document.getElementById('employeesTableBody');
    tbody.innerHTML = '';
    
    employees.forEach(employee => {
        const row = document.createElement('tr');
        row.className = 'table-hover';
        row.innerHTML = `
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">${employee.id}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${employee.name}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${getRoleDisplayName(employee.role)}</td>
            <td class="px-6 py-4 whitespace-nowrap">
                <span class="status-badge ${employee.status === 'active' ? 'status-present' : 'status-absent'}">
                    ${employee.status}
                </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button onclick="editEmployee('${employee.id}')" class="text-blue-600 hover:text-blue-900 mr-3">
                    <i class="fas fa-edit"></i>
                </button>
                <button onclick="deleteEmployee('${employee.id}')" class="text-red-600 hover:text-red-900">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

// Load attendance records
function loadAttendance() {
    const date = document.getElementById('attendanceDate').value;
    const attendanceList = document.getElementById('attendanceList');
    attendanceList.innerHTML = '';
    
    const dayRecords = attendanceRecords.filter(record => record.date === date);
    
    if (dayRecords.length === 0) {
        attendanceList.innerHTML = '<p class="text-gray-500 text-center py-4">No attendance records for this date</p>';
        return;
    }
    
    dayRecords.forEach(record => {
        const recordDiv = document.createElement('div');
        recordDiv.className = 'bg-gray-50 p-3 rounded-lg';
        
        let statusBadge = 'status-present';
        let statusText = 'Present';
        
        if (record.punchOutTime) {
            statusBadge = 'status-present';
            statusText = 'Completed';
        } else if (record.punchInTime) {
            statusBadge = 'status-leave';
            statusText = 'Active';
        }
        
        recordDiv.innerHTML = `
            <div class="flex justify-between items-start">
                <div>
                    <span class="font-medium">${record.employeeName}</span>
                    <span class="text-gray-500 text-sm ml-2">(${getRoleDisplayName(record.role)})</span>
                </div>
                <span class="status-badge ${statusBadge}">${statusText}</span>
            </div>
            <div class="mt-2 text-sm text-gray-600">
                ${record.punchInDisplay ? `<div>Punch In: ${record.punchInDisplay}</div>` : ''}
                ${record.punchOutDisplay ? `<div>Punch Out: ${record.punchOutDisplay}</div>` : ''}
                ${record.workHours ? `<div class="font-medium">Work Hours: ${record.workHours}</div>` : ''}
            </div>
        `;
        attendanceList.appendChild(recordDiv);
    });
}

// Update dashboard statistics
function updateDashboardStats() {
    const today = new Date().toISOString().split('T')[0];
    const todayRecords = attendanceRecords.filter(record => record.date === today);
    
    document.getElementById('totalEmployees').textContent = employees.length;
    document.getElementById('presentToday').textContent = todayRecords.length;
    document.getElementById('absentToday').textContent = employees.length - todayRecords.length;
}

// Employee actions
function editEmployee(employeeId) {
    const employee = employees.find(emp => emp.id === employeeId);
    if (!employee) return;
    
    // For now, just show an alert. In a real app, this would open an edit modal
    showMessage(`Edit functionality for ${employee.name} - Feature coming soon!`, 'info');
}

function deleteEmployee(employeeId) {
    if (!confirm('Are you sure you want to delete this employee?')) return;
    
    employees = employees.filter(emp => emp.id !== employeeId);
    saveEmployees();
    loadEmployeesTable();
    showMessage('Employee deleted successfully', 'success');
    updateDashboardStats();
}

// Utility functions
function getRoleDisplayName(role) {
    const roleNames = {
        'preschool_head': 'Preschool Head',
        'primary_head': 'Primary Head',
        'hod': 'Head of Department',
        'teacher': 'Class Teacher',
        'admin_staff': 'Admin Staff',
        'security': 'Security',
        'cleaner': 'Cleaner',
        'bakery_kitchen': 'Bakery/Kitchen',
        'nurse': 'Nurse'
    };
    return roleNames[role] || role;
}

function showMessage(message, type) {
    // Create message element
    const messageDiv = document.createElement('div');
    messageDiv.className = `fixed top-4 right-4 p-4 rounded-lg shadow-lg z-50 fade-in`;
    
    // Set color based on type
    const colors = {
        'success': 'bg-green-100 border border-green-400 text-green-700',
        'error': 'bg-red-100 border border-red-400 text-red-700',
        'warning': 'bg-yellow-100 border border-yellow-400 text-yellow-700',
        'info': 'bg-blue-100 border border-blue-400 text-blue-700'
    };
    
    messageDiv.className += ' ' + colors[type];
    messageDiv.innerHTML = `
        <div class="flex items-center">
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : type === 'warning' ? 'exclamation-triangle' : 'info-circle'} mr-2"></i>
            <span>${message}</span>
        </div>
    `;
    
    document.body.appendChild(messageDiv);
    
    // Remove after 3 seconds
    setTimeout(() => {
        messageDiv.remove();
    }, 3000);
}

// Data persistence (using localStorage for demo)
function saveEmployees() {
    localStorage.setItem('schoolEmployees', JSON.stringify(employees));
}

function loadEmployees() {
    const saved = localStorage.getItem('schoolEmployees');
    if (saved) {
        employees = JSON.parse(saved);
    } else {
        // Add sample employees for demonstration
        employees = [
            { id: 'EMP001', name: 'Sarah Johnson', role: 'preschool_head', status: 'active', createdAt: new Date().toISOString() },
            { id: 'EMP002', name: 'Michael Chen', role: 'primary_head', status: 'active', createdAt: new Date().toISOString() },
            { id: 'EMP003', name: 'Emily Davis', role: 'hod', status: 'active', createdAt: new Date().toISOString() },
            { id: 'EMP004', name: 'James Wilson', role: 'teacher', status: 'active', createdAt: new Date().toISOString() },
            { id: 'EMP005', name: 'Maria Garcia', role: 'admin_staff', status: 'active', createdAt: new Date().toISOString() },
            { id: 'EMP006', name: 'Robert Taylor', role: 'security', status: 'active', createdAt: new Date().toISOString() },
            { id: 'EMP007', name: 'Linda Martinez', role: 'cleaner', status: 'active', createdAt: new Date().toISOString() },
            { id: 'EMP008', name: 'David Brown', role: 'bakery_kitchen', status: 'active', createdAt: new Date().toISOString() },
            { id: 'EMP009', name: 'Jennifer Lee', role: 'nurse', status: 'active', createdAt: new Date().toISOString() }
        ];
        saveEmployees();
    }
}

function saveAttendanceRecords() {
    localStorage.setItem('schoolAttendance', JSON.stringify(attendanceRecords));
}

function loadAttendanceRecords() {
    const saved = localStorage.getItem('schoolAttendance');
    if (saved) {
        attendanceRecords = JSON.parse(saved);
    }
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('addEmployeeModal');
    if (event.target === modal) {
        hideAddEmployeeModal();
    }
}
