import mongoose from 'mongoose'

const categorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    image: { type: String},
    icon: { type: String},
    iconSvg: { type: String},
    slug: { type: String},
    code: { type: String},
    description: { type: String, required: true },
    inMainNav:{type:Boolean, default: false}
  },
  {
    timestamps: true,
  }
)

const CategoryModel =
  mongoose.models.Category || mongoose.model('Category', categorySchema)

export default CategoryModel

export type Category = {
  _id?: string
  name: string
  image?: string,
  icon?:  string,
  iconSvg?:  string,
  description:  string,
  code?:string,
  slug?:string,
  inMainNav?:boolean
}
