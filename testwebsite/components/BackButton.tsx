// components/BackButton.tsx
import { useRouter } from "next/router";
import Link from "next/link";

const BackButton = () => {
  const router = useRouter();

  // Hide the button when the current page is the home page
  if (router.pathname === "/") {
    return null;
  }

  return (
    <div style={containerStyle}>
      <Link href="/">
        <button style={buttonStyle}>Back to Home</button>
      </Link>
    </div>
  );
};

const containerStyle = {
  position: "absolute",
  top: "10px",
  left: "10px",
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

export default BackButton;

