import { NextRequest, NextResponse } from "next/server";
import {getInventoryTransactions} from "@/actions/inventory.action";

export async function GET(req: NextRequest) {
  return getInventoryTransactions(req);
}
