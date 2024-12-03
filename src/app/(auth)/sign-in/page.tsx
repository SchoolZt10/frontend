'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useActionState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card'
import { AlertCircle } from 'lucide-react'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { loginUser } from './actions'
import { useMutation } from '@tanstack/react-query'
import { useUser } from '@/providers/user.provider'
import { useRouter } from 'next/navigation'

export default function AuthForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const { refetch } = useUser()
  const router = useRouter()

  const { mutateAsync, isPending, isSuccess, data, context, isError } =
    useMutation({
      mutationFn: loginUser,
      onSuccess: (data) => {
        setError('')
        if (!data.accessToken) {
          setError(data.message)
          return
        }
        refetch()
        setTimeout(() => router.push('/'), 1000)
      },
    })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    mutateAsync({ email, password })
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className='flex items-center justify-center min-h-screen bg-gray-100'
    >
      <Card className='w-[350px]'>
        <CardHeader>
          <CardTitle>Вхід</CardTitle>
          <CardDescription>Увійдіть у свій обліковий запис</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className='grid w-full items-center gap-4'>
              <div className='flex flex-col space-y-1.5'>
                <Label htmlFor='email'>Email</Label>
                <Input
                  id='email'
                  name='email'
                  type='email'
                  placeholder='name@example.com'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className='flex flex-col space-y-1.5'>
                <Label htmlFor='password'>Пароль</Label>
                <Input
                  id='password'
                  name='password'
                  type='password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>
            {error && (
              <Alert variant='destructive' className='mt-4'>
                <AlertCircle className='h-4 w-4' />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            {!error && data?.message && (
              <Alert
                variant='default'
                className='mt-4 text-green-500 border-green-500 [&>svg]:text-green-500'
              >
                <AlertCircle className='h-4 w-4' />
                <AlertDescription>{data?.message}</AlertDescription>
              </Alert>
            )}
            <motion.div
              className='mt-6'
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button className='w-full' type='submit' disabled={isPending}>
                {isPending ? 'Вход...' : 'Войти'}
              </Button>
            </motion.div>
          </form>
        </CardContent>
        <CardFooter className='flex justify-center'>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button variant='link'>Створити обліковий запис</Button>
          </motion.div>
        </CardFooter>
      </Card>
    </motion.div>
  )
}
