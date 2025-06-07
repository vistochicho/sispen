import { auth } from "@/auth";
import { supabase } from "@/supabase";
import { NextResponse } from "next/server";

export const DELETE = auth(async function DELETE(req) {
  if (req.auth) {
    const roleId = req.auth.user.roleid;
    if (!roleId) {
      return NextResponse.json({ success: false, message: "Role ID not found" }, { status: 400 });
    }

    const { searchParams } = new URL(req.url);
    const packageId = searchParams.get("id");

    const { data, error } = await supabase.rpc("delete_encrypt", {
      p_encrypt_id: packageId,
    });

    if (error) {
      console.error("Error calling insert_package:", error);
      return NextResponse.json({ success: false, message: "Something went wrong" }, { status: 500 });
    }
    return NextResponse.json({ success: true, data }, { status: 200 });
  }
  return NextResponse.json({ success: false, message: "No Authorized" }, { status: 401 });
});
