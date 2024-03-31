import mongoose from 'mongoose'

const pageSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    image: { type: String},
    slug: { type: String},
    description: { type: String, required: true },
    inNavPage: { type: Boolean, default: false}
  },
  {
    timestamps: true,
  }
)

const PageModel =
  mongoose.models.Page || mongoose.model('Page', pageSchema)

export default PageModel

export type Page = {
  _id?: string
  title: string
  image?: string,
  description:  string,
  slug?:string,
  inNavPage?:boolean
}
