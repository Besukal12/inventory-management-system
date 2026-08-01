import { NextRequest } from "next/server";
import { updateUser } from "@/actions/auth.actions";

export async function PATCH(req: NextRequest) {
  return updateUser(req);
}
