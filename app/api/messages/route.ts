import dbConnect from '@/lib/dbConnect'
import MessageModel from '@/lib/models/MessageModel'

export const GET = async (req: any) => {
  await dbConnect()
  const messages = await MessageModel.find()

  return Response.json(messages)
}
