import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { BookTableItem } from "@/db/tables/book/schema";
import { PencilIcon, Trash2Icon } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@radix-ui/react-tooltip";
import { DOMAttributes, useCallback } from 'react';
import axios from "axios";
import { tryItAsync } from "@/lib/utils";
import { useRouter } from "next/router";
import { useToast } from "@/components/ui/use-toast";
import ClientErrors from "@/lib/errors/client";

function BookCard({ id, title, description, publishDate }: BookTableItem) {
  const router = useRouter();
  const {toast} = useToast();

  const handleDeleteClick = useCallback(async () => {
    const deleteReq = await tryItAsync(()=>axios.delete(`/api/book/${id}`)) ;
    if(!deleteReq.success){
      if(!axios.isAxiosError(deleteReq.err)){
        toast({
          title: `Network Error (ERR CODE: ${ClientErrors.NetworkError})`, 
          description: "Something went wrong. Please try again later",
          variant: "destructive"
        });
        return;
      }

      toast({
        title: `Request Error (ERR CODE: ${ClientErrors.ApiError})`, 
        description: "Could not delete the book. Please try again later",
        variant: "destructive"
      });
      return;
    }

    // get the new list of books
    router.reload();
  },[id])

  const formattedDate = getFormattedDate(publishDate);

  return (
    <Card className="px-4 py-3 h-full w-full group">
      <div className="flex justify-between align-center">
        <CardTitle>{title}</CardTitle>
        <div className="flex gap-x-2">
          <DeleteBtn onClick={handleDeleteClick} />
          <EditBtn />
        </div>
      </div>
      <CardDescription>{formattedDate}</CardDescription>
      {description ? (
        <CardContent className="px-2 mt-4">{description}</CardContent>
      ) : null}
    </Card>
  )
}

function EditBtn() {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="outline"
            size="icon"
          >
            <PencilIcon className="w-4 h-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent className="bg-white px-2 py-1 border-2 border-gray-300 rounded-md text-sm animate-in fade-in">
          Edit
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

function DeleteBtn({ onClick: handleClick }: { onClick: DOMAttributes<HTMLButtonElement>['onClick'] }) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            className="opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity"
            variant="destructive"
            size="icon"
            onClick={handleClick}
          >
            <Trash2Icon className="w-4 h-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent className="bg-white px-2 py-1 border-2 border-gray-300 rounded-lg text-sm animate-in fade-in">
          Delete
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

function getFormattedDate(dateStr: string) {
  const dateObj = new Date(dateStr)
  return `${dateObj.getMonth() + 1}/${dateObj.getFullYear()}`

}

export default BookCard;
