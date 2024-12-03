'use client'

import { useState } from 'react'
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
import { postsService } from '@/services/posts.service'
import { X } from 'lucide-react'
import Image from 'next/image'
import { formSchema } from '../base/base'
import { toast } from 'sonner'

export default function CreateNewsPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [previewImage, setPreviewImage] = useState<string | null>(null)
  const { data: categories } = postsService.useQueryCategories()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      content: '',
      categoryId: '',
      image: undefined,
    },
  })

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
      toast('Новину успішно створено')
      form.reset({
        title: '',
        content: '',
        categoryId: undefined,
        image: undefined,
      })
      setPreviewImage(null)
    } catch (error) {
      toast('Помилка', {
        description: 'Не вдалося створити новину. Спробуйте ще раз.',
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
