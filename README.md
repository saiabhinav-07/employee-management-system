# Employee Management System

A complete Employee Management System for streamlined HR operations. Built with a secure Spring Boot backend, intuitive React frontend, and MySQL database.

---

## 🚀 Features

### 🔐 Authentication & Security
- HTTP Basic Auth for protected API access
- Secure RESTful endpoints
- Input validation (frontend/backend)

### 👤 Employee Management
- Add, edit, delete employees
- Real-time search
- Paginated employee list
- Field validation and notifications

### 📊 Dashboards
- Overview of all employees
- Fast filtering/search
- Status messages on actions
- Responsive UI (Bootstrap)

### 💾 Data Handling
- MySQL persistent storage
- CRUD API and real-time UI updates

---

## 🛠 Tech Stack

- **Backend**: Java 17, Spring Boot, Spring Data JPA, MySQL
- **Frontend**: React (18), Bootstrap, Bootstrap Icons
- **Build Tools**: Maven, npm
- **IDE**: Eclipse (backend), VS Code (frontend)
- **Other**: HTTP Basic Auth, CORS config

---

## 📦 Installation

1. **Clone the Repo**
    ```
    git clone https://github.com/saiabhinav-07/employee-management-system.git
    ```
2. **MySQL Setup**
    - Create a database:
        ```
        CREATE DATABASE ems_db;
        ```
3. **Backend Setup**
    - Edit `src/main/resources/application.properties`:
      ```
      spring.datasource.url=jdbc:mysql://localhost:3306/ems_db
      spring.datasource.username=your_mysql_username
      spring.datasource.password=your_mysql_password
      spring.jpa.hibernate.ddl-auto=update
      server.port=8080
      ```
    - Run with Eclipse: Right-click project > Run As > Spring Boot App  
      _or_  
      with Maven:
      ```
      mvn spring-boot:run
      ```
    - Backend API root: `http://localhost:8080/api/employees`
4. **Frontend Setup**
    ```
    cd ems-frontend
    npm install
    npm start
    ```
    - Open [http://localhost:3000](http://localhost:3000)

---

## 🖥️ Usage

- Log in (default: user/a149e250-98c5-49eb-ad63-353ffeab3dcf)
- Manage employees: add, edit, delete, search
- Notifications guide you through actions

---

## 📚 API Endpoints

| Method | Endpoint                | Description       |
|--------|-------------------------|-------------------|
| GET    | /api/employees          | List employees    |
| POST   | /api/employees          | Add employee      |
| PUT    | /api/employees/{id}     | Edit employee     |
| DELETE | /api/employees/{id}     | Delete employee   |

---

## 🐛 Troubleshooting

- **Port 8080 in use:** Kill the process using it or change `server.port`.
- **CORS error:** Ensure backend allows `http://localhost:3000`.
- **Authentication error:** Double-check your Basic Auth credentials.

---

## 📈 Future Enhancements

- [ ] Role-based access (admin/staff)
- [ ] Data export (Excel/CSV)
- [ ] Advanced reports/analytics
- [ ] REST API docs with Swagger

---

## 🤝 Contributing

1. Fork this repo
2. Create a feature branch
3. Commit your changes
4. Open a Pull Request

---

## 📄 License

MIT

---

## 👤 Author

**Sai Abhinav**  
[GitHub](https://github.com/saiabhinav-07)

_Built with ❤️ for learning, demonstration, and practical HR needs._
