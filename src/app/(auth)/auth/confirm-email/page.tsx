'use client'

import { confirmEmail } from '@/app/actions'
import { ROOT_API } from '@/common/config'
import { useEffect } from 'react'
import Cookies from 'js-cookie'
import { useSearchParams } from 'next/navigation'
import { useUser } from '@/providers/user.provider'
import { toast } from 'sonner'

export default function ConfirmEmail() {
  const searchParams = useSearchParams()
  const { refetch } = useUser()
  const token = searchParams.get('token')

  useEffect(() => {
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

      if (accessToken) {
        Cookies.set('accessToken', accessToken, {
          expires: 7,
        })
      }

      refetch()
      toast.success(data.message)

      return data
    }
    fetchData()
  }, [token])

  return <div>Підтвердження...</div>
}
