import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client"

export async function DELETE(request: NextRequest) {
  const body = await request.json();

  if (!body.product_id)
    return NextResponse.json(
      { error: 'Product not found' },
      { status: 404 }
    )

  await prisma.product.delete({
    where: {
      id: body.product_id
    }
  });

  return NextResponse.json({})
}
