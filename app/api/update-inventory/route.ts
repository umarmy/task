import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client"

export async function PATCH(request: NextRequest) {
  const body = await request.json();

  if (!body.product_id)
    return NextResponse.json(
      { error: 'Product not found' },
      { status: 404 }
    )

  if (!body.supplier_id)
    return NextResponse.json(
      { error: 'Supplier not found' },
      { status: 404 }
    )

  const product = await prisma.product.update({
    where: {
      id: body.product_id
    },
    data: {
      name: body.product_name,
      description: body.product_description,
      price: body.product_price,
      quantity: body.product_quantity,
      category: body.product_category,
    }
  });

  const supplier = await prisma.supplier.update({
    where: {
      id: body.supplier_id
    },
    data: {
      name: body.supplier_name,
      email: body.supplier_email,
      phone: body.supplier_phone,
    }
  });

  const data = { supplier, product };

  return NextResponse.json(data, { status: 201 })
}
