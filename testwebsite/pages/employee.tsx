import { useEffect, useState } from "react";
import BackButton from "../components/BackButton";

interface Employee {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  telephone: string;
  manager: string;
  status: string;
}

export default function EmployeePage() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await fetch("/api/employees");
        if (response.ok) {
          const data = await response.json();
          setEmployees(data);
        } else {
          console.error("Failed to fetch employees");
        }
      } catch (error) {
        console.error("Error fetching employees", error);
      }
    };

    fetchEmployees();
  }, []);

  const handleDelete = async (id: number) => {
    const response = await fetch(`/api/employees/${id}`, { method: "DELETE" });
    if (response.ok) {
      setEmployees((prev) => prev.filter((employee) => employee.id !== id));
    } else {
      console.error("Failed to delete employee");
    }
  };

  const filteredEmployees = employees.filter((employee) => {
    const matchesSearch =
      employee.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employee.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employee.email.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      statusFilter === "All" || employee.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div style={{ position: "relative" }}>
      <BackButton />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: "50px",
        }}
      >
        <h1>Employees</h1>

        {/* Search Bar */}
        <div style={{ marginBottom: "20px", textAlign: "center" }}>
          <input
            type="text"
            placeholder="Search employees..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              padding: "10px",
              fontSize: "16px",
              borderRadius: "5px",
              border: "1px solid #ccc",
              width: "300px",
              textAlign: "center",
            }}
          />
        </div>

        {/* Filter by Status */}
        <div style={{ marginBottom: "20px", textAlign: "center" }}>
          <label style={{ marginRight: "10px" }}>Status Filter:</label>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            style={{
              padding: "10px",
              fontSize: "16px",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
          >
            <option value="All">All</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>

        {/* Employee Table */}
        <table
          style={{
            borderCollapse: "collapse",
            width: "80%",
            textAlign: "center",
          }}
        >
          <thead>
            <tr>
              <th style={{ border: "1px solid #ddd", padding: "8px", backgroundColor: "#f2f2f2" }}>First Name</th>
              <th style={{ border: "1px solid #ddd", padding: "8px", backgroundColor: "#f2f2f2" }}>Last Name</th>
              <th style={{ border: "1px solid #ddd", padding: "8px", backgroundColor: "#f2f2f2" }}>Email</th>
              <th style={{ border: "1px solid #ddd", padding: "8px", backgroundColor: "#f2f2f2" }}>Telephone</th>
              <th style={{ border: "1px solid #ddd", padding: "8px", backgroundColor: "#f2f2f2" }}>Manager</th>
              <th style={{ border: "1px solid #ddd", padding: "8px", backgroundColor: "#f2f2f2" }}>Status</th>
              <th style={{ border: "1px solid #ddd", padding: "8px", backgroundColor: "#f2f2f2" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredEmployees.length > 0 ? (
              filteredEmployees.map((employee) => (
                <tr key={employee.id}>
                  <td style={{ border: "1px solid #ddd", padding: "8px" }}>{employee.firstName}</td>
                  <td style={{ border: "1px solid #ddd", padding: "8px" }}>{employee.lastName}</td>
                  <td style={{ border: "1px solid #ddd", padding: "8px" }}>{employee.email}</td>
                  <td style={{ border: "1px solid #ddd", padding: "8px" }}>{employee.telephone}</td>
                  <td style={{ border: "1px solid #ddd", padding: "8px" }}>{employee.manager}</td>
                  <td style={{ border: "1px solid #ddd", padding: "8px" }}>{employee.status}</td>
                  <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                    <button
                      onClick={() => handleDelete(employee.id)}
                      className="button delete-button"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} style={{ border: "1px solid #ddd", padding: "8px", textAlign: "center" }}>
                  No employees found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

