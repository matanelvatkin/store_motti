import mongoose from 'mongoose'

const messageSchema = new mongoose.Schema(
  {
    message:String,
    date:{type:Date, default:new Date},
    endDate:{type:Date,required:true},
    isActive:{type:Boolean,default:true},
  },
  {
    timestamps: true,
  }
)

const MessageModel =
  mongoose.models.Message || mongoose.model('Message', messageSchema)

export default MessageModel

export type Message = {
  _id?: string,
  message:string,
  date:Date,
  endDate:Date,
  isActive:boolean
}
