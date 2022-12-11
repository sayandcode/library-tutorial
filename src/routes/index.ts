import { Router } from "express";
import Book from "../models/Book";

const indexRouter = Router();

indexRouter.get("/", async (_, res) => {
  const allBooks = await Book.find().exec();
  res.render("index", { books: allBooks });
});

export default indexRouter;
