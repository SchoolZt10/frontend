import { ROOT_API } from "@/common/config";

class AuthService {
  async signUp({
    name,
    email,
    password,
    captchaToken
  }: {
    name: string;
    email: string;
    password: string;
    captchaToken: string
  }) {
    const response = await fetch(`${ROOT_API}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password, captchaToken }),
    });

    return await response.json();
  }
}

export const authService = new AuthService();