# JPDB-Codes

A collection of mini projects built using **JsonPowerDB (JPDB)**, HTML, CSS, JavaScript, and jQuery.

This repository contains multiple form-based applications demonstrating CRUD operations using JsonPowerDB APIs.

---

# Projects Included

| Project Name | Description |
|---|---|
| EmployeeForm | Employee Management Form using JPDB |
| ProjectManagmentForm | Project Management Form using JPDB |
| WebFormExample | Basic Web Form Example |

---

# Repository Structure

```text
JPDB-Codes/
│
├── EmployeeForm/
│   ├── public_html/
│   │   ├── index.html
│   │   ├── index.css
│   │   └── index.js
│
├── ProjectManagmentForm/
│   ├── public_html/
│   │   ├── index.html
│   │   ├── index.css
│   │   └── index.js
│
├── WebFormExample/
│   ├── public_html/
│   │   └── index.html
│
├── LICENSE
└── README.md
```

---

# Technologies Used

- HTML5
- CSS3
- JavaScript
- jQuery
- JsonPowerDB (JPDB)

---

# About JsonPowerDB

JsonPowerDB is a high-performance, lightweight, and schema-free database.

It provides:
- Fast CRUD operations
- REST API support
- Simple integration
- Real-time data handling
- Serverless architecture

Official Website:
https://login2explore.com/

---

# EmployeeForm

## Description

A simple employee management form that stores employee data inside JsonPowerDB.

### Database Details

| Property | Value |
|---|---|
| Database | EMP-DB |
| Relation | EmpData |

### Fields

- Employee ID
- Employee Name
- Salary
- HRA
- DA
- Deduction

### Features

- Primary Key Validation
- Save New Employee
- Update Existing Employee
- Reset Form
- Dynamic Form Enable/Disable
- Input Validation

---

# ProjectManagmentForm

## Description

A project management form used to manage project assignment details.

### Database Details

| Property | Value |
|---|---|
| Database | COLLEGE-DB |
| Relation | PROJECT-TABLE |

### Fields

- Project-ID
- Project-Name
- Assigned-To
- Assignment-Date
- Deadline

### Features

- Primary Key Validation
- Automatic Record Fetching
- Save and Update Operations
- Assignment Date Validation
- Form State Management

---

# WebFormExample

## Description

A basic web form example demonstrating HTML form structure and UI creation.

---

# Frontend Preview

## Employee Form UI

![](/images/employeeForm.png)
---

## Project Management Form UI

![](/images/projectManagementForm.png)

---

# How the Forms Work

## Step 1

When the page loads:
- Only the Primary Key field remains enabled.
- All other fields and buttons are disabled.

---

## Step 2

User enters Primary Key.

### If Record Does Not Exist

- Fields become enabled
- Save button becomes active

### If Record Exists

- Existing data is fetched
- Update button becomes active
- Primary Key field becomes disabled

---

# JsonPowerDB APIs Used

| Function | Purpose |
|---|---|
| createPUTRequest | Insert Records |
| createGET_BY_KEYRequest | Fetch Record by Primary Key |
| createUPDATERecordRequest | Update Existing Record |
| executeCommandAtGivenBaseUrl | Execute API Requests |

---

# Benefits of Using JsonPowerDB

- Lightweight
- Easy to learn
- No backend required
- Simple REST APIs
- Fast development
- Schema-free database
- Real-time data access

---

# How to Run the Projects

## Step 1

Clone Repository

```bash
git clone https://github.com/your-username/JPDB-Codes.git
```

---

## Step 2

Open project in:
- NetBeans
- VS Code
- Any browser-supported IDE

---

## Step 3

Run the `index.html` file.

---

# Release History

## v1.0.0

Initial release containing:
- Employee Form
- Project Management Form
- Web Form Example
- JsonPowerDB Integration
- CRUD Operations

---

# Future Improvements

- Delete Operations
- Better UI Design
- Search Functionality
- Authentication System
- Dashboard Integration

---

# Author

Bhavesh Gadling

GitHub:
https://github.com/BhaveshGadling77

---

# License

This project is licensed under the MIT License.

---

# Acknowledgements

- JsonPowerDB
- Login2Explore
- GitHub
- jQuery Documentation