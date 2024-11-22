// pages/index.tsx
import { useRouter } from "next/router"; // For routing
import Link from "next/link"; // For navigation
import BackButton from "../components/BackButton"; // Importing BackButton component

const Home = () => {
  const router = useRouter();

  const handleLogout = async () => {
    const response = await fetch("/api/auth/logout", { method: "POST" });
    if (response.ok) {
      router.push("/login"); // Redirect to the login page after logout
    } else {
      console.error("Failed to log out");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px", minHeight: "100vh" }}>
      <BackButton /> {/* Add BackButton component */}
      <h1>Welcome! Please choose an option:</h1>

      <div style={{ margin: "20px" }}>
        <Link href="/create-employee">
          <button style={buttonStyle}>Create Employee</button>
        </Link>
      </div>
      <div style={{ margin: "20px" }}>
        <Link href="/employee">
          <button style={buttonStyle}>Employee</button>
        </Link>
      </div>
      <div style={{ margin: "20px" }}>
        <Link href="/department">
          <button style={buttonStyle}>Department</button>
        </Link>
      </div>
      <div style={{ margin: "20px" }}>
        <Link href="/create-department">
          <button style={buttonStyle}>Create Department</button>
        </Link>
      </div>

      <button
        onClick={handleLogout}
        style={{
          position: "absolute",
          bottom: "20px",
          left: "20px",
          padding: "10px 20px",
          fontSize: "16px",
          cursor: "pointer",
          backgroundColor: "#ff4d4d",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
        }}
      >
        Logout
      </button>
    </div>
  );
};

const buttonStyle = {
  padding: "10px 20px",
  fontSize: "16px",
  cursor: "pointer",
  backgroundColor: "#0070f3",
  color: "#fff",
  border: "none",
  borderRadius: "5px",
};

export default Home;

