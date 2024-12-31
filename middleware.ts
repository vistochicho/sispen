import { auth as middleware } from "@/auth";
import { NextResponse } from "next/server";

export default middleware((req) => {
  const { pathname } = req.nextUrl;

  // Define paths
  const pathUsers = ["/dashboard", "/dashboard/request-status", "/dashboard/package-list", "/dashboard/package-list/package-form/*", "/dashboard/invoice"];
  const pathAdmin = [
    "/dashboard",
    "/dashboard/customer",
    "/dashboard/package",
    "/dashboard/package/add-package",
    "/dashboard/package/detail-package/*",
    "/dashboard/package/update-package/*",
    "/dashboard/customer/",
    "/dashboard/customer/detail-customer/*",
    "/dashboard/request-legality/need-review",
    "/dashboard/request-legality/on-progress",
    "/dashboard/client-list",
    "/dashboard/user-management",
    "/dashboard/invoice",
  ];

  // Define Path Login etc
  const pathLogin = ["/login", "/register", "/forgot-password", "/admin/login"];

  const userRole = req.auth?.user.role;
  // If user is already logged in, prevent access to login-related paths
  if (req.auth) {
    if (pathLogin.includes(pathname)) {
      return NextResponse.redirect(new URL("/dashboard", req.url)); // Redirect to dashboard
    }

    // Logic for role "users"
    if (userRole === "users") {
      const isUserPath = pathUsers.some(
        (path) => pathname.startsWith(path) // Allow dynamic paths
      );

      if (isUserPath) {
        return NextResponse.next(); // Allow access
      }
      return NextResponse.redirect(new URL("/dashboard", req.url)); // Redirect to /dashboard
    }

    // Logic for role "admin"
    if (userRole === "admin") {
      const isAdminPath = pathAdmin.some(
        (path) => pathname.startsWith(path) // Allow dynamic paths
      );

      if (isAdminPath) {
        return NextResponse.next(); // Allow access
      }
      return NextResponse.redirect(new URL("/dashboard", req.url)); // Redirect to /dashboard
    }
  }

  // Check if user is logged in
  // if (!req.auth) {
  //   return NextResponse.redirect(new URL("/login", req.url));
  // }

  // Default: deny access
  return NextResponse.next();
});

export const config = {
  matcher: ["/dashboard/:path*", "/login", "/register", "/forgot-password", "/admin/login"],
};
