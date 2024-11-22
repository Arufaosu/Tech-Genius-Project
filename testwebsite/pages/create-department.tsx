// pages/create-department.tsx
import { useState } from "react";
import { useRouter } from "next/router";
import BackButton from "../components/BackButton"; // Import BackButton

export default function CreateDepartmentPage() {
  const [name, setName] = useState("");
  const [manager, setManager] = useState("");
  const [status, setStatus] = useState("Active");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch("/api/departments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        manager,
        status,
      }),
    });

    if (response.ok) {
      alert("Department created successfully!");
      router.push("/department"); // Redirect to the department page
    } else {
      alert("Something went wrong.");
    }
  };

  return (
    <div style={{ position: "relative" }}>
      <BackButton /> {/* Render BackButton */}
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <h1>Create New Department</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Department Name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Manager:</label>
            <input
              type="text"
              value={manager}
              onChange={(e) => setManager(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Status:</label>
            <select value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
          <button type="submit">Create Department</button>
        </form>
      </div>
    </div>
  );
}

