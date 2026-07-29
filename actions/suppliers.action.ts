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
