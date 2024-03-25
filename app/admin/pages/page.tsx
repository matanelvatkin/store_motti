import AdminLayout from '@/components/admin/AdminLayout'
import Pages from './Pages'

export const metadata = {
  title: 'Admin Pages',
}
const AdminCategoryPage = () => {
  return (
    <AdminLayout activeItem="pages">
      <Pages />
    </AdminLayout>
  )
}

export default AdminCategoryPage
