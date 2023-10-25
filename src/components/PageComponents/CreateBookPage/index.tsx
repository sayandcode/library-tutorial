import { InformationCircleIcon } from '@heroicons/react/20/solid';
import { zodResolver } from '@hookform/resolvers/zod';
import Head from 'next/head'
import Link from 'next/link';
import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

const formSchema = z.object({
  title: z.string().min(2, {message: "Book must have at least a two-character title"}),
  description: z.string(),
  date: z.coerce.date().max(new Date(), {message: "Date cannot be in future"}),
})

type FormSchemaType = z.infer<typeof formSchema>

function CreateBookPage() {
  const {register, handleSubmit: rhfHandleSubmit, formState} = useForm<FormSchemaType>({resolver:zodResolver(formSchema)})

  const handleSubmit: SubmitHandler<FormSchemaType> = async (formData) => {
    fetch(
      '/api/book/create',
      {
        method: 'POST',
        body: JSON.stringify(formData)
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
          onSubmit={rhfHandleSubmit(handleSubmit)}
        >
          <label className="col-span-1 flex items-center">
            Title
          </label>
          <div className="col-span-2">
            <input 
              title="Book title" 
              id="book-title" 
              className="p-2 w-full"
              {...register('title', {required: true})}
            />
            <InputErrMsg msg={formState.errors.title?.message} />
          </div>
          

          <label htmlFor="book-description" className="col-span-1 flex items-center">
            Description
          </label>
          <div className="col-span-2">
            <textarea 
              id="book-description" 
              className="p-2 w-full" 
              {...register('description')}
            />
            <InputErrMsg msg={formState.errors.description?.message} />
          </div>

          <label htmlFor="book-date" className="col-span-1 flex items-center">
            Date of Publishing
          </label>
          <div className="col-span-2 col-start-2 ">
            <input 
              id="book-date" 
              type="datetime-local" 
              className="p-2 w-full" 
              {...register('date', {required: true})}
              // 
            />
            <InputErrMsg msg={formState.errors.date?.message} />
          </div>

          <button
            type="submit"
            className='bg-gray-800 hover:bg-gray-600 focus-visible:bg-gray-600 outline-white text-white font-medium py-2 rounded-lg col-start-2'
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  )
}

function InputErrMsg({msg}: {msg: string|undefined}){
  if(!msg) return null;
  return (
    <div className="px-1 py-2 text-sm text-red-500 flex items-center gap-x-1">
      <InformationCircleIcon className="h-4 w-4" />
      {msg}
    </div>
  )
}

export default CreateBookPage;
