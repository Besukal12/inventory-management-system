import { NextRequest } from "next/server";
import { updateProduct } from "@/actions/products.action";

export async function PUT(req: NextRequest) {
  return updateProduct(req);
}