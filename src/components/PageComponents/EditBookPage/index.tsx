import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { zodResolver } from '@hookform/resolvers/zod';
import Head from 'next/head'
import Link from 'next/link';
import React from 'react'
import { SubmitHandler, UseFormSetError, useForm } from 'react-hook-form';
import { z } from 'zod';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { cn, getIsJsonObj, tryItAsync } from '@/lib/utils'
import { CalendarIcon, Loader } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import axios from 'axios';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useToast } from '@/components/ui/use-toast';
import { BookTableItem } from '@/db/tables/book/schema';
import { format } from 'date-fns';

const formSchema = z.object({
  title: z.string().min(2, { message: "Book must have at least a two-character title" }),
  description: z.string().optional(),
  publishDate: z.date().max(new Date(), { message: "Date cannot be in future" }),
})

type FormSchemaType = z.infer<typeof formSchema>

function EditBookPage({ bookData }: { bookData: BookTableItem }) {
  const { toast } = useToast();

  const defaultFormValues: Partial<FormSchemaType> = {
    title: bookData.title,
    description: bookData.description ?? '',
    publishDate: new Date(bookData.publishDate),
  }

  const rhfForm = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultFormValues
  })

  const handleSubmit: SubmitHandler<FormSchemaType> = async (formData) => {
    const DEFAULT_ERROR_MESSAGE = "Something went wrong when submitting the form. Please try again later";
    const res = await tryItAsync(() => axios.put<{ msg: string }>(`/api/book/${bookData.id}`, formData))
    if (!res.success) {
      // random error, not axios
      if (!axios.isAxiosError(res.err)) {
        rhfForm.setError('root', { message: DEFAULT_ERROR_MESSAGE })
        return;
      }

      // non stringified error
      const serverResponse = res.err.response?.data.msg;
      if (typeof serverResponse !== 'string') {
        rhfForm.setError('root', { message: DEFAULT_ERROR_MESSAGE })
        return;
      }

      // general string error message
      if (!getIsJsonObj(serverResponse)) {
        rhfForm.setError('root', { message: serverResponse })
        return;
      }

      // non form-related errors
      const parsedServerResponse = JSON.parse(serverResponse);
      if (!Array.isArray(parsedServerResponse)) {
        rhfForm.setError('root', { message: DEFAULT_ERROR_MESSAGE })
        return;
      }

      // form-related errors
      parsedServerResponse.forEach((issue: z.ZodIssue) => {
        const fieldName = mapServerFormFieldToClientFormField(issue.path[1]);
        const message = issue.message;
        rhfForm.setError(fieldName, { message })
      })
      return;
    }

    toast({ title: "Success", description: res.data.data.msg, className: "bg-green-100 text-green-600" });
  }

  const rootErrMsg = rhfForm.formState.errors.root?.message;
  const isSubmitting = rhfForm.formState.isSubmitting;

  return (
    <div>
      <Head>
        <title>Edit book</title>
      </Head>
      <div>
        <Link href='/' className="m-2 block underline"> {'< Back to Home '}</Link>
        <Card className="max-w-md w-9/12 mx-auto">
          <CardHeader>
            <CardTitle>Edit book</CardTitle>
            <CardDescription>Modify the details for this book</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...rhfForm}>
              <form
                onSubmit={rhfForm.handleSubmit(handleSubmit)}
              >
                <fieldset disabled={isSubmitting} className="flex flex-col gap-3">
                  <FormField
                    control={rhfForm.control}
                    name="title"
                    render={({ field, fieldState }) => (
                      <FormItem>
                        <FormLabel>Title</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        {fieldState.error ? (
                          <FormMessage />
                        ) : (
                          <FormDescription>This is the name of the book</FormDescription>
                        )}
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={rhfForm.control}
                    name="description"
                    render={({ field, fieldState }) => (
                      <FormItem>
                        <FormLabel>Description (optional)</FormLabel>
                        <FormControl>
                          <Textarea {...field} />
                        </FormControl>
                        {fieldState.error ? (
                          <FormMessage />
                        ) : (
                          <FormDescription>More info about this book</FormDescription>
                        )}
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={rhfForm.control}
                    name="publishDate"
                    render={({ field, fieldState }) => {
                      const dateFormatStr = 'dd/MM/yyyy';
                      const formattedDate = field.value ? format(new Date(field.value), dateFormatStr) : dateFormatStr;

                      return (
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
                                    {formattedDate}
                                  </div>
                                  <CalendarIcon className="h-4 w-4" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger >
                            <PopoverContent className="w-fit">
                              <Calendar
                                mode="single"
                                selected={field.value}
                                onSelect={field.onChange}
                                disabled={date => date > new Date()}
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                          {fieldState.error ? (
                            <FormMessage />
                          ) : (
                            <FormDescription>When this book was published</FormDescription>
                          )}
                        </FormItem>
                      )
                    }}
                  />

                  {rootErrMsg ? (
                    <Alert className="text-red-500 bg-red-100">
                      <AlertDescription className="leading-normal">{rootErrMsg}</AlertDescription>
                    </Alert>
                  ) : null}
                  <Button type="submit" className='w-min self-center' disabled={isSubmitting}>
                    {isSubmitting ? (
                      <Loader className="animate-spin mr-2 h-4 w-4" />
                    ) : null}
                    Update
                  </Button>
                </fieldset>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function mapServerFormFieldToClientFormField(serverFieldname: any): Parameters<UseFormSetError<FormSchemaType>>[0] {
  switch (serverFieldname) {
    case 'title': return 'title';
    case 'description': return 'description';
    case 'publishDate': return 'publishDate';
    default: return 'root'
  }
}

export default EditBookPage;
