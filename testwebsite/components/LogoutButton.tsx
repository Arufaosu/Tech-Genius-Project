// components/LogoutButton.tsx
import { useRouter } from "next/router";

const LogoutButton = () => {
  const router = useRouter();

  const handleLogout = () => {
    // Clear the "authenticated" cookie on logout
    document.cookie = "authenticated=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";

    // Redirect to the login page
    router.push("/login");
  };

  return <button onClick={handleLogout}>Logout</button>;
};

export default LogoutButton;

