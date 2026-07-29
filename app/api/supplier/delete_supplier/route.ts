import { NextRequest } from "next/server";
import { deleteSupplier } from "@/actions/suppliers.action";

export async function DELETE(req: NextRequest) {
  return deleteSupplier(req);
}
