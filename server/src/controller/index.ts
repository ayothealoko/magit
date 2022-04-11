import { status } from "./status";
import express from "express";
import { unstagedChanges } from "./diff";
import { dir } from "../utils/gitdir";

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

router.post("/unstaged-changes", (req, res) => {
  let files = req.body.files;
  unstagedChanges(dir, files)
    .then((s) => {
      res.send(s);
    })
    .catch((err) => {
      console.log(err);
    });
});

export { router };
