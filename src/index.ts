import express from "express";

// setup server
const app = express();
app.set("view engine", "ejs");
app.set("views", "views");

app.get("/", (_, res) => {
  res.render("index");
});

app.listen(3000, () => {
  console.log("App is live");
});
