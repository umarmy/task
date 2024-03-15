import { Button } from "@/components/ui/button"
import ProductFilter from "./ProductFilter"
import Link from "next/link"

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
