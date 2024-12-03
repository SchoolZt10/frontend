'use server'

import { ROOT_API } from "@/common/config"
import { cookies } from "next/headers"

export async function loginUser({
  email,
  password
}: {
  email: string
  password: string
}): Promise<{
  accessToken?: string,
  message: string
}> {
  const responseLogin = await fetch(`${ROOT_API}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  })

  const data = await responseLogin.json()

  if (data.accessToken) {
    const cookieStore = cookies()
    cookieStore.set('accessToken', data.accessToken)
  }

  return data
}