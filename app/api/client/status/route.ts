import { auth } from "@/auth";
import { supabase } from "@/supabase";
import { NextResponse } from "next/server";

export const GET = auth(async function GET(req) {
  if (req.auth) {
    const roleId = req.auth.user.roleid;
    if (!roleId) {
      return NextResponse.json({ success: false, message: "Role ID not found" }, { status: 400 });
    }

    const { data, error } = await supabase.rpc("get_client_status");

    if (error) {
      return NextResponse.json({ success: false, message: "Something went wrong" }, { status: 500 });
    }
    return NextResponse.json({ success: true, data }, { status: 200 });
  }
  return NextResponse.json({ success: false, message: "No Authorized" }, { status: 401 });
});
