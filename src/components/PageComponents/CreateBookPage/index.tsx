import Head from 'next/head'
import Link from 'next/link';
import React, { useState } from 'react'

function CreateBookPage() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('')
  const [publishDate, setPublishDate] = useState('');

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const bookData = { title, description, publishDate };
    fetch(
      '/api/book/create',
      {
        method: 'POST',
        body: JSON.stringify(bookData)
      }
    )
  }
  return (
    <div>
      <Head>
        <title>Add a book</title>
      </Head>
      <div className='flex flex-col items-center mt-8'>
        <Link href='/' className="fixed top-4 left-4 underline"> {'< Back to Home '}</Link>
        <h1 className="text-4xl font-bold mb-4">Add a book</h1>
        <form
          className='p-8 bg-gray-200 rounded-lg grid grid-cols-3 gap-y-4'
          onSubmit={handleSubmit}
        >
          <label className="col-span-1 flex items-center">
            Title
          </label>
          <input 
            title="Book title" 
            id="book-title" 
            className="p-2 col-span-2" 
            value={title} 
            onChange={(e)=>setTitle(e.target.value)} 
          />

          <label htmlFor="book-description" className="col-span-1 flex items-center">
            Description
          </label>
          <textarea 
            id="book-description" 
            className="p-2 col-span-2" 
            value={description} 
            onChange={(e)=>setDescription(e.target.value)} 
          />

          <label htmlFor="book-date" className="col-span-1 flex items-center">
            Date of Publishing
          </label>
          <input 
            id="book-date" 
            type="date" 
            className="col-span-1 col-start-3 p-2" 
            value={publishDate}
            onChange={e=>setPublishDate(e.target.value)}
          />

          <button
            type="submit"
            className='bg-gray-800 hover:bg-gray-600 focus-visible:bg-gray-600 outline-white text-white font-medium py-2 rounded-lg col-start-2'
          >Submit</button>
        </form>
      </div>
    </div>
  )
}

export default CreateBookPage;
