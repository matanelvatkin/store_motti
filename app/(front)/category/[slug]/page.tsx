import productService from '@/lib/services/productService'
import { Product } from '@/lib/models/ProductModel'
import ProductItem from '@/components/products/ProductItem'

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}) {
  const product = await productService.getBySlug(params.slug)
  if (!product) {
    return { title: 'Product not found' }
  }
  return {
    title: product.name,
    description: product.description,
  }
}

export default async function Categories({
  params,
}: {
  params: { slug: string }
}) {
    
  const products:Product[]|undefined = await productService.getByCategory(decodeURIComponent(params.slug))
  if (!products) {
    return <div>Product not found</div>
  }
  return (
    <>
      <div className="my-2">
        {products?products.map((product)=>{
            return <ProductItem product={product} key={product._id}/>
        }):<div></div>}
      </div>
    </>
  )
}
