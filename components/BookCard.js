import Link from 'next/link'

export default function BookCard({ book, author, editor }) {
  return (
    <figure>


      <Link href={ '/book/' + book.id }>
        <a>
          <img
            src={ book.fields.Cover[0].thumbnails.large.url }
            alt={ book.fields.Cover[0].filename }
            className='aspect-cover object-cover border border-gray-light rounded-xl'
          />
        </a>
      </Link>
      

      <figcaption className='pt-3 space-y-1 text-green-dark'>
        <h3 className='text-lg tracking-tight leading-tight'>
          { book.fields.Titre.length > 39 ? `${ book.fields.Titre.substring(0, 36) }...` : book.fields.Titre }
        </h3>
        { author ? <h4 className='text-gray-dark text-sm'>{ author.fields.Name }</h4> : '' }
        { editor ? <h5 className='flex items-center space-x-1 text-green text-xs'>
          <span>
            <svg xmlns='http://www.w3.org/2000/svg' className='h-4 w-4' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253' />
            </svg>
          </span>
          <span>{ editor.fields.Name }</span>
        </h5> : '' }
      </figcaption>


    </figure>
  )
}
