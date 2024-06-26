import dbConnect from '@/lib/dbConnect'
import PageModel from '@/lib/models/PageModel'

export const GET = async (req: any) => {
  await dbConnect()
  const pages = await PageModel.find({inNavPage:false})
  
  return Response.json(pages)
}
