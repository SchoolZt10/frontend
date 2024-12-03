// components/AuthBtn.tsx
'use client'
import React from 'react'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu'
import { Skeleton } from '@/components/ui/skeleton'
import Link from 'next/link'
import { LogOut, Settings } from 'lucide-react'
import { useUser } from '@/providers/user.provider'

export function UserProfile() {
  const { user, loading, logout } = useUser()

  const handleSignOut = logout

  if (loading) {
    return <Skeleton className='w-[100px] h-9 rounded-xl' />
  }

  console.log(user)

  if (!!user) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant='ghost'
            className='flex items-center justify-between px-2 py-2'
          >
            <div className='flex items-center space-x-3'>
              <Avatar className='h-8 w-8 bg-slate-400'>
                {/* <AvatarImage src={user.avatar} /> */}
                <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className='text-left flex flex-col'>
                <p className='text-base leading-none'>{user.name}</p>
                <p className='text-[0.8rem] text-neutral-400 '>{user.email}</p>
              </div>
            </div>
            <svg
              className='h-5 w-5 text-gray-500 dark:text-gray-400 ml-2'
              xmlns='http://www.w3.org/2000/svg'
              width='24'
              height='24'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
            >
              <path d='m6 9 6 6 6-6' />
            </svg>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className='w-48 p-2 space-y-1'>
          <Link href='/settings'>
            <DropdownMenuItem>
              <Settings width={24} height={24} className='mr-2 h-4 w-4' />
              Налаштування
            </DropdownMenuItem>
          </Link>

          <DropdownMenuItem onClick={handleSignOut}>
            <LogOut width={24} height={24} className='mr-2 h-4 w-4' />
            Вийти
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }

  return (
    <Button variant='ghost'>
      <Link
        prefetch={true}
        href='/sign-in'
        className='text-blue-500 hover:underline'
      >
        Увійти
      </Link>
    </Button>
  )
}
