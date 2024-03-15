import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { Product } from "@prisma/client";
import { ArrowDownIcon, ArrowUpIcon } from 'lucide-react';
import Link from 'next/link';

export interface ProductQuery {
  category: string,
  orderBy: keyof Product,
  sortOrder: "asc" | "desc";
}

interface Props {
  searchParams: ProductQuery,
  products: Product[]
}

const ProductTable = ({ searchParams, products }: Props) => {
  const toggleOrder = () => {
    return !searchParams.sortOrder || searchParams.sortOrder === "desc"
      ? "asc"
      : "desc";
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          {columns.map(column => (
            <TableHead key={column.value}>
              <Link href={{
                query: { ...searchParams, orderBy: column.value, sortOrder: toggleOrder() }
              }}>{column.label}</Link>
              {
                column.value === searchParams.orderBy
                && (
                  searchParams.sortOrder === "asc"
                    ? <ArrowUpIcon className='inline w-5' />
                    : <ArrowDownIcon className='inline w-5' />
                )
              }
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {products.map(product => (
          <TableRow key={product.id}>
            <TableCell>{product.name}</TableCell>
            <TableCell>{product.category}</TableCell>
            <TableCell>{product.price.toFixed(2)}</TableCell>
            <TableCell>{product.quantity}</TableCell>
            <TableCell>{product.created_at.toDateString()}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table >
  )
}

const columns: {
  label: string;
  value: keyof Product;
  className?: string;
}[] = [
    { label: 'Name', value: 'name' },
    { label: 'Category', value: 'category' },
    { label: 'Price (RM)', value: 'price' },
    { label: 'Quantity', value: 'quantity' },
    { label: 'Created At', value: 'created_at' }
  ];

export const columnNames = columns.map(column => column.value);

export default ProductTable
