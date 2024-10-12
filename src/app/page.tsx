import { Footer } from '@/components/footer'
import { Header } from '@/components/header'
import { Menu } from '@/components/menu'
import { Card, CardContent } from '@/components/ui/card'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { MapPin, Clock, Phone, Mail } from 'lucide-react'
import Image from 'next/image'

export default function SchoolWebsite() {
  return (
    <>
      <div className='container mx-auto px-4 py-8'>
        <section className='mb-12'>
          <h2 className='text-2xl font-semibold mb-4'>Галерея</h2>
          <Carousel className='w-full max-w-xl mx-auto'>
            <CarouselContent>
              {[
                'http://newztschool10.zzz.com.ua/wp-content/uploads/2018/03/IMG_1225-768x536.jpg',
                'http://newztschool10.zzz.com.ua/wp-content/uploads/2022/10/0-02-05-e8d262988d9452b4b5850b20fa2e39c0e2c31ce45ffc35860c292584b6fe3551_291cd7cbac31b6f5-768x576.jpg',
                'http://newztschool10.zzz.com.ua/wp-content/uploads/2022/10/IMG_20210512_094103-768x737.jpg',
              ].map((src, index) => (
                <CarouselItem key={index}>
                  <Image
                    src={src}
                    width={768}
                    height={576}
                    alt={`School image ${index + 1}`}
                    className='w-full h-64 object-cover rounded-lg'
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </section>
        <div>
          <h2 className='text-2xl font-semibold mb-4'>Новини нашої школи</h2>
          <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'></div>
        </div>
        <div className='grid md:grid-cols-2 gap-8'>
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
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}
