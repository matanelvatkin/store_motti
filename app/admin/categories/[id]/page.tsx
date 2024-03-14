import AdminLayout from '@/components/admin/AdminLayout'
import Form from './Form'

export function generateMetadata({ params }: { params: { id: string } }) {
  return {
    title: `Edit Category ${params.id}`,
  }
}

export default function CategoryEditPage({
  params,
}: {
  params: { id: string }
}) {
  return (
    <AdminLayout activeItem="categories">
      <Form categoryId={params.id} />
    </AdminLayout>
  )
}
