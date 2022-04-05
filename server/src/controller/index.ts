import { status } from "./status";
import express from "express";

const router = express.Router();

router.get("/status", (_, res) => {
  status()
    .then((s) => {
      res.send(s);
    })
    .catch((err) => {
      console.log(err);
    });
});

export { router };
