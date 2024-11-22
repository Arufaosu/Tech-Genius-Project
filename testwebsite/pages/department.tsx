import { useEffect, useState } from "react";
import BackButton from "../components/BackButton"; // Import BackButton
import "../styles/department.css"; // Import the CSS file

interface Department {
  id: number;
  name: string;
  manager: string;
  status: string;
}

export default function DepartmentPage() {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [searchQuery, setSearchQuery] = useState(""); // For search functionality
  const [statusFilter, setStatusFilter] = useState("All"); // For status filter

  // Fetch the department data from the API
  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await fetch("/api/departments");
        if (response.ok) {
          const data = await response.json();
          setDepartments(data);
        } else {
          console.error("Failed to fetch departments");
        }
      } catch (error) {
        console.error("Error fetching departments", error);
      }
    };

    fetchDepartments();
  }, []);

  // Filter departments based on the search query and status filter
  const filteredDepartments = departments.filter((department) => {
    // Search filter
    const matchesSearch =
      department.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      department.manager.toLowerCase().includes(searchQuery.toLowerCase());

    // Status filter
    const matchesStatus =
      statusFilter === "All" || department.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // Function to handle the deletion of a department
  const handleDelete = async (id: number) => {
    const confirmation = window.confirm("Are you sure you want to delete this department?");
    if (!confirmation) return;

    try {
      const response = await fetch(`/api/departments/${id}`, { method: "DELETE" });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error deleting department:", errorData);
        alert(`Failed to delete: ${errorData.error || "Unknown error"}`);
        return;
      }

      // Remove the department from the state after successful deletion
      setDepartments((prev) => prev.filter((department) => department.id !== id));
      alert("Department deleted successfully.");
    } catch (error) {
      console.error("Error during deletion:", error);
      alert("An error occurred while deleting the department.");
    }
  };

  return (
    <div style={{ position: "relative" }}>
      <BackButton /> {/* Back button in the top-left */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: "50px",
        }}
      >
        <h1>Departments</h1>

        {/* Search Bar */}
        <div style={{ marginBottom: "20px", textAlign: "center" }}>
          <input
            type="text"
            placeholder="Search departments..."
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

        {/* Department Table */}
        <table
          style={{
            borderCollapse: "collapse",
            width: "80%",
            textAlign: "center",
          }}
        >
          <thead>
            <tr>
              <th
                style={{
                  border: "1px solid #ddd",
                  padding: "8px",
                  backgroundColor: "#f2f2f2",
                }}
              >
                Department Name
              </th>
              <th
                style={{
                  border: "1px solid #ddd",
                  padding: "8px",
                  backgroundColor: "#f2f2f2",
                }}
              >
                Manager
              </th>
              <th
                style={{
                  border: "1px solid #ddd",
                  padding: "8px",
                  backgroundColor: "#f2f2f2",
                }}
              >
                Status
              </th>
              <th
                style={{
                  border: "1px solid #ddd",
                  padding: "8px",
                  backgroundColor: "#f2f2f2",
                }}
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredDepartments.length > 0 ? (
              filteredDepartments.map((department) => (
                <tr key={department.id}>
                  <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                    {department.name}
                  </td>
                  <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                    {department.manager}
                  </td>
                  <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                    {department.status}
                  </td>
                  <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                    <button
                      onClick={() => handleDelete(department.id)}
                      style={{
                        padding: "5px 10px",
                        backgroundColor: "#f44336",
                        color: "white",
                        border: "none",
                        cursor: "pointer",
                        borderRadius: "5px",
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={4}
                  style={{
                    border: "1px solid #ddd",
                    padding: "8px",
                    textAlign: "center",
                  }}
                >
                  No departments found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

