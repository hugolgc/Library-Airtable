import { database } from '../services/airtable'
import Head from 'next/head'
import Link from 'next/link'
import BookCard from '../components/BookCard'
import { useState } from 'react'

export async function getStaticProps() {
  const JSONBooks = JSON.stringify(await database('Books').select().all())

  return {
    props: {
      JSONBooks
    }
  }
}

export default function Home({ JSONBooks }) {
  const step = 25
  const books = JSON.parse(JSONBooks)
  const [max, setMax] = useState(step)
  const [search, setSearch] = useState('')

  const getBooks = () => books.filter(
    book => book.fields.Titre.toLowerCase().includes(search.toLowerCase())
  ).slice(0, max)
  
  console.log(books)

  return (
    <>
      <Head>
        <title>BookBox | Créé par Di Rosso - Thirion - Lagache</title>
        <meta name='description' content='Magasin de livre BookBox créé par Luca Di Rosso, Lucas Thirion & Hugo Lagache.' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <header className='py-6 border-b border-green-light'>
        <h1 className='sr-only'>BookBox | Créé par Di Rosso - Thirion - Lagache</h1>
        <nav className='max-w-screen-xl mx-auto px-4 flex justify-between items-center'>
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
          <label className='relative block'>
            <span className='sr-only'>Chercher un livre par auteur ou par titre</span>
            <span className='absolute inset-y-0 left-0 flex items-center pl-5 text-black/30'>
              <svg xmlns='http://www.w3.org/2000/svg' className='h-5 w-5' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z' />
              </svg>
            </span>
            <input
              type='text'
              maxLength='40'
              placeholder='Chercher par Titre ou Auteur'
              className='w-96 pl-12 pr-6 py-2 border border-gray-light rounded-full placeholder:text-black/30'
            />
          </label>
          <a
            href='https://github.com/hugolgc'
            target='_blank'
            rel='noreferrer'
            className='px-4 py-2 space-x-3 flex items-center bg-green rounded-full text-white'
          >
            <span>
              <svg xmlns='http://www.w3.org/2000/svg' className='h-5 w-5' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1' />
              </svg>
            </span>
            <span>Github</span>
          </a>
        </nav>
      </header>
      <div className='max-w-screen-xl mx-auto px-4 py-8 space-x-16 flex'>
        <aside className='w-36 flex-none text-black/50 text-center'>
          <ul className='space-y-4'>
            <li>
              <Link href='/'>
                <a className='block p-4 bg-green-light rounded-2xl text-green'>Ajouts récents</a>
              </Link>
            </li>
            <li>
              <Link href='/'>
                <a className='block p-4'>Catégorie</a>
              </Link>
            </li>            
          </ul>
        </aside>
        <main className='flex-auto text-green-dark'>
          <h2 className='sr-only'>Liste des livres</h2>
          <form method='post'></form>
          <ul className='grid grid-cols-5 gap-8'>
            
          { getBooks().map(book => <li key={ book.id }><BookCard book={ book } /></li> )}

          </ul>

          { max < books.length ?
            <div className='flex mt-16'>
              <button
                onClick={ () => setMax(max + step) }
                className='w-36 mx-auto p-4 bg-green-light rounded-2xl text-green'
              >Voir plus</button>
            </div> : '' }

        </main>
      </div>
      <footer>

      </footer>
    </>
  )
}
