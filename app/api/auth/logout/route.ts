import { logout } from "@/actions/auth.actions";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  return logout(req);
}
