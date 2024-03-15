'use client';

import Spinner from "@/components/Spinner";
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select";
import apiClient from "@/services/api-client";
import { Product, Supplier } from "@prisma/client";
import { CanceledError } from "axios";
import { useEffect, useState } from "react";

interface Props {
  product?: Product
  register: any
}

const SupplierList = ({ register, product }: Props) => {
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [supplier, setSupplier] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    setLoading(true);
    apiClient
      .get('/inventory', { signal: controller.signal })
      .then((res) => {
        setSuppliers(res.data);
        setLoading(false);
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        setError(err.message)
        setLoading(false);
      })

    return () => controller.abort();
  }, []);

  if (error) return null;

  return (
    <>
      {isLoading && <Spinner />}
      {!isLoading && (
        <Select
          {...register('supplier_id')}

          defaultValue={product?.supplier_id || supplier}
          onValueChange={(supplier) => {
            setSupplier(supplier)
          }}
        >
          <SelectTrigger className="w-full">
            {supplier ?
              suppliers.find(s => s.id === supplier)?.name
              : 'Select Supplier'
            }
          </SelectTrigger>
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
      )}
    </>
  )
}

export default SupplierList
