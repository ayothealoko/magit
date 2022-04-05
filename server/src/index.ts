import express from "express";
import { router } from "./controller/index";

const app = express();
const PORT = 8000;

app.use(router);

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
});
