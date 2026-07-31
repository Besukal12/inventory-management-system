import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { inventory } from "@/lib/validators/inventory.schema";
import { verifyRefreshToken } from "@/lib/token";

export async function createInventoryTransaction(req: NextRequest) {
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

    const body = await req.json();
    const safeData = inventory.safeParse(body);

    if (!safeData.success) {
      return NextResponse.json(
        {
          message: "Invalid request data",
          errors: safeData.error.format(),
        },
        { status: 400 },
      );
    }

    const { productId, type, quantity, note } = safeData.data;

    const newTransaction = await prisma.inventoryTransaction.create({
      data: {
        productId,
        type,
        quantity,
        note,
        recordedById: payload.userId,
      },
    });

    return NextResponse.json(
      {
        message: "Inventory transaction created successfully.",
        transaction: newTransaction,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Error creating inventory transaction:", error);
    return NextResponse.json(
      { error: "Failed to create inventory transaction" },
      { status: 500 },
    );
  }
}