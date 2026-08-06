import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { inventory } from "@/lib/validators/inventory.schema";
import { verifyRefreshToken } from "@/lib/token";

export async function getInventoryTransactions(req: NextRequest) {
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

    if (quantity <= 0) {
      return NextResponse.json(
        { error: "Transaction quantity must be a positive integer" },
        { status: 400 },
      );
    }

    const result = await prisma.$transaction(async (tx) => {
      const product = await tx.product.findUnique({
        where: { id: productId },
      });

      if (!product) {
        throw new Error("Product not found");
      }

      if (product.quantity < 0) {
        throw new Error("Product stock cannot be negative");
      }

      const nextQuantity =
        type === "STOCK_IN"
          ? product.quantity + quantity
          : product.quantity - quantity;

      if (type === "STOCK_OUT" && nextQuantity < 0) {
        throw new Error("Insufficient stock for stock-out transaction");
      }

      const newTransaction = await tx.inventoryTransaction.create({
        data: {
          productId,
          type,
          quantity,
          note,
          recordedById: payload.userId,
        },
      });

      const updatedProduct = await tx.product.update({
        where: { id: productId },
        data: {
          quantity: nextQuantity,
        },
      });

      return {
        transaction: newTransaction,
        product: updatedProduct,
      };
    });

    return NextResponse.json(
      {
        message: "Inventory transaction created successfully.",
        transaction: result.transaction,
        product: result.product,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Error creating inventory transaction:", error);

    if (error instanceof Error) {
      if (error.message === "Product not found") {
        return NextResponse.json(
          { error: "Product not found" },
          { status: 404 },
        );
      }

        if (error.message === "Product stock cannot be negative") {
          return NextResponse.json(
            { error: "Product stock is invalid; current stock cannot be negative" },
            { status: 400 },
          );
        }

    return NextResponse.json(
      { error: "Failed to create inventory transaction" },
      { status: 500 },
    );
  }
}

export async function deleteInventoryTransaction(req: NextRequest) {
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

    const { transactionId } = await req.json();

    if (!transactionId) {
      return NextResponse.json(
        { error: "Transaction ID is required" },
        { status: 400 },
      );
    }

    const result = await prisma.$transaction(async (tx) => {
      const transaction = await tx.inventoryTransaction.findUnique({
        where: { id: transactionId },
      });

      if (!transaction) {
        throw new Error("Transaction not found");
      }

      const product = await tx.product.findUnique({
        where: { id: transaction.productId },
      });

      if (!product) {
        throw new Error("Product not found");
      }

      const revertedQuantity =
        transaction.type === "STOCK_IN"
          ? product.quantity - transaction.quantity
          : product.quantity + transaction.quantity;

      const deletedTransaction = await tx.inventoryTransaction.delete({
        where: { id: transactionId },
      });

      await tx.product.update({
        where: { id: transaction.productId },
        data: {
          quantity: revertedQuantity,
        },
      });

      return deletedTransaction;
    });

    return NextResponse.json(
      {
        message: "Inventory transaction deleted successfully.",
        transaction: result,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error deleting inventory transaction:", error);

    if (error instanceof Error && error.message === "Transaction not found") {
      return NextResponse.json(
        { error: "Transaction not found" },
        { status: 404 },
      );
    }

    if (error instanceof Error && error.message === "Product not found") {
      return NextResponse.json(
        { error: "Product not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(
      { error: "Failed to delete inventory transaction" },
      { status: 500 },
    );
  }
}
}