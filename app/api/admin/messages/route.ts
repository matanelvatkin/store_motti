import { auth } from '@/lib/auth'
import dbConnect from '@/lib/dbConnect'
import MessageModel from '@/lib/models/MessageModel'

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
  const messages = await MessageModel.find()
  messages.forEach(message =>{
    if(message.endDate.getTime()<Date.now()){
      message.isActive = false
    }
  })
  return Response.json(messages.filter(message => message.isActive))
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
  const msg = new MessageModel({
    messages: 'sample message',
    endDate: new Date(new Date().getTime()+7 * 24 * 60 * 60 * 1000)
  })
  try {
    await msg.save()
 
    return Response.json(
      { message: 'Message created successfully', msg },
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