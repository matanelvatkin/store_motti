import mongoose from 'mongoose'
import { Category } from './CategoryModel'

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    category: [{ type: mongoose.Types.ObjectId, ref: 'Category'}],
    image: { type: String, required: true },
    price: { type: Number, required: true },
    brand: { type: String, required: true },
    rating: { type: Number, default: 0 },
    numReviews: { type: Number, required: true, default: 0 },
    countInStock: { type: Number, required: true, default: 0 },
    description: { type: String, required: true },
    isFeatured: { type: Boolean, default: false },
    banner: String,
  },
  {
    timestamps: true,
  }
)

const ProductModel =
  mongoose.models.Product || mongoose.model('Product', productSchema)

export default ProductModel

export type Product = {
  _id?: string
  name: string
  slug: string
  image: string
  banner?: string
  price: number
  brand: string
  description: string
  category?: any[]
  rating?: number
  numReviews: number
  countInStock: number
  colors?: []
  sizes?: []
}
