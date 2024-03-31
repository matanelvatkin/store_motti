import AdminLayout from '@/components/admin/AdminLayout'
import Messages from './Message'

export const metadata = {
  title: 'Admin Message',
}
const AdminCategoryPage = () => {
  return (
    <AdminLayout activeItem="Category">
      <Messages />
    </AdminLayout>
  )
}

export default AdminCategoryPage
