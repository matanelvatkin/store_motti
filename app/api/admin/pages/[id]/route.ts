import { auth } from '@/lib/auth'
import dbConnect from '@/lib/dbConnect'
import PageModel from '@/lib/models/PageModel'

export const GET = auth(async (...args: any) => {
  const [req, { params }] = args
  if (!req.auth || !req.auth.user?.isAdmin) {
    return Response.json(
      { message: 'unauthorized' },
      {
        status: 401,
      }
    )
  }
  await dbConnect()
  const page = await PageModel.findById(params.id)
  if (!page) {
    return Response.json(
      { message: 'page not found' },
      {
        status: 404,
      }
    )
  }
  return Response.json(page)
}) as any

export const PUT = auth(async (...args: any) => {
  const [req, { params }] = args
  if (!req.auth || !req.auth.user?.isAdmin) {
    return Response.json(
      { message: 'unauthorized' },
      {
        status: 401,
      }
    )
  }

  const { title, image, description,slug } = await req.json()

  try {
    await dbConnect()

    const page = await PageModel.findById(params.id)
    if (page) {
      page.title = title
      page.image = image
      page.description = description
      page.slug = slug
      
      const updatedPage = await page.save()
      return Response.json(updatedPage)
    } else {
      return Response.json(
        { message: 'Page not found' },
        {
          status: 404,
        }
      )
    }
  } catch (err: any) {
    return Response.json(
      { message: err.message },
      {
        status: 500,
      }
    )
  }
}) as any

export const DELETE = auth(async (...args: any) => {
  const [req, { params }] = args

  if (!req.auth || !req.auth.user?.isAdmin) {
    return Response.json(
      { message: 'unauthorized' },
      {
        status: 401,
      }
    )
  }

  try {
    await dbConnect()
    const page = await PageModel.findById(params.id)
    if (page) {
      await page.deleteOne()
      return Response.json({ message: 'Page deleted successfully' })
    } else {
      return Response.json(
        { message: 'Page not found' },
        {
          status: 404,
        }
      )
    }
  } catch (err: any) {
    return Response.json(
      { message: err.message },
      {
        status: 500,
      }
    )
  }
}) as any