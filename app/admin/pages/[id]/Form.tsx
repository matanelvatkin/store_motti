"use client";
import useSWRMutation from "swr/mutation";
import useSWR, { mutate } from "swr";
import toast from "react-hot-toast";
import Link from "next/link";
import { useForm, Controller } from "react-hook-form";
import { useEffect, useRef } from "react";
import { Page } from "@/lib/models/PageModel";
import { formatId } from "@/lib/utils";
import { useRouter } from "next/navigation";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export default function PagesEditForm({ pageId }: { pageId: string }) {
  const { data: page, error } = useSWR(`/api/admin/pages/${pageId}`);
  const quillRef = useRef<ReactQuill>(null);

  const router = useRouter();
  const { trigger: updatePage, isMutating: isUpdating } = useSWRMutation(
    `/api/admin/pages/${pageId}`,
    async (url, { arg }) => {
      const res = await fetch(`${url}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(arg),
      });
      const data = await res.json();
      if (!res.ok) return toast.error(data.message);

      toast.success("Page updated successfully");
      router.push("/admin/pages");
      mutate("/api/pages");
    }
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    control,
  } = useForm<Page>();

  useEffect(() => {
    if (!page) return;
    setValue("image", page.image);
    setValue("description", page.description);
    setValue("slug", page.slug || "");
    setValue("title", page.title);
  }, [page, setValue]);

  const formSubmit = async (formData: any) => {
    await updatePage(formData);
  };

  if (error) return error.message;
  if (!page) return "Loading...";

  async function uploadHandler(e: any) {
    const toastId = toast.loading("Uploading image...");
    try {
      const resSign = await fetch("/api/cloudinary-sign", {
        method: "POST",
      });
      const { signature, timestamp } = await resSign.json();
      const file = e.target.files[0];
      const formData = new FormData();
      formData.append("file", file);
      formData.append("signature", signature);
      formData.append("timestamp", timestamp);
      formData.append("api_key", process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY!);
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/upload`,
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await res.json();
      setValue("image", data.secure_url);
      toast.success("File uploaded successfully", {
        id: toastId,
      });
    } catch (err: any) {
      toast.error(err.message, {
        id: toastId,
      });
    }
  }

  const imageHandler = () => {
    const options = {
      upload: "Upload image",
      url: "Provide image URL",
    };

    toast((t) => (
      <div>
        <p>Select an option:</p>
        <button
          className="btn btn-primary mr-2"
          onClick={() => {
            toast.dismiss(t.id);
            handleImageUpload();
          }}
        >
          {options.upload}
        </button>
        <button
          className="btn btn-secondary"
          onClick={() => {
            toast.dismiss(t.id);
            handleImageURL();
          }}
        >
          {options.url}
        </button>
      </div>
    ));
  };

  const handleImageUpload = () => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    input.onchange = async () => {
      if (input.files && quillRef.current) {
        const file = input.files[0];
        const formData = new FormData();
        formData.append("file", file);
        formData.append(
          "upload_preset",
          process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!
        );

        try {
          const res = await fetch(
            `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
            {
              method: "POST",
              body: formData,
            }
          );
          const data = await res.json();
          const editor = quillRef.current.getEditor();
          const range = editor.getSelection();
          editor.insertEmbed(range ? range.index : 0, "image", data.secure_url);
        } catch (err) {
          console.error("Image upload failed", err);
          toast.error("Image upload failed");
        }
      }
    };
  };

  const handleImageURL = () => {
    toast.promise(
      new Promise((resolve) => {
        setTimeout(() => {
          const url = window.prompt('Enter the image URL');
          if (url && quillRef.current) {
            const editor = quillRef.current.getEditor();
            const range = editor.getSelection();
            editor.insertEmbed(range ? range.index : 0, 'image', url);
            resolve('Image URL inserted');
          } else {
            resolve(null);
          }
        }, 0);
      }),
      {
        loading: 'Waiting for image URL...',
        success: (message: any) => (message ? message : 'Image URL not provided'),
        error: 'Failed to insert image URL',
      }
    );
  };
  const modules = {
    toolbar: {
      container: [
        [{ header: [1, 2, false] }],
        ["bold", "italic", "underline", "strike", "blockquote"],
        [{ list: "ordered" }, { list: "bullet" }],
        ["link", "image"],
        ["clean"],
      ],
      handlers: {
        image: imageHandler,
      },
    },
  };
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
              {...register("title", { required: "Title is required" })}
              className="input input-bordered w-full max-w-md"
            />
            {errors.title && (
              <div className="text-error">{errors.title.message}</div>
            )}
          </div>
        </div>
        <div className="md:flex mb-6">
          <label className="label md:w-1/5" htmlFor="slug">
            Slug
          </label>
          <div className="md:w-4/5">
            <input
              type="text"
              id="slug"
              {...register("slug", { required: "Slug is required" })}
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
              {...register("image")}
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
            <Controller
              name="description"
              control={control}
              defaultValue=""
              rules={{ required: "Description is required" }}
              render={({ field }) => (
                <ReactQuill
                  {...field}
                  ref={quillRef}
                  modules={modules}
                  theme="snow"
                  className="w-full max-w-md"
                />
              )}
            />
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
  );
}
