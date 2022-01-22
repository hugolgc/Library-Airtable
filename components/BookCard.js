import Link from 'next/link'

export default function BookCard({ book }) {
  console.log(book)
  return (
    <figure>
      <Link href='/'>
        <a>
          <img
            src={ book.fields.Cover[0].thumbnails.large.url }
            alt={ book.fields.Cover[0].filename }
            className='w-full rounded-xl aspect-2/3 object-cover'
          />
        </a>
      </Link>
      <figcaption className='mt-2 space-y-1'>
        <h3 className='text-lg'>{ book.fields.Titre }</h3>
        <h4 className='text-xs text-black/50'>John Duckett</h4>
        <p className='flex items-center space-x-2 text-green'>
          <span>
          <svg xmlns='http://www.w3.org/2000/svg' className='h-5 w-5' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z' />
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M15 11a3 3 0 11-6 0 3 3 0 016 0z' />
          </svg>
          </span>
          <span className='text-sm'>Minsk, Belarus</span>
        </p>
        <h5 className='text-xl'>$12.00</h5>
      </figcaption>
    </figure>
  )
}
