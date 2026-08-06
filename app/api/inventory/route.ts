import { NextRequest } from "next/server";
import {
  createInventoryTransaction,
  deleteInventoryTransaction,
  getInventoryTransactions,
} from "@/actions/inventory.action";

export async function GET(req: NextRequest) {
  return getInventoryTransactions(req);
}

export async function POST(req: NextRequest) {
  return createInventoryTransaction(req);
}

export async function DELETE(req: NextRequest) {
  return deleteInventoryTransaction(req);
}
