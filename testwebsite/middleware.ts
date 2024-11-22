import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function middleware(request: Request) {
  // Use async/await properly for cookies() in middleware
  const cookieStore = await cookies(); // Await the cookie store

  const authCookie = cookieStore.get("authenticated");

  // Log the cookie for debugging purposes
  console.log("Auth Cookie:", authCookie);

  // If no cookie found, redirect to the login page
  if (!authCookie) {
    if (request.url.includes("/login")) {
      return NextResponse.next(); // Let the user stay on the login page if they aren't authenticated
    }
    return NextResponse.redirect(new URL("/login", request.url)); // Redirect to login page
  }

  // If cookie exists, redirect authenticated users trying to access the login page
  if (authCookie && request.url.includes("/login")) {
    return NextResponse.redirect(new URL("/", request.url)); // Redirect to home page if authenticated
  }

  // If the user is authenticated, let them access other routes
  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/login", "/create-employee", "/employee", "/department", "/create-department"], // Specify paths to apply middleware
};

