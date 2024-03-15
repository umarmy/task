import { Product } from "@prisma/client"
import ProductForm from "../_components/ProductForm"

interface Props {
  product: Product
}

const EditProductPage = ({ product }: Props) => {
  <ProductForm product={product} />
}

export default EditProductPage
