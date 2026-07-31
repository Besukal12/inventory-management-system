import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { category } from "@/lib/validators/categories.schema";

export async function createCategory(req: NextRequest) {
  try {
    const body = await req.json();
    const safeData = category.safeParse(body);

    if (!safeData.success) {
      return NextResponse.json(
        {
          message: "Invalid request data",
          errors: safeData.error.format(),
        },
        { status: 400 },
      );
    }

    const { name } = safeData.data;

    const newCategory = await prisma.category.create({
      data: {
        name,
      },
    });

    return NextResponse.json(
      {
        message: "Category created successfully.",
        category: newCategory,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Error creating category:", error);

    if (
      error instanceof Error &&
      "code" in error &&
      error.code === "P2002"
    ) {
      return NextResponse.json(
        {
          message: "A category with this name already exists.",
          error: "Duplicate category name",
        },
        { status: 409 },
      );
    }

    const message =
      error instanceof Error ? error.message : "Failed to create category";
    return NextResponse.json(
      { message, error: "Failed to create category" },
      { status: 500 },
    );
  }
}

export async function getCategories() {
  try {
    const categories = await prisma.category.findMany();
    return NextResponse.json(categories, { status: 200 });
  } catch (error) {
    console.error("Error fetching categories:", error);
    return NextResponse.json(
      { error: "Failed to fetch categories" },
      { status: 500 },
    );
  }
}

export async function deleteCategory(req: NextRequest) {
  try {
    const { id } = await req.json();
    const deletedCategory = await prisma.category.delete({
      where: { id },
    });
    return NextResponse.json(
      {
        message: "Category deleted successfully.",
        category: deletedCategory,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error deleting category:", error);
    return NextResponse.json(
      { error: "Failed to delete category" },
      { status: 500 },
    );
  }
}
