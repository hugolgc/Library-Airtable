import { database } from '../services/airtable'
import Head from 'next/head'
import Link from 'next/link'
import BookCard from '../components/BookCard'
import { useState } from 'react'

export async function getStaticProps() {
  const JSONBooks = JSON.stringify(await database('Books').select().all())
  const JSONAuthors = JSON.stringify(await database('Authors').select().all())
  const JSONEditors = JSON.stringify(await database('Editors').select().all())
  
  return {
    props: { JSONBooks, JSONAuthors, JSONEditors }
  }
}

export default function Home({ JSONBooks, JSONAuthors, JSONEditors }) {
  let step = 15
  let categories = []
  const books = JSON.parse(JSONBooks)
  const authors = JSON.parse(JSONAuthors)
  const editors = JSON.parse(JSONEditors)
  
  const [page, setPage] = useState(0)
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState(0)

  function initCategories() {
    categories.push('Nos Livres')
    books.forEach(book => {
      book.fields.Topic.forEach(topic => {
        if (!categories.includes(topic)) categories.push(topic)
      })
    })
  }

  function getBooks() {
    return books.filter(book => {
      if (category == 0) return book.fields.Titre.toLowerCase().includes(search.toLowerCase())
      return book.fields.Titre.toLowerCase().includes(search.toLowerCase())
      && book.fields.Topic.includes(categories[category])
    })
  }

  function getAuthor(id) {
    return authors.find(author => author.id == id) || null
  }

  function getEditor(id) {
    return editors.find(editor => editor.id == id) || null
  }

  function getPagination() {
    let items = []
    for (
      let index = 0;
      index < (Math.floor(getBooks().length / step) + (getBooks().length % step ? 1 : 0));
      index++
    ) { items.push(
      <li
        key={ index }
        onClick={ () => setPage(index) }
        className={`
          h-11 w-11 flex justify-center items-center rounded-full cursor-pointer
          ${
            index == page
            ? 'bg-green-light text-green'
            : 'duration-150 hover:bg-gray-light/25'
          }`
        }>{ index + 1 }</li>
      )
    }
    return items
  }

  initCategories()

  return (
    <>
      <Head>
        <title>BookBox | Créé par Di Rosso - Thirion - Lagache</title>
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
              onChange={ ({ target }) => {
                setPage(0)
                setSearch(target.value)
              }}
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


      <div className='max-w-base mx-auto px-4 flex'>
        <aside className='w-36 flex-none mr-18'>
          <h2 className='sr-only'>Liste des catégories</h2>
          <ul className='space-y-8'>
            
            { categories.map((name, index) => <li key={ index }>
              <p
                onClick={ () => setCategory(index) }
                className={`
                h-16 px-4 flex justify-center items-center rounded-2xl text-center cursor-pointer duration-150
                ${
                  index == category
                  ? 'bg-green-light text-green'
                  : 'text-gray-dark hover:bg-gray-light/25'
                }
              `}>{ name }</p>
            </li> )}

          </ul>
        </aside>
        <main className='flex-auto'>
          <h2 className='sr-only'>Liste des livres</h2>
          <form method='post'></form>
          <ul className='grid grid-cols-5 gap-8.5'>

          { getBooks().slice(page * step, (page + 1) * step).map(
            book => book.fields.Cover ? <li key={ book.id }>
              <BookCard
                book={ book }
                author={ getAuthor(book.fields['Auteur(s)'] ? book.fields['Auteur(s)'][0] : null) }
                editor={ getEditor(book.fields.Editeur) }
              />
            </li> : ''
          )}

          </ul>

          { getBooks().length > step ?
            <ul className='mt-10 flex justify-center items-center space-x-1 text-green-dark'>
              { getPagination() }
            </ul> : ''
          }

        </main>
      </div>


      <footer></footer>
    </>
  )
}
