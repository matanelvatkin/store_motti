import pagesService from '@/lib/services/pagesService'
import { Page } from '@/lib/models/PageModel'

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}) {
  const page = await pagesService.getBySlug(params.slug)
  if (!page) {
    return { title: 'Page not found' }
  }
  return {
    title: page.title,
  }
}

export default async function Pages({
  params,
}: {
  params: { slug: string }
}) {
    const page = await pagesService.getBySlug(params.slug)
  if (!page) {
    return <div>Page not found</div>
  }
  return <div>
    <h3>{page.title}</h3>
    <p>
      {page.description}
    </p>
    <img src={page.image} alt={page.title} />
  </div>
}
