import { NextRequest } from "next/server";
import { getProducts } from "@/actions/products.action";

export async function GET(req: NextRequest) {
  return getProducts();
}