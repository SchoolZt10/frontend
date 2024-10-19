'use client'
import { ROOT_CDN } from '@/common/config'
import { Footer } from '@/components/footer'
import { Header } from '@/components/header'
import { Menu } from '@/components/menu'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { Skeleton } from '@/components/ui/skeleton'
import { postsService } from '@/services/posts.service'
import { MapPin, Clock, Phone, Mail, Facebook } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function SchoolWebsite() {
  const router = useRouter()
  const { data: posts, isLoading } = postsService.useQueryPosts()

  return (
    <>
      <div className='container mx-auto px-4 py-8'>
        <section className='mb-12'>
          <h2 className='text-2xl font-semibold mb-4'>Галерея</h2>
          <Carousel className='w-full max-w-[640px] mx-auto'>
            <CarouselContent>
              {[
                'https://cdn.shooclzt10.site/IMG_1225-768x536.webp',
                'https://cdn.shooclzt10.site/0-02-05-e8d262988d9452b4b5850b20fa2e39c0e2c31ce45ffc35860c292584b6fe3551_291cd7cbac31b6f5-768x576.webp',
                'https://cdn.shooclzt10.site/IMG_20210512_094103-768x737.webp',
              ].map((src, index) => (
                <CarouselItem key={index}>
                  <Image
                    src={src}
                    width={1280}
                    height={720}
                    alt={`School image ${index + 1}`}
                    className='w-[640px] h-[360px] object-cover rounded-lg'
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className='hidden sm:flex' />
            <CarouselNext className='hidden sm:flex' />
          </Carousel>
        </section>
        <section className='mb-4'>
          <h2 className='text-2xl font-semibold mb-4'>
            Останні новини нашої школи
          </h2>
          {isLoading && (
            <div className='container mx-auto px-4 py-8'>
              <h1 className='text-3xl font-bold mb-6'>Пости</h1>
              <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
                {[...Array(3)].map((_, index) => (
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
          )}
          <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
            {!isLoading &&
              posts?.slice(0, 3).map((post) => (
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
        </section>
        <section className='grid md:grid-cols-3 gap-8'>
          <Card>
            <CardContent className='p-6'>
              <h2 className='text-2xl font-semibold mb-4 flex items-center'>
                <MapPin className='mr-2' /> Адреса
              </h2>
              <p>Україна, м. Житомир 10007</p>
              <p>Київське шосе, 37</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className='p-6'>
              <h2 className='text-2xl font-semibold mb-4 flex items-center'>
                <Clock className='mr-2' /> Дні прийому
              </h2>
              <p>Пн - Пт: 08:00 - 17:00</p>
              <p>Середа: 9:00 - 12:00</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className='p-6'>
              <h2 className='text-2xl font-semibold mb-4 flex items-center'>
                <Phone className='mr-2' /> Контакти
              </h2>
              <p>Кабінет директора: (0412) 42-82-12</p>
              <p>Секретар: (0412) 42-80-76</p>
              <p className='flex items-center mt-2'>
                <Mail className='mr-2' /> ztschool10@gmail.com
              </p>
              <Link href={'https://www.facebook.com/lyceum10zt/'}>
                <Button className='bg-blue-500 hover:bg-blue-400 mt-3'>
                  <Facebook />
                  <span className='ml-2'>Facebook</span>
                </Button>
              </Link>
            </CardContent>
          </Card>
        </section>
      </div>
    </>
  )
}
