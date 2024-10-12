'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Image from 'next/image'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { ROOT_API, ROOT_CDN } from '@/common/config'
import Link from 'next/link'

interface BlogPostProps {
  post: IPost
  categories: ICategory[]
  otherPosts: IPost[]
}

export default function BlogPost({
  post: initialPost,
  categories: initialCategories,
  otherPosts: initialOtherPosts,
}: BlogPostProps) {
  const { slug } = useParams()
  const [post, setPost] = useState<IPost>(initialPost)
  const [comments, setComments] = useState<IComment[]>([])
  const [categories, setCategories] = useState<ICategory[]>(initialCategories)
  const [otherPosts, setOtherPosts] = useState<IPost[]>()
  const [newComment, setNewComment] = useState({
    username: '',
    email: '',
    comment: '',
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        const commentsResponse = await fetch(`${ROOT_API}/comments/${post.id}`)
        const commentsData = await commentsResponse.json()
        setComments(commentsData)

        const filtredPostsData = initialOtherPosts.filter(
          (p: IPost) => p.id !== post.id
        )

        setOtherPosts(filtredPostsData.slice(0, 5))
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, [slug])

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch(`${ROOT_API}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...newComment,
          postId: post?.id,
        }),
      })
      if (response.ok) {
        const newCommentData = await response.json()
        setComments([...comments, newCommentData])
        setNewComment({ username: '', email: '', comment: '' })
      }
    } catch (error) {
      console.error('Error submitting comment:', error)
    }
  }

  return (
    <div className='container mx-auto px-4 py-8'>
      <div className='flex flex-col md:flex-row gap-8'>
        <main className='w-full md:w-2/3'>
          <Card>
            <CardHeader>
              <CardTitle>{post.title}</CardTitle>
              <p className='text-sm text-muted-foreground'>
                {post.createdAtLocale}{' '}
                {post?.categoryName && `| ${post.categoryName}`}
              </p>
            </CardHeader>
            <CardContent>
              <Image
                src={ROOT_CDN + post.image}
                alt={post.title}
                width={800}
                height={400}
                className='w-full h-auto mb-4 rounded-lg'
              />
              <div className='whitespace-pre-line'>{post.content}</div>
            </CardContent>
          </Card>

          <Separator className='my-8' />

          <h2 className='text-2xl font-bold mb-4'>
            Коментарі ({comments.length})
          </h2>
          {comments.map((comment) => (
            <Card key={comment.id} className='mb-4'>
              <CardHeader>
                <CardTitle className='text-lg'>{comment.username}</CardTitle>
                <p className='text-sm text-muted-foreground'>
                  {comment.createdAt}
                </p>
              </CardHeader>
              <CardContent>
                <p>{comment.comment}</p>
              </CardContent>
            </Card>
          ))}

          <Card className='mt-8'>
            <CardHeader>
              <CardTitle>Додати коментар</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleCommentSubmit} className='space-y-4'>
                <Input
                  placeholder="Ім'я"
                  value={newComment.username}
                  onChange={(e) =>
                    setNewComment({ ...newComment, username: e.target.value })
                  }
                  required
                />
                <Input
                  type='email'
                  placeholder='Email'
                  value={newComment.email}
                  onChange={(e) =>
                    setNewComment({ ...newComment, email: e.target.value })
                  }
                  required
                />
                <Textarea
                  placeholder='Ваш коментар'
                  value={newComment.comment}
                  onChange={(e) =>
                    setNewComment({ ...newComment, comment: e.target.value })
                  }
                  required
                />
                <Button type='submit'>Відправити коментар</Button>
              </form>
            </CardContent>
          </Card>
        </main>

        <aside className='w-full md:w-1/3 space-y-8'>
          <Card>
            <CardHeader>
              <CardTitle>Категорії</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className='space-y-2'>
                {categories.map((category) => (
                  <Link
                    key={category.id}
                    href={`/posts?category=${category.id}`}
                  >
                    <li
                      className='hover:text-blue-400 hover:underline'
                      key={category.id}
                    >
                      {category.name}
                    </li>
                  </Link>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Інші пости</CardTitle>
            </CardHeader>
            {otherPosts && (
              <CardContent>
                <ul className='space-y-2'>
                  {otherPosts.map((otherPost) => (
                    <li key={otherPost.id}>
                      <a
                        href={`/posts/${otherPost.slug}`}
                        className='hover:underline'
                      >
                        {otherPost.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </CardContent>
            )}
          </Card>
        </aside>
      </div>
    </div>
  )
}
