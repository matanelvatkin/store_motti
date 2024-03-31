import { auth } from '@/lib/auth'
import dbConnect from '@/lib/dbConnect'
import PageModel from '@/lib/models/PageModel'

export const GET = auth(async (req: any) => {
  if (!req.auth || !req.auth.user?.isAdmin) {
    return Response.json(
      { message: 'unauthorized' },
      {
        status: 401,
      }
    )
  }
  await dbConnect()
  const pages = await PageModel.find({inNavPage:true})
  return Response.json(pages)
}) as any

export const POST = auth(async (req: any) => {
  if (!req.auth || !req.auth.user?.isAdmin) {
    return Response.json(
      { message: 'unauthorized' },
      {
        status: 401,
      }
    )
  }
  await dbConnect()
  const page = new PageModel({
    title: 'sample name',
    image: '/images/page.jpg',
    description: 'sample description',
    slug:'sample slug',
    inNavPage:true
  })
  try {
    await page.save()
 
    return Response.json(
      { message: 'Page created successfully', page },
      {
        status: 201,
      }
    )
  } catch (err: any) {
    return Response.json(
      { message: err.message },
      {
        status: 500,
      }
    )
  }
}) as any