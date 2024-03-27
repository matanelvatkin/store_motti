'use client'
import useSWRMutation from 'swr/mutation'
import useSWR,{mutate} from 'swr'
import toast from 'react-hot-toast'
import Link from 'next/link'
import { useForm, Controller } from 'react-hook-form'
import { useEffect, } from 'react'
import { Page } from '@/lib/models/PageModel'
import { formatId } from '@/lib/utils'
import { useRouter } from 'next/navigation'

export default function PagesEditForm({ pageId }: { pageId: string }) {
 
  const { data: page, error } = useSWR(`/api/admin/pages/${pageId}`)

  const router = useRouter()
  const { trigger: updatePage, isMutating: isUpdating } = useSWRMutation(
    `/api/admin/pages/${pageId}`,
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

      toast.success('Page updated successfully')
      router.push('/admin/pages')
      mutate('/api/pages');
    }
  )

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<Page>()

  useEffect(() => {
    if (!page) return
    setValue('image', page.image)
    setValue('description', page.description)
    setValue('slug', page.slug||'')
    setValue('title', page.title)
  }, [page, setValue])

  const formSubmit = async (formData: any) => {
    await updatePage(formData)
  }

  if (error) return error.message
  if (!page) return 'Loading...'

  const uploadHandler = async (e: any) => {
    const toastId = toast.loading('Uploading image...')
    try {
      const resSign = await fetch('/api/cloudinary-sign', {
        method: 'POST',
      })
      const { signature, timestamp } = await resSign.json()
      const file = e.target.files[0]
      const formData = new FormData()
      formData.append('file', file)
      formData.append('signature', signature)
      formData.append('timestamp', timestamp)
      formData.append('api_key', process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY!)
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/upload`,
        {
          method: 'POST',
          body: formData,
        }
      )
      const data = await res.json()
      setValue('image', data.secure_url)
      toast.success('File uploaded successfully', {
        id: toastId,
      })
    } catch (err: any) {
      toast.error(err.message, {
        id: toastId,
      })
    }
  }

 

  return (
    <div>
      <h1 className="text-2xl py-4">Edit Page {formatId(pageId)}</h1>
      <form onSubmit={handleSubmit(formSubmit)}>
        <div className="md:flex mb-6">
          <label className="label md:w-1/5" htmlFor="title">
            Name
          </label>
          <div className="md:w-4/5">
            <input
              type="text"
              id="title"
              {...register('title', { required: 'Title is required' })}
              className="input input-bordered w-full max-w-md"
            />
            {errors.title && (
              <div className="text-error">{errors.title.message}</div>
            )}
          </div>
        </div>
        <div className="md:flex mb-6">
          <label className="label md:w-1/5" htmlFor="slug">
            slug
          </label>
          <div className="md:w-4/5">
            <input
              type="text"
              id="slug"
              {...register('slug', { required: 'slug is required' })}
              className="input input-bordered w-full max-w-md"
            />
            {errors.slug && (
              <div className="text-error">{errors.slug.message}</div>
            )}
          </div>
        </div>
       
        <div className="md:flex mb-6">
          <label className="label md:w-1/5" htmlFor="image">
            Image
          </label>
          <div className="md:w-4/5">
            <input
              type="text"
              id="image"
              {...register('image')}
              className="input input-bordered w-full max-w-md"
            />
          </div>
        </div>

        <div className="md:flex mb-6">
          <label className="label md:w-1/5" htmlFor="imageFile">
            Upload Image
          </label>
          <div className="md:w-4/5">
            <input
              type="file"
              className="file-input w-full max-w-md"
              id="imageFile"
              onChange={uploadHandler}
            />
          </div>
        </div>
        <div className="md:flex mb-6">
          <label className="label md:w-1/5" htmlFor="description">
            Description
          </label>
          <div className="md:w-4/5">
            <textarea
              id="description"
              {...register('description', { required: 'Description is required' })}
              className="textarea textarea-bordered w-full max-w-md"
            ></textarea>
            {errors.description && (
              <div className="text-error">{errors.description.message}</div>
            )}
          </div>
        </div>
        <button type="submit" disabled={isUpdating} className="btn btn-primary">
          {isUpdating && <span className="loading loading-spinner"></span>}
          Update
        </button>
        <Link className="btn ml-4" href="/admin/pages">
          Cancel
        </Link>
      </form>
    </div>
  )
}