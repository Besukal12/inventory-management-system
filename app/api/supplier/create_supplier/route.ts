import { NextRequest } from "next/server";
import { createSupplier } from "@/actions/suppliers.action";

export async function POST(req: NextRequest) {
  return createSupplier(req);
}
