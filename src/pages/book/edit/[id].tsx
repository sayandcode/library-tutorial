import EditBookPage from "@/components/PageComponents/EditBookPage";
import makeDb from "@/db/setup";
import { getBooks } from "@/db/tables/book/handlers";
import { GetServerSideProps } from "next";

const Page = EditBookPage

type PageProps = React.ComponentProps<typeof EditBookPage>;

export const getServerSideProps: GetServerSideProps<PageProps, {id: string}> = async ({params}) => {
  const db = makeDb();
  const bookIdStr = params?.id;
  const isBookIdValid = bookIdStr && Number.isInteger(parseFloat(bookIdStr));
  if(!isBookIdValid) {
    return { notFound: true }
  }
  const bookId = parseFloat(bookIdStr);

  const getBooksAction = await getBooks(db, [bookId]);
  if (!getBooksAction.success) {
    console.error(getBooksAction.err);
    return { notFound: true }
  }
  const bookData = getBooksAction.data[0];
  if(!bookData) {
    return { notFound: true }
  }
  return { props: {bookData} }
}

export default Page;
