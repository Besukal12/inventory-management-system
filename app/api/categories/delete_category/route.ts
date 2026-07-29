import {NextRequest} from "next/server";
import { deleteCategory } from "@/actions/categories.action";

export async function DELETE(req: NextRequest) {
  return deleteCategory(req);
}