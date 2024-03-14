import dbConnect from '@/lib/dbConnect'
import CategoryModel from '@/lib/models/CategoryModel'

export const GET = async (req: any) => {
  await dbConnect()
  const categories = await CategoryModel.find().distinct('name')
  
  return Response.json(categories)
}
