'use client'

import { confirmEmail } from '@/app/actions'
import { useEffect } from 'react'

export default async function ConfirmEmail({
  searchParams,
}: {
  searchParams: {
    token: string
  }
}) {
  console.log('searchParams.token')

  console.log(searchParams.token)
  useEffect(() => {
    confirmEmail(searchParams.token)
  }, [])

  return <div>Підтвердження...</div>
}
