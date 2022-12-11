import { Router } from "express";
import { Error } from "mongoose";
import Book from "../models/Book";

const newRouter = Router();

newRouter.get("/", (_, res) => {
  res.render("form");
});

newRouter.post("/", async (req, res, next) => {
  try {
    await Book.create(req.body);
    res.redirect("/");
  } catch (err) {
    if (err instanceof Error.ValidationError)
      res.render("form", { errMsg: err.message });
    next(err);
  }
});

export default newRouter;
