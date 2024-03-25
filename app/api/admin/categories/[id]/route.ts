import { auth } from '@/lib/auth'
import dbConnect from '@/lib/dbConnect'
import CategoryModel from '@/lib/models/CategoryModel'

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
  const category = await CategoryModel.findById(params.id)
  if (!category) {
    return Response.json(
      { message: 'category not found' },
      {
        status: 404,
      }
    )
  }
  return Response.json(category)
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

  const { name, image, icon, iconSvg, description,slug,code,inMainNav } = await req.json()

  try {
    await dbConnect()

    const category = await CategoryModel.findById(params.id)
    if (category) {
      category.name = name
      category.image = image
      category.icon = icon
      category.iconSvg = iconSvg
      category.description = description
      category.slug = slug
      category.code = code
      category.inMainNav = inMainNav

      

      const updatedCategory = await category.save()
      return Response.json(updatedCategory)
    } else {
      return Response.json(
        { message: 'Category not found' },
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
    const category = await CategoryModel.findById(params.id)
    if (category) {
      await category.deleteOne()
      return Response.json({ message: 'Category deleted successfully' })
    } else {
      return Response.json(
        { message: 'Category not found' },
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