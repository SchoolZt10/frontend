import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'
import { Menu } from '@/components/header/menu'
import { Header } from '@/components/header/header'
import { Footer } from '@/components/footer'
import ReactQueryProvider from '@/providers/react-query'
import { UserProvider } from '@/providers/user.provider'
import { Toaster } from "@/components/ui/sonner"

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
})
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
})

export const metadata: Metadata = {
  title: 'Шкільний сайт ЗОШ №10',
  description: 'Офіційний сайт Житомирської загальноосвітньої школи №10',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ReactQueryProvider>
          <UserProvider>
            <div className='flex flex-col h-screen justify-between'>
              <div>
                <Header />
                <Menu />
              </div>
              <div className='h-full'>{children}</div>
              <Toaster />
            </div>
          </UserProvider>
        </ReactQueryProvider>
      </body>
    </html>
  )
}
