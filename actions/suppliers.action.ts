import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { supplier } from "@/lib/validators/suppliers.schema";

export async function createSupplier(req: NextRequest) {
  try {
    const body = await req.json();
    const safeData = supplier.safeParse(body);

    if (!safeData.success) {
      return NextResponse.json(
        {
          message: "Invalid request data",
          errors: safeData.error.format(),
        },
        { status: 400 },
      );
    }

    const { name, contactPerson, phone, email, address } = safeData.data;

    const newSupplier = await prisma.supplier.create({
      data: {
        name,
        contactPerson,
        phone,
        email,
        address,
      },
    });

    return NextResponse.json(newSupplier, { status: 201 });
  } catch (error) {
    console.error("Error creating supplier:", error);
    return NextResponse.json(
      { error: "Failed to create supplier" },
      { status: 500 },
    );
  }
}

export async function getSuppliers() {
  try {
    const suppliers = await prisma.supplier.findMany();
    return NextResponse.json(suppliers, { status: 200 });
  } catch (error) {
    console.error("Error fetching suppliers:", error);
    return NextResponse.json(
      { error: "Failed to fetch suppliers" },
      { status: 500 },
    );
  }
}

export async function deleteSupplier(req: NextRequest) {
  try {
    const { id } = await req.json();
    const deletedSupplier = await prisma.supplier.delete({
      where: { id },
    });
    return NextResponse.json(
      {
        message: "Supplier deleted successfully.",
        supplier: deletedSupplier,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error deleting supplier:", error);
    return NextResponse.json(
      { error: "Failed to delete supplier" },
      { status: 500 },
    );
  }
}
