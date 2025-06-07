import { NextRequest, NextResponse } from "next/server";
import Joi from "joi";
import bcrypt from "bcryptjs";
import { supabase } from "@/supabase";

// Define Joi Schema for validation
const schema = Joi.object({
  firstName: Joi.string().required().messages({
    "string.empty": "First name is required",
  }),
  lastName: Joi.string().required().messages({
    "string.empty": "Last name is required",
  }),
  gender: Joi.string().valid("Male", "Female").required().messages({
    "any.only": "Gender must be either 'Male' or 'Female'",
    "string.empty": "Gender is required",
  }),
  email: Joi.string().email().required().messages({
    "string.email": "Email must be valid",
    "string.empty": "Email is required",
  }),
  phoneNumber: Joi.string().required().messages({
    "string.empty": "Phone number is required",
  }),
  password: Joi.string().min(8).max(32).required().messages({
    "string.min": "Password must be at least 8 characters",
    "string.max": "Password must not exceed 32 characters",
    "string.empty": "Password is required",
  }),
});

export async function POST(req: NextRequest) {
  try {
    // Parse request body
    const body = await req.json();

    // Validate the data using Joi
    const { error, value } = schema.validate(body, { abortEarly: false });
    if (error) {
      return NextResponse.json(
        {
          success: false,
          message: "Validation error",
          errors: error.details.map((err) => err.message),
        },
        { status: 400 } // Bad Request
      );
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(value.password, 10);

    // Prepare data for Supabase RPC
    const payload = {
      p_first_name: value.firstName,
      p_last_name: value.lastName,
      p_gender: value.gender,
      p_email: value.email,
      p_phone_number: value.phoneNumber,
      p_password: hashedPassword,
    };

    // Call Supabase RPC
    const { data, error: supabaseError } = await supabase.rpc("register_user", payload);

    if (supabaseError) {
      return NextResponse.json(
        {
          success: false,
          message: "Failed to register user",
          error: supabaseError.message,
        },
        { status: 500 } // Internal Server Error
      );
    }

    // Respond with success
    return NextResponse.json(
      {
        success: true,
        message: "User registered successfully",
        data,
      },
      { status: 200 } // OK
    );
  } catch (error: any) {
    // Handle unexpected errors
    return NextResponse.json(
      {
        success: false,
        message: "An unexpected error occurred",
        error: error.message,
      },
      { status: 500 } // Internal Server Error
    );
  }
}
