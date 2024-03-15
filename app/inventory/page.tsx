import prisma from '@/prisma/client';
import ProductActions from './ProductActions';
import ProductTable, { ProductQuery, columnNames } from './ProductTable';

interface Props {
  searchParams: ProductQuery
}

const InventoryPage = async ({ searchParams }: Props) => {
  const category = parseInt(searchParams.category) || undefined;

  const orderBy = columnNames
    .includes(searchParams.orderBy)
    ? { [searchParams.orderBy]: searchParams.sortOrder }
    : undefined;

  const products = await prisma.product.findMany({
    where: {
      category
    },
    orderBy
  });

  return (
    <>
      <ProductActions />
      <ProductTable
        products={products}
        searchParams={searchParams}
      />
    </>
  )
}

export default InventoryPage
