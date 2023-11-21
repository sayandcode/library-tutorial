import { BookTableItem } from "./schema";

const mockBooksList: BookTableItem[] = [
  {
    id: 1,
    title: "My book 1",
    description: "What a description",
    publishDate: "2023-11-20T04:22:01.070Z"
  },
  {
    id: 2,
    title: "My book 2",
    description: "What a nice description",
    publishDate: "2023-11-20T04:22:01.070Z"
  },
  {
    id: 3,
    title: "My book 3",
    description: null,
    publishDate: "2023-11-20T04:22:01.070Z"
  },
  {
    id: 4,
    title: "My book 4",
    description: "What an awesome description",
    publishDate: "2023-11-20T04:22:01.070Z"
  },
]

export default mockBooksList;
