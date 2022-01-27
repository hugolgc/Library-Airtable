import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'
import { database } from '../../services/airtable'

export async function getStaticPaths() {
  return {
    paths: [{ params: { id: '' } }],
    fallback: true,
  }
}

export async function getStaticProps({ params }) {
  const book = await database('Books').find(params.id)
  const JSONBook = JSON.stringify(book)
  const JSONAuthor = JSON.stringify(await database('Authors').find(book.fields['Auteur(s)'][0]))
  const JSONEditor = JSON.stringify(await database('Editors').find(book.fields['Editeur'][0]))

  return {
    props: { JSONBook, JSONAuthor, JSONEditor }
  }
}

export default function Book({ JSONBook, JSONAuthor, JSONEditor }) {
  const book = JSON.parse(JSONBook)
  const author = JSON.parse(JSONAuthor)
  const editor = JSON.parse(JSONEditor)

  const [picture, setPicture] = useState(book.fields.Cover[0].url)

  return (
    <>
      <Head>
        <title>BookBox | { book.fields.Titre } de { author.fields.Name }</title>
        <meta name='description' content='Magasin de livre BookBox créé par Luca Di Rosso, Lucas Thirion & Hugo Lagache.' />
        <link rel='icon' href='/favicon.ico' />
      </Head>


      <header className='sticky top-0 mb-8.5 py-6 bg-white border-b border-green-light'>
        <h1 className='sr-only'>BookBox | Créé par Di Rosso - Thirion - Lagache</h1>
        <nav className='max-w-base mx-auto px-4 flex items-center justify-between'>
          <Link href='/'>
            <a>
              <span className='sr-only'>Accueil</span>
              <img
                src='/logo.png'
                alt='Logo BookBox'
                className='w-40'
              />
            </a>
          </Link>
          <label className='block relative'>
            <span className='sr-only'>Chercher un livre par auteur ou par titre</span>
            <span className='absolute inset-y-0 left-0 flex items-center pl-6 text-gray-dark'>
              <svg xmlns='http://www.w3.org/2000/svg' className='h-5 w-5' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z' />
              </svg>
            </span>
            <input
              type='text'
              maxLength='64'
              placeholder='Recherche par titre ou auteur'
              className='h-11 w-search pl-14 pr-4 border border-gray-light rounded-full text-green-dark placeholder:text-gray-dark'
            />
          </label>
          <a
            href='https://github.com/hugolgc/library-airtable'
            target='_blank'
            rel='noreferrer'
            className='px-4 py-2 bg-green rounded-full text-white font-medium'
          >Github</a>
        </nav>
      </header>


      <article className='max-w-base mx-auto px-4'>
        <div className='flex space-x-8'>
          <div className='w-20 flex-none space-y-5'>

            { book.fields.Cover.map(cover =>
              <img
                key={ cover.id }
                src={ cover.url }
                alt={ cover.filename }
                className='aspect-cover object-cover border border-gray-light rounded-lg cursor-pointer'
                onClick={ () => setPicture(cover.url) }
              />
            )}

          </div>
          <div className='flex-1'>
            <img
              src={ picture }
              alt={ 'Couverture du livre ' +  book.fields.Titre }
              className='aspect-cover object-cover border border-gray-light rounded-2xl'
            />
          </div>
          <div className='flex-1 text-green-dark'>
            <div>
              <h2 className='text-green-dark text-3xl font-medium'>{ book.fields.Titre }</h2>
              <h3 className='mt-2.5 text-gray-dark text-xl'>de { author.fields.Name }</h3>
              {/* <h3 className=''>$10.00</h3> */}
              <a href={ book.fields['Où le trouver'] } target="_blank" rel="noopener noreferrer" className='block w-full max-w-xs mt-12 p-3.5 bg-green text-center text-white text-lg font-medium rounded-full'>Trouver</a>
            </div>
            <div className='mt-10 text-green'>
              <h4 className='text-green-dark text-xl font-medium'>{ book.fields.Topic.map((topic ,index) => (index != 0 ? ', ' : '') + topic) }</h4>
              <p className='mt-1 space-x-2 flex items-center'>
                <span>
                  <svg xmlns='http://www.w3.org/2000/svg' className='h-6 w-6' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253' />
                  </svg>
                </span>
                <span className='text-lg'>{ editor.fields.Name }</span>
              </p>
              <p className='my-4 space-x-0.5 flex text-yellow-400'>

                { Array.from(Array(book.fields.Note).keys()).map(index =>
                  <span key={ index }>
                    <svg xmlns='http://www.w3.org/2000/svg' className='h-6 w-6' viewBox='0 0 20 20' fill='currentColor'>
                      <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
                    </svg>
                  </span>
                )}
                
              </p>
              <p>Autres livres: { author.fields.Books.length - 1 }</p>
            </div>
          </div>
        </div>
        <div className='pb-12 w-1/2 pt-8.5 pl-28'>
          <h3 className='text-2xl font-medium'>Description</h3>
          <p className='mt-4 text-gray-dark'>{ book.fields['Personal Notes'] }</p>
          {/* <p className='mt-2 text-green'>Voir plus</p> */}
          <ul className='mt-8 space-y-4'>
            <li className='flex space-x-4'>
              <span className='text-gray-dark'>Author</span>
              <span className='h-3.5 flex-auto border-b border-gray'></span>
              <span className='text-green-dark'>{ author.fields.Name }</span>
            </li>
            <li className='flex space-x-4'>
              <span className='text-gray-dark'>Genres</span>
              <span className='h-3.5 flex-auto border-b border-gray'></span>
              <span className='text-green-dark'>{ book.fields.Topic.map((topic ,index) => (index != 0 ? ', ' : '') + topic) }</span>
            </li>
            <li className='flex space-x-4'>
              <span className='text-gray-dark'>Éditeur</span>
              <span className='h-3.5 flex-auto border-b border-gray'></span>
              <span className='text-green-dark'>{ editor.fields.Name }</span>
            </li>
            <li className='flex space-x-4'>
              <span className='text-gray-dark'>Statut</span>
              <span className='h-3.5 flex-auto border-b border-gray'></span>
              <span className='text-green-dark'>{ book.fields.Statut[0] }</span>
            </li>
            <li className='flex space-x-4'>
              <span className='text-gray-dark'>Papier</span>
              <span className='h-3.5 flex-auto border-b border-gray'></span>
              <span className='text-green-dark'>{ book.fields.Papier ? 'Oui' : 'Non' }</span>
            </li>
            <li className='flex space-x-4'>
              <span className='text-gray-dark'>Bibliovox</span>
              <span className='h-3.5 flex-auto border-b border-gray'></span>
              <span className='text-green-dark'>{ book.fields.Bibliovox ? 'Oui' : 'Non' }</span>
            </li>
          </ul>
        </div>
      </article>
    </>
  )
}