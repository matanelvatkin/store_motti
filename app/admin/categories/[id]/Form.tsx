'use client'
import useSWRMutation from 'swr/mutation'
import useSWR,{mutate} from 'swr'
import toast from 'react-hot-toast'
import Link from 'next/link'
import { useForm, Controller } from 'react-hook-form'
import { useEffect, } from 'react'
import { Category } from '@/lib/models/CategoryModel'
import { formatId } from '@/lib/utils'
import { useRouter } from 'next/navigation'

export default function CategoryEditForm({ categoryId }: { categoryId: string }) {
 
  const { data: category, error } = useSWR(`/api/admin/categories/${categoryId}`)

  const router = useRouter()
  const { trigger: updateCategory, isMutating: isUpdating } = useSWRMutation(
    `/api/admin/categories/${categoryId}`,
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

      toast.success('Category updated successfully')
      router.push('/admin/categories')
      mutate('/api/products/categories');
    }
  )

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<Category>()

  useEffect(() => {
    if (!category) return
    setValue('name', category.name)
    setValue('image', category.image)
    setValue('icon', category.icon)
    setValue('iconSvg', category.iconSvg)
    setValue('description', category.description)
    setValue('slug', category.slug||'')
    setValue('code', category.code||'')
    setValue('inMainNav', category.inMainNav)
  }, [category, setValue])

  const formSubmit = async (formData: any) => {
    await updateCategory(formData)
  }

  if (error) return error.message
  if (!category) return 'Loading...'

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
      <h1 className="text-2xl py-4">Edit Category {formatId(categoryId)}</h1>
      <form onSubmit={handleSubmit(formSubmit)}>
        <div className="md:flex mb-6">
          <label className="label md:w-1/5" htmlFor="name">
            Name
          </label>
          <div className="md:w-4/5">
            <input
              type="text"
              id="name"
              {...register('name', { required: 'Name is required' })}
              className="input input-bordered w-full max-w-md"
            />
            {errors.name && (
              <div className="text-error">{errors.name.message}</div>
            )}
          </div>
        </div>
        <div className="md:flex mb-6">
          <label className="label md:w-1/5" htmlFor="name">
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
          <label className="label md:w-1/5" htmlFor="name">
            code
          </label>
          <div className="md:w-4/5">
            <input
              type="text"
              id="code"
              {...register('code', { required: 'code is required' })}
              className="input input-bordered w-full max-w-md"
            />
            {errors.code && (
              <div className="text-error">{errors.code.message}</div>
            )}
          </div>
        </div>
        <div className="md:flex mb-6">
          <label className="label md:w-1/5" htmlFor="name">
            inMainNav
          </label>
          <div className="md:w-4/5">
            <input
              type="checkbox"
              id="inMainNav"
              {...register('inMainNav')}
              className="checkbox max-w-md"
              defaultChecked={category.inMainNav}
            />
            {errors.inMainNav && (
              <div className="text-error">{errors.inMainNav.message}</div>
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
          <label className="label md:w-1/5" htmlFor="icon">
            Icon
          </label>
          <div className="md:w-4/5">
            <input
              type="text"
              id="icon"
              {...register('icon')}
              className="input input-bordered w-full max-w-md"
            />
          </div>
        </div>

        <div className="md:flex mb-6">
          <label className="label md:w-1/5" htmlFor="iconSvg">
            Icon SVG
          </label>
          <div className="md:w-4/5">
            <input
              type="text"
              id="iconSvg"
              {...register('iconSvg')}
              className="input input-bordered w-full max-w-md"
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
        <Link className="btn ml-4" href="/admin/categories">
          Cancel
        </Link>
      </form>
    </div>
  )
}