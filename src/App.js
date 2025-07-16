import React, { useEffect, useState } from "react";
import Notification from "./Notification";

// Import Bootstrap Icons globally in src/index.js ONLY ONCE
// import 'bootstrap-icons/font/bootstrap-icons.css';

// Update AUTH if backend password changes
const AUTH = "Basic " + btoa("user:6fe879d5-4234-42c7-a1bc-95d3c0a099af");

function getInitials(first, last) {
  return (first[0] + (last ? last[0] : "")).toUpperCase();
}

function App() {
  const [notification, setNotification] = useState({ message: "", type: "" });
  const [employees, setEmployees] = useState([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  useEffect(() => { loadEmployees(); }, []);
  useEffect(() => { setCurrentPage(1); }, [searchTerm, employees.length]);

  function loadEmployees() {
    setLoading(true);
    fetch("http://localhost:8080/api/employees", {
      headers: { Authorization: AUTH }
    })
      .then(res => {
        if (!res.ok) throw new Error("Could not load employees: " + res.status);
        return res.json();
      })
      .then(setEmployees)
      .catch(e => setNotification({ message: e.message, type: "danger" }))
      .finally(() => setLoading(false));
  }

  function handleSubmit(ev) {
    ev.preventDefault();
    if (!firstName || !lastName || !email) {
      setNotification({ message: "All fields required.", type: "danger" });
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setNotification({ message: "Enter a valid email address.", type: "danger" });
      return;
    }
    setLoading(true);
    if (editingId) {
      fetch(`http://localhost:8080/api/employees/${editingId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: AUTH
        },
        body: JSON.stringify({ firstName, lastName, email })
      })
        .then(res => {
          if (!res.ok) throw new Error("Could not update employee: " + res.status);
          setNotification({ message: "Employee updated!", type: "success" });
          setEditingId(null);
          setFirstName(""); setLastName(""); setEmail("");
          loadEmployees();
        })
        .catch(e => setNotification({ message: e.message, type: "danger" }))
        .finally(() => setLoading(false));
    } else {
      fetch("http://localhost:8080/api/employees", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: AUTH
        },
        body: JSON.stringify({ firstName, lastName, email })
      })
        .then(res => {
          if (!res.ok) throw new Error("Could not add employee: " + res.status);
          setNotification({ message: "Employee added!", type: "success" });
          setFirstName(""); setLastName(""); setEmail("");
          loadEmployees();
        })
        .catch(e => setNotification({ message: e.message, type: "danger" }))
        .finally(() => setLoading(false));
    }
  }

  function handleEdit(emp) {
    setFirstName(emp.firstName);
    setLastName(emp.lastName);
    setEmail(emp.email);
    setEditingId(emp.id);
    setNotification({ message: "Edit mode: update fields & submit", type: "info" });
  }

  function handleDelete(id) {
    if (!window.confirm("Delete this employee?")) return;
    setLoading(true);
    fetch(`http://localhost:8080/api/employees/${id}`, {
      method: "DELETE",
      headers: { Authorization: AUTH }
    })
      .then(res => {
        if (!res.ok) throw new Error("Could not delete employee: " + res.status);
        setNotification({ message: "Employee deleted!", type: "success" });
        loadEmployees();
      })
      .catch(e => setNotification({ message: e.message, type: "danger" }))
      .finally(() => setLoading(false));
  }

  // Filter + Pagination
  const filteredEmployees = employees.filter(emp =>
    emp.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp.email.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const paginatedEmployees = filteredEmployees.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredEmployees.length / itemsPerPage);

  function goToPage(page) {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  }

  // Some nice palette
  const colorAccent = "#6f7bfc";
  const colorAccent2 = "#f8719d";
  const avatarBG = ["#e8f1ff", "#fff7e7", "#fbe1f1", "#e6fde4", "#f2e3fb"];

  return (
    <div
      className="container-fluid min-vh-100"
      style={{
        background: "linear-gradient(135deg, #fdf6fd 0%, #e8f1ff 80%, #fbe1f1 100%)",
        minHeight: "100vh"
      }}
    >
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <div
          className="card shadow-lg border-0"
          style={{
            minWidth: 370, maxWidth: 520, width: "100%",
            borderRadius: "1.7rem",
            background: "rgba(255,255,255,0.96)",
            padding: "2.4rem 2rem"
          }}
        >
          <h1
            className="mb-4 pb-2 border-bottom text-center"
            style={{
              fontWeight: 900,
              fontSize: "2rem",
              color: colorAccent2,
              letterSpacing: 1.2,
              background: "linear-gradient(90deg, #6f7bfc 10%, #f8719d 90%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent"
            }}
          >
            <i className="bi bi-people-fill me-2" style={{ color: colorAccent }}></i>
            Employee Manager
          </h1>
          <Notification
            message={notification.message}
            type={notification.type}
            onClose={() => setNotification({ message: "", type: "" })}
          />

          <form className="mb-4" onSubmit={handleSubmit}>
            <div className="row g-2">
              <div className="col-12 col-sm-6">
                <input
                  value={firstName}
                  onChange={e => setFirstName(e.target.value)}
                  placeholder="👤 First Name"
                  className="form-control rounded-pill"
                  required
                  style={{ fontSize: "1.05em" }}
                />
              </div>
              <div className="col-12 col-sm-6">
                <input
                  value={lastName}
                  onChange={e => setLastName(e.target.value)}
                  placeholder="👤 Last Name"
                  className="form-control rounded-pill"
                  required
                  style={{ fontSize: "1.05em" }}
                />
              </div>
              <div className="col-12">
                <input
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="📧 Email"
                  type="email"
                  className="form-control rounded-pill"
                  required
                  style={{ fontSize: "1.05em" }}
                />
              </div>
            </div>
            <div className="d-flex gap-2 mt-3 justify-content-center">
              <button
                className="btn btn-primary rounded-pill px-4 fw-semibold shadow"
                type="submit"
                disabled={loading}
                style={{
                  background: `linear-gradient(90deg,${colorAccent} 0%,${colorAccent2} 100%)`,
                  border: "none"
                }}
              >
                {loading
                  ? (editingId ? "Updating..." : "Saving...")
                  : (editingId ? <><i className="bi bi-check2-circle"></i> Update</> : <><i className="bi bi-plus-circle"></i> Add</>)
                }
              </button>
              {editingId && (
                <button
                  type="button"
                  className="btn btn-warning rounded-pill px-4 fw-semibold shadow"
                  disabled={loading}
                  onClick={() => {
                    setEditingId(null); setFirstName(""); setLastName(""); setEmail(""); setNotification({ message: "", type: "" });
                  }}
                >
                  <i className="bi bi-x-circle"></i> Cancel
                </button>
              )}
            </div>
          </form>

          <div className="mb-3 d-flex align-items-center">
            <span className="me-2" style={{ color: colorAccent2, fontSize: "1.35em" }}>
              <i className="bi bi-search"></i>
            </span>
            <input
              type="text"
              className="form-control rounded-pill"
              placeholder="Search employees by name or email..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              disabled={loading}
              style={{
                fontSize: "1.05em",
                background: "#f7faff",
                border: "1.5px solid #e4eaff",
                boxShadow: "0 2px 6px #dbdbfb33"
              }}
            />
          </div>

          {loading && (
            <div className="text-center my-3">
              <div className="spinner-border text-primary" role="status" />
            </div>
          )}

          <ul className="list-group list-group-flush p-0">
            {paginatedEmployees.length === 0 ?
              <li className="list-group-item text-secondary text-center bg-light">
                No employees found.
              </li>
              :
              paginatedEmployees.map((emp, idx) =>
                <li
                  key={emp.id}
                  className="list-group-item d-flex align-items-center my-2 border-0"
                  style={{
                    background: idx % 2 === 0 ? "#f7faff" : "#fdf3fa",
                    borderRadius: "1.5em",
                    boxShadow: "0 1px 12px #8bbaff13",
                    transition: "background 0.25s",
                  }}
                >
                  {/* Avatar */}
                  <span
                    style={{
                      display: "inline-block",
                      width: 42, height: 42,
                      borderRadius: "50%",
                      background: avatarBG[idx % avatarBG.length],
                      color: colorAccent,
                      fontWeight: "700",
                      fontSize: "1.18em",
                      textAlign: "center",
                      lineHeight: "42px",
                      marginRight: 15,
                      boxShadow: "0 1px 4px #7eabff33"
                    }}
                  >
                    {getInitials(emp.firstName, emp.lastName)}
                  </span>
                  <span className="flex-grow-1">
                    <b style={{ fontSize: "1.10em", color: "#222" }}>{emp.firstName} {emp.lastName}</b>
                    <span className="text-muted d-block ms-2" style={{ fontSize: "0.98em" }}>
                      {emp.email}
                    </span>
                  </span>
                  <div className="d-flex gap-1">
                    <button
                      className="btn btn-sm btn-outline-primary rounded-pill px-3 me-2"
                      disabled={loading}
                      onClick={() => handleEdit(emp)}
                      title="Edit"
                    >
                      <i className="bi bi-pencil-square me-1"></i>Edit
                    </button>
                    <button
                      className="btn btn-sm btn-outline-danger rounded-pill px-3"
                      disabled={loading}
                      onClick={() => handleDelete(emp.id)}
                      title="Delete"
                    >
                      <i className="bi bi-trash"></i>
                    </button>
                  </div>
                </li>
              )
            }
          </ul>

          {totalPages > 1 && (
            <nav className="mt-4">
              <ul className="pagination justify-content-center mb-0">
                <li className={`page-item${currentPage === 1 ? " disabled" : ""}`}>
                  <button className="page-link" onClick={() => goToPage(currentPage - 1)}>
                    <i className="bi bi-chevron-left"></i>
                  </button>
                </li>
                {[...Array(totalPages)].map((_, idx) => (
                  <li key={idx} className={`page-item${currentPage === idx + 1 ? " active" : ""}`}>
                    <button className="page-link" onClick={() => goToPage(idx + 1)}>
                      {idx + 1}
                    </button>
                  </li>
                ))}
                <li className={`page-item${currentPage === totalPages ? " disabled" : ""}`}>
                  <button className="page-link" onClick={() => goToPage(currentPage + 1)}>
                    <i className="bi bi-chevron-right"></i>
                  </button>
                </li>
              </ul>
            </nav>
          )}
          <div className="text-center text-muted" style={{ fontSize: "0.85em", marginTop: 32 }}>
            <i className="bi bi-c-circle me-1"></i>
            Modern EMS demo – 2024 Edition
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
