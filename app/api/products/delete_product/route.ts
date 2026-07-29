import { NextRequest } from "next/server";
import {deleteProduct} from "@/actions/products.action";

export async function DELETE(req: NextRequest) {
  return deleteProduct(req);
}