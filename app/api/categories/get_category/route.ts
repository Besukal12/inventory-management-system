import {NextRequest} from "next/server";
import { getCategories } from "@/actions/categories.action";

export async function GET(req: NextRequest) {
  return getCategories;
}