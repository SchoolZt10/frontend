'use client'

import { confirmEmail } from '@/app/actions'
import { ROOT_API } from '@/common/config'
import { useEffect } from 'react'
import Cookies from 'js-cookie'

export default function ConfirmEmail({
  searchParams,
}: {
  searchParams: {
    token: string
  }
}) {
  useEffect(() => {
    const token = searchParams.token

    if (!token) return

    const fetchData = async () => {
      const responseConfrimMail = await fetch(
        `${ROOT_API}/auth/confirm/${token}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )

      const data: {
        accessToken: string
        message: string
      } = await responseConfrimMail.json()

      const accessToken = data.accessToken
      console.log(accessToken)

      Cookies.set('accessToken', accessToken, {
        expires: 7,
      })

      return data
    }
    fetchData()
  }, [searchParams.token])

  return <div>Підтвердження...</div>
}
