import { CheckCircle } from 'lucide-react'

export function ConfirmEmailComponent() {
  return (
    <div className='min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 to-blue-200'>
      <div className='text-center space-y-6 p-8 bg-white rounded-lg shadow-xl max-w-md w-full'>
        <div className='animate-pulse'>
          <CheckCircle className='mx-auto h-16 w-16 text-green-500' />
        </div>
        <h1 className='text-3xl font-bold text-gray-800'>
          Підтвердьте вашу електронну пошту
        </h1>
        <p className='text-gray-600'>
          Ми надіслали лист із підтвердженням на вашу електронну пошту. Будь
          ласка, перевірте свою поштову скриньку і натисніть на посилання для
          підтвердження.
        </p>
        <div className='animate-bounce'>
          <p className='text-blue-500 font-semibold'>Перевірте свою пошту</p>
        </div>
        <p className='text-sm text-gray-500'>
          Якщо ви не отримали лист, перевірте папку «Спам»
          {/* або натисніть кнопку
          нижче, щоб надіслати лист повторно. */}
        </p>
        {/* <button className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300'>
          Надіслати лист повторно
        </button> */}
      </div>
    </div>
  )
}
