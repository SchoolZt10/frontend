import { ROOT_API } from "@/common/config";
import { useQuery } from "@tanstack/react-query";

class PostsService {
  async createPost(formData: FormData): Promise<IPost> {
    const response = await fetch(`${ROOT_API}/posts`, {
      method: 'POST',
      body: formData,
    })

    return await response.json()
  }

  useQueryPosts() {
    return useQuery({
      queryKey: ['posts'],
      queryFn: async (): Promise<IPost[]> => {
        const response = await fetch(`${ROOT_API}/posts`)
        return response.json()
      },
      initialData: [],
    })
  }

  useQueryPost(slug: string) {
    return useQuery({
      queryKey: ['post', slug],
      queryFn: async (): Promise<IPost> => {
        const response = await fetch(`${ROOT_API}/posts/slug/${slug}`)
        return response.json()
      },
    })
  }

  useQueryCategories() {
    return useQuery({
      queryKey: ['categories'],
      queryFn: async (): Promise<ICategory[]> => {
        const response = await fetch(`${ROOT_API}/posts/categories`)
        return response.json()
      },
      initialData: [],
    })
  }

  useQueryComments(postId: string) {
    return useQuery({
      queryKey: ['comments', postId],
      queryFn: async (): Promise<IComment[]> => {
        const response = await fetch(`${ROOT_API}/comments/${postId}`)
        return response.json()
      },
      initialData: [],
    })
  }
}

export const postsService = new PostsService();