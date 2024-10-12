import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'
import { Menu } from '@/components/menu'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'

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
        <div className='flex flex-col h-screen justify-between'>
          <div>
            <Header />
            <Menu />
          </div>
          <div className='h-full'>{children}</div>
        </div>
      </body>
    </html>
  )
}
