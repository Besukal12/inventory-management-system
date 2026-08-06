import { NextRequest } from "next/server";
import { createInventoryTransaction } from "@/actions/inventory.action";

export async function POST(req: NextRequest) {
  return createInventoryTransaction(req);
}