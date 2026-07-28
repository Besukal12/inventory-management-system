import { register } from "@/actions/auth.actions";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
    return register(req);
}