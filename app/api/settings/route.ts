import { NextRequest } from "next/server";
import { getSettings, updateSettings } from "@/actions/settings.actions";

export async function GET(req: NextRequest) {
  return getSettings(req);
}

export async function PATCH(req: NextRequest) {
  return updateSettings(req);
}
