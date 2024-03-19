import React from 'react'
import ProductForm from '../../_components/ProductForm'
import prisma from '@/prisma/client'

interface Props {
  params: {
    productId: string
  }
}

const EditProductPage = async ({ params: { productId } }: Props) => {
  const product = await prisma.product.findUnique({
    where: { id: productId }
  })

  return (
    <ProductForm product={product!} />
  )
}

export default EditProductPage
