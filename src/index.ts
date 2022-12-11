import express from "express";
import { connect } from "mongoose";
import indexRouter from "./routes";
import editRouter from "./routes/edit";
import newRouter from "./routes/new";

// setup server
const app = express();
app.set("view engine", "ejs");
app.set("views", "views");

// allow json body requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//setup mongodb
connect("mongodb://localhost:27017/express-tutorial");

//public path
app.use("/public", express.static("public"));

app.use("/", indexRouter);
app.use("/new", newRouter);
app.use("/edit", editRouter);

const port = process.env["PORT"] || 3000;

app.listen(port, () => {
  console.log(`App is live on port ${port}`);
});
