import { Button } from "@/components/ui/button"
import Link from "next/link"
import ProductFilter from "./ProductFilter"

const ProductActions = () => {
  return (
    <div className="flex justify-between items-center space-x-4 mb-4">
      <ProductFilter />
      <Button>
        <Link href='/inventory/new'>New Product</Link>
      </Button>
    </div>
  )
}

export default ProductActions
