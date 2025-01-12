import { auth } from "@/auth";
import { supabase } from "@/supabase";
import { NextResponse } from "next/server";

export const PATCH = auth(async (req, context) => {
  const { id } = (await context.params) ?? {};

  if (!id) {
    return NextResponse.json({ success: false, message: "Id is not found" }, { status: 400 });
  }

  if (req.auth) {
    const roleId = req.auth.user.roleid;
    if (!roleId) {
      return NextResponse.json({ success: false, message: "Role ID not found" }, { status: 400 });
    }

    const body = await req.json();

    console.log(id);

    const { p_status } = body;

    const { data, error } = await supabase.rpc("patch_invoice", {
      p_pkg_id: id, // Use the dynamic invoiceId here
      p_status,
    });

    if (error) {
      return NextResponse.json({ success: false, message: "Something went wrong" }, { status: 500 });
    }
    return NextResponse.json({ success: true, data }, { status: 200 });
  }
  return NextResponse.json({ success: false, message: "No Authorized" }, { status: 401 });
});
