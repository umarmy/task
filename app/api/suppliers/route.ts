import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client"

export async function GET(request: NextRequest) {
  const suppliers = await prisma.supplier.findMany({
    orderBy: { name: 'asc' }
  });

  return NextResponse.json(suppliers);
}
