import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { verifyRefreshToken } from "@/lib/token";
import { product } from "@/lib/validators/products.schema";

export async function createProduct(req: NextRequest) {
  try {
    const body = await req.json();
    const safeData = product.safeParse(body);

    if (!safeData.success) {
      return NextResponse.json(
        {
          message: "Invalid request data",
          errors: safeData.error.format(),
        },
        { status: 400 },
      );
    }

    const {
      name,
      sku,
      price,
      quantity,
      lowStockAt,
      categoryId,
      supplierId,
      isActive,
    } = safeData.data;

    const refreshToken = req.cookies.get("refreshToken")?.value;

    if (!refreshToken) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 },
      );
    }

    const tokenPayload = verifyRefreshToken(refreshToken);

    const newProduct = await prisma.product.create({
      data: {
        name,
        sku,
        price,
        quantity,
        lowStockAt,
        categoryId,
        supplierId,
        isActive,
        createdById: tokenPayload.userId,
      },
    });

    return NextResponse.json(
      {
        message: "Product created successfully.",
        product: newProduct,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Error creating product:", error);
    return NextResponse.json(
      { error: "Failed to create product" },
      { status: 500 },
    );
  }
}

export async function updateProduct(req: NextRequest) {
  try {
  } catch (error) {
    console.error("Error updating product:", error);
    return NextResponse.json(
      { error: "Failed to update product" },
      { status: 500 },
    );
  }
}

export async function deleteProduct(req: NextRequest) {
  try {
  } catch (error) {
    console.error("Error deleting product:", error);
    return NextResponse.json(
      { error: "Failed to delete product" },
      { status: 500 },
    );
  }
}

export async function getProducts() {
  try {
    const products = await prisma.product.findMany();
    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 },
    );
  }
}