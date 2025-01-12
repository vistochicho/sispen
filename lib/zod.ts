import { object, string, z } from "zod";

export const signInSchema = object({
  email: string().min(1, { message: "Email is required " }).email({ message: "Invalid email address" }),
  password: string().min(8, { message: "Password must be at least 8 characters" }).max(16, "Password must be less than 16 characters "),
  loginType: string().min(1, { message: "Login Type is required " }),
});
