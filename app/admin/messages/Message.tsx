'use client'
import { Message } from '@/lib/models/MessageModel'
import { formatId } from '@/lib/utils'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import useSWR from 'swr'
import useSWRMutation from 'swr/mutation'

export default function Categories() {
  
  const { data: messages, error } = useSWR(`/api/admin/messages`)

  const router = useRouter()

  const { trigger: deleteMessage } = useSWRMutation(
    `/api/admin/messages`,
    async (url, { arg }: { arg: { messageId: string } }) => {
      const toastId = toast.loading('Deleting category...')
      const res = await fetch(`${url}/${arg.messageId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      const data = await res.json()
      res.ok
        ? toast.success('Message deleted successfully', {
            id: toastId,
          })
        : toast.error(data.message, {
            id: toastId,
          })
    }
  )

  const { trigger: createMessage, isMutating: isCreating } = useSWRMutation(
    `/api/admin/messages`,
    async (url) => {
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      const data = await res.json()
      if (!res.ok) return toast.error(data.message)

      toast.success('Message created successfully')
      router.push(`/admin/messages/${data.msg._id}`)
    }
  )

  if (error) return 'An error has occurred.'
  if (!messages) return 'Loading...'

  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="py-4 text-2xl">Message</h1>
        <button
          disabled={isCreating}
          onClick={() => createMessage()}
          className="btn btn-primary btn-sm"
        >
          {isCreating && <span className="loading loading-spinner"></span>}
          Create
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th>id</th>
              <th>message</th>
              <th>end Date</th>
              <th>isActive</th>
            </tr>
          </thead>
          <tbody>
            {messages.map((msg: Message) => (
              <tr key={msg._id}>
                <td>{formatId(msg._id!)}</td>
                <td>{msg.message}</td>
                <td>{msg.endDate.toString()}</td>
                <td>
                  <Link
                    href={`/admin/messages/${msg._id}`}
                    type="button"
                    className="btn btn-ghost btn-sm"
                  >
                    Edit
                  </Link>
                  &nbsp;
                  <button
                    onClick={() => deleteMessage({ messageId: msg._id! })}
                    type="button"
                    className="btn btn-ghost btn-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}