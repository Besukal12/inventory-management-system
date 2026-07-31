import { NextRequest } from "next/server";
import { getSuppliers } from "@/actions/suppliers.action";

export async function GET(req: NextRequest) {
  return getSuppliers();
}
