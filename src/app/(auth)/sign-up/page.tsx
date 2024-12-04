'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from '@/components/ui/card'
import { ConfirmEmailComponent } from './components/confirm-email'
import { authService } from '@/services/auth.service'
import Turnstile from 'react-turnstile'

export default function SignUpForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [submitted, setSubmitted] = useState(false)
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
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className='max-w-md mx-auto mt-10'
    >
      <Card>
        <CardHeader>
          <CardTitle className='text-2xl font-bold text-center'>
            Реєстрація
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className='space-y-4'>
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <Label htmlFor='name'>Ім'я</Label>
              <Input
                type='text'
                id='name'
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </motion.div>
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <Label htmlFor='email'>Електронна пошта</Label>
              <Input
                type='email'
                id='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </motion.div>
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <Label htmlFor='password'>Пароль</Label>
              <Input
                type='password'
                id='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </motion.div>
            <Turnstile
              sitekey='0x4AAAAAAA0d5p18pLzv8HKU'
              onVerify={(token) => {
                setCaptchaToken(token)
              }}
            />
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button type='submit' className='w-full'>
                Зареєструватися
              </Button>
            </motion.div>
          </form>
        </CardContent>
        <CardFooter>
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className='w-full text-center'
          >
            <a href='/sign-in' className='text-sm text-primary hover:underline'>
              Вже маєте акаунт? Авторизуватися
            </a>
          </motion.div>
        </CardFooter>
      </Card>
    </motion.div>
  )
}
