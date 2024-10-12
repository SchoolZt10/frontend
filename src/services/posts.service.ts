import { ROOT_API } from "@/common/config";

class PostsService {
  async createPost(formData: FormData): Promise<IPost> {
    const response = await fetch(`${ROOT_API}/posts`, {
      method: 'POST',
      body: formData,
    })

    return await response.json()
  }

  async getPosts(): Promise<IPost[]> {
    return fetch(`${ROOT_API}/posts`).then((res) => res.json())
  }
}

export const postsService = new PostsService();