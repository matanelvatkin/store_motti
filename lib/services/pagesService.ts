import { cache } from "react"
import dbConnect from "../dbConnect"
import PageModel, { Page } from "../models/PageModel"

const getBySlug = cache(async (slug: string) => {
    await dbConnect()
    
    const page = await PageModel.findOne({ slug:decodeURIComponent(slug) }).lean()
    return page as Page
  })

  const pageService = {
    getBySlug,
  }
  export default pageService