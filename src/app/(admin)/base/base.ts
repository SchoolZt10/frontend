import { z } from "zod";

const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB

const ACCEPTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
]

export const formSchema = z.object({
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