'use client';

import { productSchema } from '@/app/validationSchema';
import ErrorMessage from '@/components/ErrorMessage';
import Spinner from '@/components/Spinner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { zodResolver } from '@hookform/resolvers/zod';
import { Product } from '@prisma/client';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

type ProductFormData = z.infer<typeof productSchema>;

const ProductForm = ({ product }: { product?: Product }) => {
  const router = useRouter();

  const { register,
    handleSubmit,
    formState: { errors }
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema)
  });

  const [isSubmitting, setSubmitting] = useState(false);

  const onSubmit = handleSubmit(async (data) => {
    try {
      setSubmitting(true);
      if (product)
        await axios.patch(`/api/inventory/${product.id}`, data)
      else
        await axios.post('/api/inventory', data);
      router.push('/inventory');
      router.refresh();
    } catch (error) {
      setSubmitting(false);
    }
  });

  return (
    <div>
      <form
        className='space-y-3'
        onSubmit={onSubmit}
      >
        <div>
          <Label>Name</Label>
          <Input
            defaultValue={product?.name}
            {...register('name')}
          />
          <ErrorMessage>{errors.name?.message}</ErrorMessage>
        </div>

        <div>
          <Label>Description</Label>
          <Input
            defaultValue={product?.description}
            {...register('description')}
          />
          <ErrorMessage>{errors.description?.message}</ErrorMessage>
        </div>

        <div>
          <Label>Price</Label>
          <Input
            defaultValue={product?.price.toFixed(2) || 1}
            {...register('price')}
          />
          <ErrorMessage>{errors.price?.message}</ErrorMessage>
        </div>

        <div>
          <Label>Quantity</Label>
          <Input
            defaultValue={product?.quantity || 1}
            {...register('quantity')}
          />
          <ErrorMessage>{errors.quantity?.message}</ErrorMessage>
        </div>

        <Button
          disabled={isSubmitting}
        >
          {
            product
              ? 'Update Product'
              : 'Submit New Product'}{' '} {isSubmitting && <Spinner />
          }
        </Button>
      </form>
    </div>
  )
}

export default ProductForm
