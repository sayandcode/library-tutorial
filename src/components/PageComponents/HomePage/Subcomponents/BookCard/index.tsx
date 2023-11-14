import { Card, CardContent, CardDescription, CardFooter, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { BookTableItem } from "@/db/tables/book/schema";
import { PencilIcon, Trash2Icon } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@radix-ui/react-tooltip";

function BookCard({ id, title, description, publishDate }: BookTableItem) {
  return (
    <Card className="px-4 py-3 h-full w-full group">
      <div className="flex justify-between align-center">
        <CardTitle>{title}</CardTitle>
        <div className="flex gap-x-2">
          <DeleteBtn />
          <EditBtn />
        </div>
      </div>
      <CardDescription>{publishDate}</CardDescription>
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

function DeleteBtn() {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            className="opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity"
            variant="destructive"
            size="icon"
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

export default BookCard;
