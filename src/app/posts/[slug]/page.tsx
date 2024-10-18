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

  return <BlogPost post={post} />
}
