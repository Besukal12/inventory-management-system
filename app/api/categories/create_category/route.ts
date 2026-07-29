import { NextRequest } from "next/server";
import { createCategory } from "@/actions/categories.action";

export async function POST(req: NextRequest) {
  return createCategory(req);
}