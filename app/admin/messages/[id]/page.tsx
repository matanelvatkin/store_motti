import AdminLayout from '@/components/admin/AdminLayout'
import Form from './Form'

export function generateMetadata({ params }: { params: { id: string } }) {
  return {
    title: `Edit Message ${params.id}`,
  }
}

export default function MessageEditPage({
  params,
}: {
  params: { id: string }
}) {
  return (
    <AdminLayout activeItem="categories">
      <Form messageId={params.id} />
    </AdminLayout>
  )
}
