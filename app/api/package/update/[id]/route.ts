import { auth } from "@/auth";
import { supabase } from "@/supabase";
import { NextResponse } from "next/server";

export const PATCH = auth(async (req, context) => {
  // ?? kalau tidak ada dijadikan object kosong
  const { id } = (await context.params) ?? {};

  if (!id) {
    return NextResponse.json({ success: false, message: "ID is not found" }, { status: 400 });
  }

  if (req.auth) {
    const roleId = req.auth.user.roleid;
    if (!roleId) {
      return NextResponse.json({ success: false, message: "Role ID not found" }, { status: 400 });
    }

    // Parse request body
    const body = await req.json();

    // Validate the data using Joi
    // const { error, value } = schema.validate(body, { abortEarly: false });
    // if (error) {
    //   return NextResponse.json(
    //     {
    //       success: false,
    //       message: "Validation error",
    //       errors: error.details.map((err) => err.message),
    //     },
    //     { status: 400 } // Bad Request
    //   );
    // }

    const { p_plan, p_price, p_description, p_status, p_new_benefits, p_remove_benefits } = body;

    const { data, error } = await supabase.rpc("patch_package", {
      p_pkg_id: id,
      p_plan,
      p_price,
      p_description,
      p_status,
      p_new_benefits,
      p_remove_benefits,
    });

    if (error) {
      console.error("Error calling insert_package:", error);
      return NextResponse.json({ success: false, message: "Something went wrong" }, { status: 500 });
    }
    return NextResponse.json({ success: true, data }, { status: 200 });
  }
  return NextResponse.json({ success: false, message: "No Authorized" }, { status: 401 });
});
