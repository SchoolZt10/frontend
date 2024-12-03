'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { authService } from '@/services/auth.service'
import { ConfirmEmailComponent } from './components/confirm-email'
import Turnstile, { useTurnstile } from 'react-turnstile'

export default function Component() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const turnstile = useTurnstile()
  const [captchaToken, setCaptchaToken] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    await authService.signUp({ name, email, password, captchaToken })
    setSubmitted(true)
  }

  if (submitted) {
    return <ConfirmEmailComponent />
  }

  return (
    <div className='mt-96 flex items-center justify-center bg-gradient-to-br'>
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className='w-full max-w-md p-8 bg-white rounded-lg shadow-2xl'
      >
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className='text-3xl font-bold text-center mb-6 text-gray-800'
        >
          Реєстрація
        </motion.h1>
        <form onSubmit={handleSubmit} className='space-y-4'>
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Label htmlFor='name' className='text-gray-700'>
              Ім'я
            </Label>
            <Input
              id='name'
              type='text'
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className='w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-600'
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Label htmlFor='email' className='text-gray-700'>
              Електронна пошта
            </Label>
            <Input
              id='email'
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className='w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-600'
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Label htmlFor='password' className='text-gray-700'>
              Пароль
            </Label>
            <Input
              id='password'
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className='w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-600'
            />
          </motion.div>
          <Turnstile
            sitekey='0x4AAAAAAA0d5p18pLzv8HKU'
            onVerify={(token) => {
              setCaptchaToken(token)
            }}
          />
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Button
              type='submit'
              className='w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold py-2 px-4 rounded hover:from-purple-700 hover:to-pink-700 transition duration-300'
            >
              Зареєструватися
            </Button>
          </motion.div>
        </form>
      </motion.div>
    </div>
  )
}
