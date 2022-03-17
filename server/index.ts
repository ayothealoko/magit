import express from "express";

import { status, head } from "./isogit";

const app = express();
const PORT = 8000;

app.get("/status", (req, res) => {
  status()
    .then((s) => {
      res.send(s);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/head", (req, res) => {
  head()
    .then((s) => {
      res.send(s);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
});
