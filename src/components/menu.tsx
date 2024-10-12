import Link from 'next/link'

export function Menu() {
  return (
    <nav className='bg-gray-100 p-4'>
      <ul className='flex space-x-4'>
        <li>
          <Link href='/' className='text-blue-500 hover:underline'>
            Головна
          </Link>
        </li>
        <li>
          <Link href='/posts' className='text-blue-500 hover:underline'>
            Пости
          </Link>
        </li>
      </ul>
    </nav>
  )
}
