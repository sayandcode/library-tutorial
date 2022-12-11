import { Router } from "express";
import { Error } from "mongoose";
import Book from "../models/Book";

const editRouter = Router();

editRouter.get("/:_id", async (req, res) => {
  try {
    const book = await Book.findById(req.params._id).exec();
    res.render("form", { book });
  } catch {
    res.redirect("/");
  }
});

editRouter.post("/:_id", async (req, res) => {
  const _id = req.params._id;
  const book = await Book.findById(_id).exec();
  try {
    await book?.update(req.body, { runValidators: true });
    res.redirect("/");
  } catch (err) {
    let errMsg = "Something went wrong. Please try again later";
    if (err instanceof Error.ValidationError) errMsg = err.message;
    res.render("form", { book, errMsg });
  }
});

editRouter.delete("/:_id", async (req, res) => {
  const _id = req.params._id;
  await Book.findByIdAndDelete(_id).exec();
  res.send(204);
});

export default editRouter;
