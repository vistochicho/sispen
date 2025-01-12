import { auth } from "@/auth";
import { supabase } from "@/supabase";
import { NextResponse } from "next/server";

export const POST = auth(async function POST(req) {
  if (req.auth) {
    const roleId = req.auth.user.roleid;
    if (!roleId) {
      return NextResponse.json({ success: false, message: "Role ID not found" }, { status: 400 });
    }

    const formData = await req.formData();

    // Convert formData to an object for easier handling
    const body = Object.fromEntries(formData.entries());
    const { p_plan, p_price, p_description, p_status } = body;

    // Get p_benefits as an array
    const benefits = formData.getAll("p_benefits[]");

    console.log(formData);
    console.log("Parsed body:", body);
    console.log("Benefits:", benefits);

    // Ensure benefits are an array
    if (benefits.length === 0) {
      return NextResponse.json({ success: false, message: "No benefits provided" }, { status: 400 });
    }

    const { data, error } = await supabase.rpc("insert_package", {
      p_benefits: benefits,
      p_plan,
      p_price,
      p_description,
      p_status,
    });

    if (error) {
      console.error("Error calling insert_package:", error);
      return NextResponse.json({ success: false, message: "Something went wrong" }, { status: 500 });
    }
    return NextResponse.json({ success: true, data }, { status: 200 });
  }
  return NextResponse.json({ success: false, message: "No Authorized" }, { status: 401 });
});
