'use client'
import { Page } from '@/lib/models/PageModel'
import { formatId } from '@/lib/utils'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import useSWR from 'swr'
import useSWRMutation from 'swr/mutation'
import parse from 'html-react-parser';

export default function Pages() {
  
  const { data: pages, error } = useSWR(`/api/admin/mainPages`)

  const router = useRouter()

  const { trigger: createPage, isMutating: isCreating } = useSWRMutation(
    `/api/admin/mainPages`,
    async (url) => {
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      const data = await res.json()
      if (!res.ok) return toast.error(data.message)

      toast.success('Page created successfully')
      router.push(`/admin/pages/${data.page._id}`)
    }
  )

  if (error) return 'An error has occurred.'
  if (!pages) return 'Loading...'

  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="py-4 text-2xl">Categories</h1>
        <button
          disabled={isCreating}
          onClick={() => createPage()}
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
              <th>title</th>
              <th>description</th>
              <th>actions</th>
            </tr>
          </thead>
          <tbody>
            {pages.map((page: Page) => (
              <tr key={page._id}>
                <td>{formatId(page._id!)}</td>
                <td>{page.title}</td>
                <td>{parse(page.description.substring(0,20))}...</td>
                <td>
                  <Link
                    href={`/admin/pages/${page._id}`}
                    type="button"
                    className="btn btn-ghost btn-sm"
                  >
                    Edit
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}