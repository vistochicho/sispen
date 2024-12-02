"use server";

import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { signInSchema } from "./zod";

export const SignInCredentials = async (prevState: unknown, formData: FormData) => {
  const validateFields = signInSchema.safeParse(Object.fromEntries(formData.entries()));

  if (!validateFields.success) {
    return {
      error: validateFields.error.flatten().fieldErrors,
    };
  }

  const { email, password, loginType } = validateFields.data;

  try {
    await signIn("custom-credentials", { email, password, loginType, redirectTo: "/dashboard" });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { message: "Invalid Credentials" };
        default:
          return { message: "Something went wrong." };
      }
    }

    throw error;
  }
};
