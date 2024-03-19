import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client"
import { productSchema } from "@/app/validationSchema";

export async function POST(request: NextRequest) {
  const body = await request.json();

  const validation = productSchema.safeParse(body);

  if (!validation.success)
    return NextResponse.json(
      validation.error.format(),
      { status: 400 }
    )

  const supplier = await prisma.supplier.findUnique({
    where: {
      id: body.supplier_id
    }
  });

  if (!supplier) return NextResponse.json(
    { error: 'Supplier not found.' },
    { status: 404 }
  )

  const newProduct = await prisma.product.create({
    data: {
      name: body.name,
      description: body.description,
      price: parseFloat(body.price),
      quantity: parseInt(body.quantity),
      category: parseInt(body.category),
      supplier_id: body.supplier_id,
    }
  })

  return NextResponse.json(newProduct, { status: 201 })
}
