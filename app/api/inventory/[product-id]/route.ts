import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client"

export async function GET(
  request: NextRequest,
  { params }: { params: { 'product-id': string } }
) {
  if (!params["product-id"]) return NextResponse.json({ error: 'Product no found' }, { status: 404 })

  const product = await prisma.product.findUnique({
    where: {
      id: params["product-id"]
    },
    include: {
      supplier: true,
    }
  });

  return NextResponse.json(product);
}
