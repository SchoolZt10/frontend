'use client'

import { useState, useEffect } from 'react'
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
import { ROOT_CDN } from '@/common/config'
import { postsService } from '@/services/posts.service'

export default function PostsPage() {
  const router = useRouter()
  const [currentCategory, setCurrentCategory] = useState('all')
  const searchParams = useSearchParams()

  const { data: posts } = postsService.useQueryPosts()

  const { data: categories } = postsService.useQueryCategories()

  useEffect(() => {
    setCurrentCategory(searchParams.get('category') || 'all')
  }, [searchParams])

  const handleCategoryChange = (value: string) => {
    router.push(`/posts${value !== 'all' ? `?category=${value}` : ''}`)
  }

  const filteredPosts =
    currentCategory === 'all'
      ? posts
      : posts.filter((post) => post.categoryId === currentCategory)

  if (!posts || !categories) {
    return (
      <div className='container mx-auto px-4 py-8'>
        <h1 className='text-3xl font-bold mb-6'>Пости</h1>
        <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
          {[...Array(6)].map((_, index) => (
            <Card key={index}>
              <CardHeader>
                <Skeleton className='h-[20px] w-[200px]' />
              </CardHeader>
              <CardContent>
                <Skeleton className='h-[250px]' />
                <Skeleton className='h-[20px] w-[150px]' />
                <Skeleton className='h-[20px] w-[100px]' />
                <Skeleton className='h-[40px]' />
              </CardContent>
              <CardFooter>
                <Skeleton className='h-[20px] w-[100px]' />
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    )
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

      <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
        {filteredPosts.map((post) => (
          <Card key={post.id}>
            <CardHeader>
              <CardTitle>{post.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className='relative h-[250px] w-full mb-4'>
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

      {filteredPosts.length === 0 && (
        <p className='text-center text-muted-foreground'>
          Немає постів для відображення.
        </p>
      )}
    </div>
  )
}
