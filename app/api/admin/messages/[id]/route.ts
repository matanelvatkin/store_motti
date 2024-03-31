import { auth } from '@/lib/auth'
import dbConnect from '@/lib/dbConnect'
import MessageModel from '@/lib/models/MessageModel'

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
  const msg = await MessageModel.findById(params.id)
  if (!msg) {
    return Response.json(
      { message: 'message not found' },
      {
        status: 404,
      }
    )
  }
  return Response.json(msg)
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

  const { message,date,endDate,isActive } = await req.json()

  try {
    await dbConnect()

    const msg = await MessageModel.findById(params.id)
    if (msg) {
      msg.message = message
      msg.date = date
      msg.endDate = endDate
      msg.isActive = isActive

      

      const updatedMessage = await msg.save()
      return Response.json(updatedMessage)
    } else {
      return Response.json(
        { message: 'Message not found' },
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
    const msg = await MessageModel.findById(params.id)
    if (msg) {
      await msg.deleteOne()
      return Response.json({ message: 'Message deleted successfully' })
    } else {
      return Response.json(
        { message: 'Message not found' },
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