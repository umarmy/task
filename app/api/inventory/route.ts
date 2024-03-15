import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client"

export async function GET(request: NextRequest) {
  const products = await prisma.product.findMany({
    orderBy: { name: 'asc' },
    include: {
      supplier: true,
    }
  });

  return NextResponse.json(products);
}
