'use server'

import { ROOT_API } from '@/common/config'
import { cookies } from 'next/headers'

export const confirmEmail = async (token: string) => {
  const cookieStore = await cookies()

  const responseConfrimMail = await fetch(`${ROOT_API}/auth/confirm/${token}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })

  const data: {
    accessToken: string
    message: string
  } = await responseConfrimMail.json()

  const accessToken = data.accessToken
  console.log(accessToken)

  cookieStore.set('accessToken', accessToken, {
    expires: 7,
  })

  return data
}
