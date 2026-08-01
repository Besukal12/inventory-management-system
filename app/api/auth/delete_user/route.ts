import { NextRequest } from "next/server";
import { deleteUser } from "@/actions/auth.actions";

export async function DELETE(req: NextRequest) {
  return deleteUser(req);
}
