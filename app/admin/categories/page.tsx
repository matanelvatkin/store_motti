import AdminLayout from '@/components/admin/AdminLayout'
import Categories from './Category'

export const metadata = {
  title: 'Admin Category',
}
const AdminCategoryPage = () => {
  return (
    <AdminLayout activeItem="Category">
      <Categories />
    </AdminLayout>
  )
}

export default AdminCategoryPage
