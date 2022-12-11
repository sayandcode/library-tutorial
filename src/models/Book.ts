import { model, Schema } from "mongoose";

const bookSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, minlength: 10, maxLength: 100 },
  releaseDate: { type: Date },
});

const Book = model("Book", bookSchema);

export default Book;
