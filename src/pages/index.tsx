import HomePage from "@/components/PageComponents/HomePage";
import makeDb from "@/db/setup";
import { getBooks } from "@/db/tables/book/handlers";
import { tempFn } from "@/db/temp";
import { GetServerSideProps } from "next";

const Page = HomePage;

type PageProps = React.ComponentProps<typeof HomePage>;

export const getServerSideProps: GetServerSideProps<PageProps> = async ({res}) => {
  const db = makeDb();
  const getAllBooksAction = await getBooks(db);
  if (!getAllBooksAction.success) {
    console.error(getAllBooksAction.err);
    res.statusCode = 500;
    throw new Error("Could not fetch books for homepage");
  }
  const booksArr = getAllBooksAction.data;
  return { props: { booksArr } }
}

export const myFn = async () => {
  return tempFn();
}
export default Page;
