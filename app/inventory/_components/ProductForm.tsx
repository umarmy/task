'use client';

import { productSchema } from "@/app/validationSchema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Product, Supplier } from "@prisma/client";
import axios, { CanceledError } from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form"
import { z } from "zod";
import Spinner from "@/components/Spinner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import apiClient from "@/services/api-client";
import DeleteProductButton from "../[productId]/edit/DeleteProductButton";

type productFormData = z.infer<typeof productSchema>;

const ProductForm = ({ product }: { product?: Product }) => {
  const router = useRouter();
  const form = useForm<productFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: product?.name,
      description: product?.description,
      category: product?.category.toString(),
      price: product?.price.toString(),
      quantity: product?.quantity.toString(),
      supplier_id: product?.supplier_id
    },
  });
  const [error, setError] = useState('');
  const [isSubmitting, setSubmitting] = useState(false);

  const categories: number[] = [1, 2, 3, 4, 5];

  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [isLoadingSupplier, setLoadingSupplier] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    setLoadingSupplier(true);
    apiClient
      .get('/suppliers', { signal: controller.signal })
      .then((res) => {
        setSuppliers(res.data);
        setLoadingSupplier(false);
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        setError(err.message)
        setLoadingSupplier(false);
      })

    return () => controller.abort();
  }, []);

  const onSubmit = form.handleSubmit(async (data) => {
    try {
      setSubmitting(true);
      if (product)
        await axios.patch(`/api/inventory/${product.id}`, data)
      else
        await axios.post('/api/add-inventory', data);
      router.push('/inventory');
      router.refresh();
    } catch (error) {
      setSubmitting(false);
      setError('Error has occured');
    }
  });

  return (
    <Form {...form}>
      <form
        className="space-y-4"
        onSubmit={onSubmit}
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )
          }}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )
          }}
        />
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <Select
                  disabled={isSubmitting}
                  onValueChange={field.onChange}
                  defaultValue={product?.category.toString()}
                >
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {categories.map(category => (
                      <SelectItem
                        key={category}
                        value={category.toString()}
                      >
                        {category.toString()}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )
          }}
        />
        <FormField
          control={form.control}
          name="quantity"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Quantity</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )
          }}
        />
        <FormField
          control={form.control}
          name="supplier_id"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Supplier</FormLabel>
                <Select
                  disabled={isSubmitting}
                  onValueChange={field.onChange}
                  defaultValue={product?.supplier_id.toString()}
                >
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select supplier" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {suppliers.map(supplier => (
                      <SelectItem
                        key={supplier.id}
                        value={supplier.id}
                      >
                        {supplier.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <div className="flex items-center space-x-2">
          <Button
            disabled={isSubmitting}
            type="submit"
          >
            {
              product
                ? 'Update Product'
                : 'Submit New Product'}{' '} {isSubmitting && <Spinner />
            }
          </Button>
          {
            product && (
              <DeleteProductButton productId={product.id} />
            )
          }
        </div>
      </form>
    </Form>
  )
}

export default ProductForm
