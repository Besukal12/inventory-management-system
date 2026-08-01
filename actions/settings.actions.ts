import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";

const SETTINGS_ID = "singleton";

export async function getSettings(req: NextRequest) {
  try {
    const settings = await prisma.settings.findUnique({
      where: { id: SETTINGS_ID },
    });

    if (!settings) {
      const createdSettings = await prisma.settings.create({
        data: {
          id: SETTINGS_ID,
          businessName: "Flux Inventory",
          currency: "USD",
          theme: "light",
        },
      });

      return NextResponse.json({ settings: createdSettings }, { status: 200 });
    }

    return NextResponse.json({ settings }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}

export async function updateSettings(req: NextRequest) {
  try {
    const body = await req.json();
    const { businessName, currency, theme } = body;

    const updatedSettings = await prisma.settings.upsert({
      where: { id: SETTINGS_ID },
      create: {
        id: SETTINGS_ID,
        businessName: businessName || "Flux Inventory",
        currency: currency || "USD",
        theme: theme || "light",
      },
      update: {
        businessName: businessName || "Flux Inventory",
        currency: currency || "USD",
        theme: theme || "light",
      },
    });

    return NextResponse.json(
      { message: "Settings updated successfully", settings: updatedSettings },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}
