import Image from 'next/image'

export function Header() {
  return (
    <header className='w-full bg-slate-500 p-5'>
      <div className='container mx-auto flex items-center gap-3'>
        <Image
          width={64}
          height={64}
          alt='School logo'
          src='http://newztschool10.zzz.com.ua/wp-content/uploads/2024/01/cropped-354042603_633003728534184_5211272905019117999_n.jpg'
        />
        <h1 className='text-2xl font-bold'>
          Житомирська загальноосвітня школа №10
        </h1>
      </div>
    </header>
  )
}
