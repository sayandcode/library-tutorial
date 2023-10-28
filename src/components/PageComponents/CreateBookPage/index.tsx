import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { InformationCircleIcon } from '@heroicons/react/20/solid';
import { zodResolver } from '@hookform/resolvers/zod';
import Head from 'next/head'
import Link from 'next/link';
import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

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
      <div className=''>
        <Link href='/' className="m-2 block underline"> {'< Back to Home '}</Link>
        <Card className="max-w-md w-9/12 mx-auto">
          <CardHeader>
            <CardTitle>Add a book</CardTitle>
            <CardDescription>Fill in the details for your new book</CardDescription>
          </CardHeader>
          <CardContent>
            <form
              className="flex flex-col gap-3"
              onSubmit={rhfHandleSubmit(handleSubmit)}
            >
              <div>
                <Label htmlFor="book-title">
                  Title
                </Label>
                <div >
                  <Input 
                    title="Book title" 
                    id="book-title" 
                    {...register('title', {required: true})}
                  />
                  <InputErrMsg msg={formState.errors.title?.message} />
                </div>
              </div>
              

              <div>
                <Label htmlFor="book-description" >
                  Description
                </Label>
                <div >
                  <Textarea
                    id="book-description" 
                    {...register('description')}
                  />
                  <InputErrMsg msg={formState.errors.description?.message} />
                </div>
              </div>

              <div>
                <Label htmlFor="book-date" >
                  Date of Publishing
                </Label>
                <div >
                  <Input 
                    id="book-date" 
                    type="datetime-local" 
                    {...register('date', {required: true})}
                  />
                  <InputErrMsg msg={formState.errors.date?.message} />
                </div>
              </div>

              <Button type="submit" className='w-min self-center'> Submit </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function InputErrMsg({msg}: {msg: string|undefined}){
  if(!msg) return null;
  return (
    <p className="p-1 text-sm text-red-500 flex items-center gap-x-1">
      <InformationCircleIcon className="h-4 w-4" />
      {msg}
    </p>
  )
}

export default CreateBookPage;
