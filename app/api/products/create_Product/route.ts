import { createProduct } from "@/actions/products.action";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  return createProduct(req);
}