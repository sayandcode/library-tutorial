import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { zodResolver } from '@hookform/resolvers/zod';
import Head from 'next/head'
import Link from 'next/link';
import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { cn } from '@/lib/utils'
import { CalendarIcon } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';

const formSchema = z.object({
  title: z.string().min(2, {message: "Book must have at least a two-character title"}),
  description: z.string().optional(),
  publishDate: z.date().max(new Date(), {message: "Date cannot be in future"}),
})

type FormSchemaType = z.infer<typeof formSchema>

const defaultFormValues: Partial<FormSchemaType> = {
  title: '',
  description: '',
}

function CreateBookPage() {
  const rhfForm = useForm<FormSchemaType>({
    resolver:zodResolver(formSchema), 
    defaultValues: defaultFormValues
  })

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
            <Form {...rhfForm}>
              <form
                className="flex flex-col gap-3"
                onSubmit={rhfForm.handleSubmit(handleSubmit)}
              >
                <FormField
                  control={rhfForm.control}
                  name="title"
                  render={({field, fieldState})=>(
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      {fieldState.error ? (
                        <FormMessage />
                      ): (
                        <FormDescription>This is the name of your book</FormDescription>
                      )}
                    </FormItem>
                  )}
                />

                <FormField
                  control={rhfForm.control}
                  name="description"
                  render={({field, fieldState})=>(
                    <FormItem>
                      <FormLabel>Description (optional)</FormLabel>
                      <FormControl>
                        <Textarea {...field} />
                      </FormControl>
                      {fieldState.error ? (
                        <FormMessage />
                      ): (
                        <FormDescription>More info about this book</FormDescription>
                      )}
                    </FormItem>
                  )}
                />

                <FormField
                  control={rhfForm.control}
                  name="publishDate"
                  render={({field, fieldState})=>(
                    <FormItem>
                      <FormLabel>Publish Date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button 
                              variant="outline" 
                              className={
                                cn("w-full flex", !field.value && "text-gray-400")
                              }
                            >
                              <div className="mr-auto">
                                {field.value?.toLocaleDateString() || 'dd/MM/YYYY'}
                              </div>
                              <CalendarIcon className="h-4 w-4"/>
                            </Button>
                          </FormControl>
                        </PopoverTrigger >
                        <PopoverContent className="w-fit">
                          <Calendar 
                            mode="single" 
                            selected={field.value} 
                            onSelect={field.onChange} 
                            disabled={date=> date > new Date()} 
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      {fieldState.error ? (
                        <FormMessage />
                      ): (
                        <FormDescription>When this book was published</FormDescription>
                      )}
                    </FormItem>
                  )}
                />

                <Button type="submit" className='w-min self-center'> Submit </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default CreateBookPage;
