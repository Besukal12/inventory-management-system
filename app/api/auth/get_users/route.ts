import { NextRequest } from "next/server";
import { getUsers } from "@/actions/auth.actions";

export async function GET(req: NextRequest) {
  return getUsers(req);
}
