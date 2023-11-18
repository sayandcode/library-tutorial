import EditBookPage from "@/components/PageComponents/EditBookPage";
import makeDb from "@/db/setup";
import { getBooks } from "@/db/tables/book/handlers";
import { GetServerSideProps } from "next";

const Page = EditBookPage

type PageProps = React.ComponentProps<typeof EditBookPage>;

export const getServerSideProps: GetServerSideProps<PageProps> = async () => {
  const db = makeDb();
  const bookId = [2];
  const getAllBooksAction = await getBooks(db, bookId);
  if (!getAllBooksAction.success) {
    console.error(getAllBooksAction.err);
    throw new Error("Could not fetch books for homepage");
  }
  const bookData = getAllBooksAction.data[0];
  return { props: {bookData} }
}

export default Page;
