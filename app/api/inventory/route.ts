import { NextRequest, NextResponse } from "next/server";
import { createInventoryTransaction } from "@/actions/inventory.action";
import prisma from "@/lib/db";
import { verifyRefreshToken } from "@/lib/token";

export async function POST(req: NextRequest) {
  return createInventoryTransaction(req);
}

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get("refreshToken")?.value;

    if (!token) {
      return NextResponse.json(
        { message: "Authentication required" },
        { status: 401 },
      );
    }

    let payload;
    try {
      payload = verifyRefreshToken(token);
    } catch {
      return NextResponse.json(
        { message: "Invalid or expired session" },
        { status: 401 },
      );
    }

    const transactions = await prisma.inventoryTransaction.findMany({
      include: {
        product: true,
        recordedBy: true,
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    return NextResponse.json(transactions);
  } catch (error) {
    console.error("Error fetching inventory transactions:", error);
    return NextResponse.json(
      { error: "Failed to fetch inventory transactions" },
      { status: 500 },
    );
  }
}
