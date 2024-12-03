import { ROOT_API } from "@/common/config";
import { useQuery } from "@tanstack/react-query";
import Cookies from "js-cookie";
class PostsService {
  async createPost(formData: FormData): Promise<IPost> {
    const response = await fetch(`${ROOT_API}/posts`, {
      method: 'POST',
      body: formData,
      headers: {
        authorization: `Bearer ${Cookies.get('accessToken')}`,
      }
    })

    return await response.json()
  }

  async updatePost(id: string, formData: FormData): Promise<IPost> {
    const response = await fetch(`${ROOT_API}/posts/${id}`, {
      method: 'PATCH',
      body: formData,
      headers: {
        authorization: `Bearer ${Cookies.get('accessToken')}`,
      }
    })

    return await response.json()
  }

  async deletePost(id: string): Promise<void> {
    await fetch(`${ROOT_API}/posts/${id}`, {
      method: 'DELETE',
      headers: {
        authorization: `Bearer ${Cookies.get('accessToken')}`,
      }
    })
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