'use client'

import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { toast } from '@/hooks/use-toast'
import { ROOT_API } from '@/common/config'
import { postsService } from '@/services/posts.service'
import { X } from 'lucide-react'
import Image from 'next/image'

const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB

const ACCEPTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
]

const formSchema = z.object({
  title: z
    .string()
    .max(128, {
      message: 'Заголовок не може бути довшим за 128 символів',
    })
    .min(3, { message: 'Заголовок повинен містити принаймні 3 символи' }),
  content: z
    .string()
    .max(1024 * 10, {
      message: 'Зміст не може бути довшим за 10240 символів',
    })
    .min(12, { message: 'Зміст повинен містити принаймні 12 символи' }),
  categoryId: z.string({
    required_error: 'Будь ласка, виберіть категорію',
  }),
  image: z
    .any()
    .refine((files) => files?.length == 1, "Зображення є обов'язковим")
    .refine(
      (files) => files?.[0]?.size <= MAX_FILE_SIZE,
      `Максимальний розмір файлу 5MB.`
    )
    .refine(
      (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
      'Підтримуються лише формати .jpg, .jpeg, .png та .webp.'
    ),
})

type Category = {
  id: string
  name: string
}

export default function CreateNewsPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [categories, setCategories] = useState<Category[]>([])
  const [previewImage, setPreviewImage] = useState<string | null>(null)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      content: '',
      categoryId: '',
      image: undefined,
    },
  })

  useEffect(() => {
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

    fetchCategories()
  }, [])

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)
    try {
      const formData = new FormData()
      formData.append('title', values.title)
      formData.append('content', values.content)
      formData.append('categoryId', values.categoryId)
      formData.append('image', values.image[0])

      const post = await postsService.createPost(formData)
      console.log(post)
      toast({
        title: 'Новину успішно створено',
        description: 'Ваша новина була успішно опублікована.',
      })
      form.reset({
        title: '',
        content: '',
        categoryId: undefined,
        image: undefined,
      })
      setPreviewImage(null)
    } catch (error) {
      toast({
        title: 'Помилка',
        description: 'Не вдалося створити новину. Спробуйте ще раз.',
        variant: 'destructive',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreviewImage(reader.result as string)
      }
      reader.readAsDataURL(file)
    } else {
      setPreviewImage(null)
    }
  }

  return (
    <div className='container mx-auto px-4 py-8'>
      <h1 className='text-3xl font-bold mb-6'>Створити нову публікацію</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
          <FormField
            control={form.control}
            name='title'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Заголовок</FormLabel>
                <FormControl>
                  <Input placeholder='Введіть заголовок новини' {...field} />
                </FormControl>
                <FormDescription>
                  Заголовок новини (максимум 128 символів)
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='content'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Зміст</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder='Введіть зміст новини'
                    className='min-h-[200px]'
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Детальний опис новини (максимум 10240 символів)
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='categoryId'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Категорія</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder='Виберіть категорію' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormDescription>
                  Виберіть категорію для вашої новини
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='image'
            render={({ field: { onChange, value, ...rest } }) => (
              <FormItem>
                <FormLabel>Зображення</FormLabel>
                <FormControl>
                  <div className='flex items-center space-x-4'>
                    <Input
                      type='file'
                      accept='image/*'
                      onChange={(e) => {
                        handleImageChange(e)
                        onChange(e.target.files)
                      }}
                      {...rest}
                    />
                    {previewImage && (
                      <Button
                        type='button'
                        variant='outline'
                        size='icon'
                        onClick={() => {
                          setPreviewImage(null)
                          onChange(undefined)
                        }}
                      >
                        <X className='h-4 w-4' />
                      </Button>
                    )}
                  </div>
                </FormControl>
                <FormDescription>
                  Завантажте зображення для новини (максимальний розмір: 5MB)
                </FormDescription>
                <FormMessage />
                {previewImage && (
                  <Image
                    src={previewImage}
                    alt='Preview'
                    width={200}
                    height={200}
                    className='mt-2 rounded-md max-w-xs'
                  />
                )}
              </FormItem>
            )}
          />
          <Button type='submit' disabled={isSubmitting}>
            {isSubmitting ? 'Публікація...' : 'Опублікувати новину'}
          </Button>
        </form>
      </Form>
    </div>
  )
}
