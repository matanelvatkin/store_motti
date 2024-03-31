'use client'
import useSWRMutation from 'swr/mutation'
import useSWR,{mutate} from 'swr'
import toast from 'react-hot-toast'
import Link from 'next/link'
import { useForm, Controller } from 'react-hook-form'
import { useEffect, } from 'react'
import { Message } from '@/lib/models/MessageModel'
import { formatId } from '@/lib/utils'
import { useRouter } from 'next/navigation'

export default function MessageEditForm({ messageId }: { messageId: string }) {
 
  const { data: message, error } = useSWR(`/api/admin/messages/${messageId}`)

  const router = useRouter()
  const { trigger: updateMessage, isMutating: isUpdating } = useSWRMutation(
    `/api/admin/messages/${messageId}`,
    async (url, { arg }) => {
      const res = await fetch(`${url}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(arg),
      })
      const data = await res.json()
      if (!res.ok) return toast.error(data.message)

      toast.success('Message updated successfully')
      router.push('/admin/messages')
      mutate('/api/messages');
    }
  )

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<Message>()

  useEffect(() => {
    if (!message) return
    setValue('message', message.name)
    setValue('date', message.date)
    setValue('endDate', message.endDate)
    setValue('isActive', message.isActive)
  }, [message, setValue])

  const formSubmit = async (formData: any) => {
    await updateMessage(formData)
  }

  if (error) return error.message
  if (!message) return 'Loading...'


  return (
    <div>
      <h1 className="text-2xl py-4">Edit Message {formatId(messageId)}</h1>
      <form onSubmit={handleSubmit(formSubmit)}>
        <div className="md:flex mb-6">
          <label className="label md:w-1/5" htmlFor="name">
            Message
          </label>
          <div className="md:w-4/5">
            <input
              type="text"
              id="message"
              {...register('message', { required: 'Message is required' })}
              className="input input-bordered w-full max-w-md"
            />
            {errors.message && (
              <div className="text-error">{errors.message.message}</div>
            )}
          </div>
        </div>
        <div className="md:flex mb-6">
          <label className="label md:w-1/5" htmlFor="name">
            start date
          </label>
          <div className="md:w-4/5">
            <input
              type="datetime-local"
              id="date"
              {...register('date', { required: 'date is required' })}
              className="input input-bordered w-full max-w-md"
            />
            {errors.date && (
              <div className="text-error">{errors.date.message}</div>
            )}
          </div>
        </div>
        <div className="md:flex mb-6">
          <label className="label md:w-1/5" htmlFor="name">
            end date
          </label>
          <div className="md:w-4/5">
            <input
              type="datetime-local"
              id="endDate"
              {...register('endDate', { required: 'end date is required' })}
              className="input input-bordered w-full max-w-md"
            />
            {errors.endDate && (
              <div className="text-error">{errors.endDate.message}</div>
            )}
          </div>
        </div>
        <div className="md:flex mb-6">
          <label className="label md:w-1/5" htmlFor="name">
            is active
          </label>
          <div className="md:w-4/5">
            <input
              type="checkbox"
              id="isActive"
              {...register('isActive')}
              className="checkbox max-w-md"
              defaultChecked={message.isActive}
            />
            {errors.isActive && (
              <div className="text-error">{errors.isActive.message}</div>
            )}
          </div>
        </div>
      <button type="submit" disabled={isUpdating} className="btn btn-primary">
          {isUpdating && <span className="loading loading-spinner"></span>}
          Update
        </button>
        <Link className="btn ml-4" href="/admin/messages">
          Cancel
        </Link>
      </form>
    </div>
  )
}