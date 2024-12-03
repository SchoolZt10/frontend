interface IPost {
  id: string
  slug: string
  title: string
  content: string
  image: string | null
  createdAt: string
  categoryId: string | null
  categoryName: string | null
  createdAtLocale: string
  userId: number
}

interface IPostCreate {
  title: string;
  content: string;
}