import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client"

export async function GET(
  request: NextRequest,
  { params }: { params: { productId: string } }
) {
  if (!params.productId) return NextResponse.json({ error: 'Product no found' }, { status: 404 })

  const product = await prisma.product.findUnique({
    where: {
      id: params.productId
    },
    include: {
      supplier: true,
    }
  });

  return NextResponse.json(product);
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { productId: string } }
) {
  const body = await request.json();

  const product = await prisma.product.findUnique({
    where: {
      id: params.productId
    }
  });

  if (!product)
    return NextResponse.json(
      { error: 'Product not found' },
      { status: 404 }
    )

  const updatedProduct = await prisma.product.update({
    where: {
      id: params.productId
    },
    data: {
      name: body.name,
      description: body.description,
      price: parseFloat(body.price),
      quantity: parseInt(body.quantity),
      category: parseInt(body.category),
    }
  });

  return NextResponse.json(updatedProduct, { status: 201 })
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { productId: string } }
) {
  const product = await prisma.product.findUnique({
    where: {
      id: params.productId
    }
  });

  if (!product)
    return NextResponse.json(
      { error: 'Product not found' },
      { status: 404 }
    )

  await prisma.product.delete({
    where: {
      id: params.productId
    }
  });

  return NextResponse.json({})
}
