'use client'

import { useUser } from '@/providers/user.provider'
import Link from 'next/link'
import { UserProfile } from './profile'

export function Menu() {
  const { user } = useUser()
  console.log(user)

  return (
    <nav className='bg-gray-100 p-4'>
      <div className='flex justify-between items-center'>
        <ul className='flex space-x-4'>
          <li>
            <Link href='/' className='text-blue-500 hover:underline'>
              Головна
            </Link>
          </li>
          <li>
            <Link href='/history' className='text-blue-500 hover:underline'>
              Історія Ліцею
            </Link>
          </li>
          <li>
            <Link href='/posts' className='text-blue-500 hover:underline'>
              Пости
            </Link>
          </li>
        </ul>
        <ul className='flex space-x-4'>
          <li>
            <UserProfile />
          </li>
        </ul>
      </div>
    </nav>
  )
}
