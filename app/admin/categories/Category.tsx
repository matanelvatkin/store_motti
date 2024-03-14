'use client'
import { Category } from '@/lib/models/CategoryModel'
import { formatId } from '@/lib/utils'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import useSWR from 'swr'
import useSWRMutation from 'swr/mutation'

export default function Categories() {
  const { data: categories, error } = useSWR(`/api/admin/categories`)

  const router = useRouter()

  const { trigger: deleteCategory } = useSWRMutation(
    `/api/admin/categories`,
    async (url, { arg }: { arg: { categoryId: string } }) => {
      const toastId = toast.loading('Deleting category...')
      const res = await fetch(`${url}/${arg.categoryId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      const data = await res.json()
      res.ok
        ? toast.success('Category deleted successfully', {
            id: toastId,
          })
        : toast.error(data.message, {
            id: toastId,
          })
    }
  )

  const { trigger: createCategory, isMutating: isCreating } = useSWRMutation(
    `/api/admin/categories`,
    async (url) => {
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      const data = await res.json()
      if (!res.ok) return toast.error(data.message)

      toast.success('Category created successfully')
      router.push(`/admin/categories/${data.category._id}`)
    }
  )

  if (error) return 'An error has occurred.'
  if (!categories) return 'Loading...'

  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="py-4 text-2xl">Categories</h1>
        <button
          disabled={isCreating}
          onClick={() => createCategory()}
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
              <th>name</th>
              <th>description</th>
              <th>actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category: Category) => (
              <tr key={category._id}>
                <td>{formatId(category._id!)}</td>
                <td>{category.name}</td>
                <td>{category.description}</td>
                <td>
                  <Link
                    href={`/admin/categories/${category._id}`}
                    type="button"
                    className="btn btn-ghost btn-sm"
                  >
                    Edit
                  </Link>
                  &nbsp;
                  <button
                    onClick={() => deleteCategory({ categoryId: category._id! })}
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