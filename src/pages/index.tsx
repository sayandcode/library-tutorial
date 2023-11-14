import HomePage from "@/components/PageComponents/HomePage";
import makeDb from "@/db/setup";
import { getAllBooks } from "@/db/tables/book/handlers";
import { BookTableItem } from "@/db/tables/book/schema";
import { tryItAsync } from "@/lib/utils";
import { GetStaticProps } from "next";

const Page = HomePage;

type HomepageProps = React.ComponentProps<typeof HomePage>;

export const getStaticProps: GetStaticProps<HomepageProps> = async () => {
  const db = makeDb();
  const getAllBooksAction = await getAllBooks(db);
  if (!getAllBooksAction.success) {
    console.error(getAllBooksAction.err);
    throw new Error("Could not fetch books for homepage");
  }
  const booksArr = getAllBooksAction.data;
  return { props: { booksArr } }
}
export default Page;
