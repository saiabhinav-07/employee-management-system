Employee Management System
A complete, professional Employee Management System for efficient HR operations. Built with a secure, scalable Spring Boot backend, a user-friendly React frontend, and robust MySQL data storage.

🚀 Features
🔐 Authentication & Security
HTTP Basic Auth for protected API access

Secure RESTful endpoints

Input validation on frontend and backend

👤 Employee Management
Add, edit, delete employees

Real-time employee search

Paginated employee list for easy navigation

Automatic field validation and error handling

📊 Admin Dashboard
Overview of all employees

Fast employee filtering and search

Status notifications (add, edit, delete success/errors)

Responsive, mobile-friendly layout

📝 Data Handling
Integration with MySQL for persistent data storage

Real-time UI updates on all changes

Full CRUD API exposure for integration/automation

📤 Data Export (Optional/Future)
Easy CSV/Excel export planned for future versions

🛠 Tech Stack
Backend: Java 17, Spring Boot 3.x, Spring Data JPA, MySQL

Frontend: React (18), Bootstrap, Bootstrap Icons

Build Tools: Maven (backend), npm/yarn (frontend)

IDE: Eclipse (Java), VS Code (React)

Other: HTTP Basic Auth, CORS configuration, JWT-ready (extensible)

📦 Installation
1. Clone the Repository
bash
git clone https://github.com/saiabhinav-07/employee-management-system.git
cd employee-management-system
2. Database Setup
Install MySQL if not present

Create a new database (e.g. ems_db):

sql
CREATE DATABASE ems_db;
3. Backend Setup (Spring Boot)
Open the backend project (root or /employee-management-system) in Eclipse or your favorite IDE.

Configure src/main/resources/application.properties:

text
spring.datasource.url=jdbc:mysql://localhost:3306/ems_db
spring.datasource.username=your_mysql_username
spring.datasource.password=your_mysql_password
spring.jpa.hibernate.ddl-auto=update
server.port=8080
Run the backend:

In Eclipse: Right-click project → Run As → Spring Boot App

Command Line: mvn spring-boot:run

Backend API root: http://localhost:8080/api/employees

4. Frontend Setup (React)
bash
cd ems-frontend
npm install   # or yarn
npm start
Visit http://localhost:3000

🖥️ Usage
For Administrators
Login using system credentials (default: user/a149e250-98c5-49eb-ad63-353ffeab3dcf)

Manage Employees: Add, edit, delete, and search employee records easily

Monitor system notifications for quick feedback on every action

API Endpoints
Method	Endpoint	Description
GET	/api/employees	List employees
POST	/api/employees	Create employee
PUT	/api/employees/{id}	Edit employee
DELETE	/api/employees/{id}	Remove employee
🐛 Troubleshooting
Port 8080 already in use?

Run netstat -aon | findstr :8080 and kill the conflicting process, or change server.port in application.properties.

CORS error?

Ensure Spring Boot backend has CORS configured for http://localhost:3000.

Authentication error?

Use correct HTTP Basic Auth credentials in frontend/backend config.

📱 Responsive Design
The system is built with mobile-first responsive design using Bootstrap for smooth operation on desktops, tablets, and mobiles.

🚀 Deployment
Backend can be containerized (Docker), and deployed on any Java hosting (AWS, Azure, Heroku, etc.).

React frontend supports deployment on Vercel, Netlify, static hosts, or any Node-friendly provider.

📈 Future Enhancements
 Role-based access controls (admin/manager/staff)

 Excel/CSV export

 Advanced reporting dashboard

 Audit trail/logging

 REST API documentation with Swagger

🤝 Contributing
Fork this repository

Create a feature branch

Make your changes & test

Open a Pull Request

📄 License
This project is licensed under the MIT License.

👤 Author
Sai Abhinav
GitHub: saiabhinav-07
