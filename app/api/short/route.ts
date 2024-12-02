import { auth } from "@/auth";
import { supabase } from "@/supabase";
import { NextResponse } from "next/server";

export const GET = auth(async function GET(req) {
  if (req.auth) {
    const userId = req.auth.user.userId;
    const role = req.auth.user.role;
    if (!userId || !role) {
      return NextResponse.json({ success: false, message: "User ID or Role not found" }, { status: 400 });
    }

    const { data, error } = await supabase.rpc("get_short_user", {
      p_user_id: userId,
      p_role: role,
    });
    if (error) {
      console.log(error);
      return NextResponse.json({ success: false, message: "Something went wrong" }, { status: 500 });
    }
    return NextResponse.json({ success: true, data }, { status: 200 });
  }
  return NextResponse.json({ success: false, message: "No Authorized" }, { status: 401 });
});
