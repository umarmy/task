'use client';

import {
  Select, SelectContent,
  SelectItem,
  SelectTrigger
} from '@/components/ui/select';
import { useRouter, useSearchParams } from 'next/navigation';

const ProductFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const categories: any[] = [0, 1, 2, 3, 4, 5];

  return (
    <Select
      defaultValue={searchParams.get('category') || ''}
      onValueChange={(category) => {
        const params = new URLSearchParams();
        if (category) params.append('category', category);
        if (searchParams.get('orderBy'))
          params.append('orderBy', searchParams.get('orderBy')!);
        if (searchParams.get('sortOrder'))
          params.append('sortOrder', searchParams.get('sortOrder')!);

        const query = params.size
          ? '?' + params.toString()
          : '';
        router.push('/inventory' + query);
      }}>
      <SelectTrigger>
        {
          searchParams.get('category')
            ? `Category ${searchParams.get('category')}`
            : 'Filter by category ...'
        }
      </SelectTrigger>
      <SelectContent>
        {categories.map(category => (
          <SelectItem
            key={category}
            value={category}
          >
            {
              category === 0
                ? 'All'
                : `Category ${category}`
            }
          </SelectItem>
        ))}
      </SelectContent>
    </Select >
  )
}

export default ProductFilter
