'use client'

import { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Image from 'next/image'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { toast } from '@/hooks/use-toast'
import { ROOT_API, ROOT_CDN } from '@/common/config'

type Category = {
  id: string
  name: string
  createdAt: string
}

export default function PostsPage() {
  const [posts, setPosts] = useState<IPost[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const [currentCategory, setCurrentCategory] = useState('all')

  useEffect(() => {
    const searchParams = useSearchParams()

    setCurrentCategory(searchParams.get('category') || 'all')

    const fetchPosts = async () => {
      try {
        const response = await fetch(`${ROOT_API}/posts`)
        if (!response.ok) {
          throw new Error('Failed to fetch posts')
        }
        const data: IPost[] = await response.json()
        setPosts(data)
      } catch (error) {
        console.error('Error fetching posts:', error)
        toast({
          title: 'Помилка',
          description:
            'Не вдалося завантажити пости. Будь ласка, спробуйте оновити сторінку.',
          variant: 'destructive',
        })
      } finally {
        setLoading(false)
      }
    }

    const fetchCategories = async () => {
      try {
        const response = await fetch(`${ROOT_API}/posts/categories`)
        if (!response.ok) {
          throw new Error('Failed to fetch categories')
        }
        const data: Category[] = await response.json()
        setCategories(data)
      } catch (error) {
        console.error('Error fetching categories:', error)
        toast({
          title: 'Помилка',
          description:
            'Не вдалося завантажити категорії. Будь ласка, спробуйте оновити сторінку.',
          variant: 'destructive',
        })
      }
    }

    fetchPosts()
    fetchCategories()
  }, [])

  const handleCategoryChange = (value: string) => {
    router.push(`/posts${value !== 'all' ? `?category=${value}` : ''}`)
  }

  const filteredPosts =
    currentCategory === 'all'
      ? posts
      : posts.filter((post) => post.categoryId === currentCategory)

  if (loading) {
    return null
  }
  return (
    <div className='container mx-auto px-4 py-8'>
      <h1 className='text-3xl font-bold mb-6'>Пости</h1>

      <div className='mb-6'>
        <Select
          onValueChange={handleCategoryChange}
          defaultValue={currentCategory}
        >
          <SelectTrigger className='w-[180px]'>
            <SelectValue placeholder='Виберіть категорію' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='all'>Всі категорії</SelectItem>
            {categories.map((category) => (
              <SelectItem key={category.id} value={category.id}>
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {loading ? (
        <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
          {[...Array(6)].map((_, index) => (
            <Card key={index}>
              <CardHeader>
                <Skeleton className='h-4 w-[250px]' />
              </CardHeader>
              <CardContent>
                <Skeleton className='h-[200px] w-full' />
                <Skeleton className='h-4 w-[200px] mt-4' />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
          {filteredPosts.map((post) => (
            <Card key={post.id}>
              <CardHeader>
                <CardTitle>{post.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className='relative h-[200px] w-full mb-4'>
                  {post.image && (
                    <Image
                      src={ROOT_CDN + post.image}
                      alt={post.title}
                      layout='fill'
                      objectFit='cover'
                      className='rounded-md'
                    />
                  )}
                </div>
                <p className='text-sm text-muted-foreground mb-2'>
                  {post.createdAtLocale} | {post.categoryName}
                </p>
                <p className='line-clamp-3'>{post.content}</p>
              </CardContent>
              <CardFooter>
                <Button
                  variant='outline'
                  onClick={() => router.push(`/posts/${post.slug}`)}
                >
                  Читати далі
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      {!loading && filteredPosts.length === 0 && (
        <p className='text-center text-muted-foreground'>
          Немає постів для відображення.
        </p>
      )}
    </div>
  )
}
