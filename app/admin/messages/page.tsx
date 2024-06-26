import AdminLayout from '@/components/admin/AdminLayout'
import Messages from './Message'

export const metadata = {
  title: 'Admin Message',
}
const AdminCategoryPage = () => {
  return (
    <AdminLayout activeItem="messages">
      <Messages />
    </AdminLayout>
  )
}

export default AdminCategoryPage
