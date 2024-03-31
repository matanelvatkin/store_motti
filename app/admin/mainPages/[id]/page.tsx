import AdminLayout from '@/components/admin/AdminLayout'
import Form from './Form'

export function generateMetadata({ params }: { params: { id: string } }) {
  return {
    title: `Edit Page ${params.id}`,
  }
}

export default function PagesEditPage({
  params,
}: {
  params: { id: string }
}) {
  return (
    <AdminLayout activeItem="pages">
      <Form pageId={params.id} />
    </AdminLayout>
  )
}
