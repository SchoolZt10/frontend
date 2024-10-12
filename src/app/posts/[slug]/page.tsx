import { ROOT_API } from '@/common/config'
import BlogPost from './page.page'

interface PostPageProps {
  params: {
    slug: string
  }
}

export default async function PostPage({ params: { slug } }: PostPageProps) {
  const post = await fetch(`${ROOT_API}/posts/slug/${slug}`).then((res) =>
    res.json()
  )
  if (!post) {
    return {
      notFound: true,
    }
  }

  const categories = await fetch(`${ROOT_API}/posts/categories`, {
    next: { revalidate: 300 },
  }).then((res) => res.json())

  const otherPosts = await fetch(`${ROOT_API}/posts`, {
    next: { revalidate: 30 },
  }).then((res) => res.json())

  return (
    <BlogPost post={post} categories={categories} otherPosts={otherPosts} />
  )
}
