import git, { WalkerEntry } from "isomorphic-git";
import { createTwoFilesPatch } from "diff";
import fs from "fs";
import { FileDiff } from "server-types";

export async function unstagedChanges(
  gitDir: string,
  files: string[]
): Promise<FileDiff[]> {
  // stores all difs of FILES
  let diffFiles = await getUnstagedChangesDiffFiles(gitDir, files);
  let diffArr = diff2Files(diffFiles);

  return diffArr;
}

export async function stagedChanges(
  gitDir: string,
  files: string[]
): Promise<FileDiff[]> {
  // stores all difs of FILES
  let diffFiles = await getStagedChangesDiffFiles(gitDir, files);
  let diffArr = diff2Files(diffFiles);

  return diffArr;
}

function diff2Files(diffFiles: DiffFileSource[]): FileDiff[] {
  let diffArr = diffFiles.map((v) => {
    const [old, newF] = v.content;
    let diffText = createTwoFilesPatch("old", "new", old, newF);
    diffText = diffText.split("\n").slice(3).join("\n");
    const diff: FileDiff = {
      filePath: v.filePath,
      diff: diffText,
    };

    return diff;
  });

  return diffArr;
}

interface DiffFileSource {
  filePath: string;
  content: [string, string];
}

export async function getUnstagedChangesDiffFiles(
  gitDir: string,
  stagedFilePaths: string[]
): Promise<DiffFileSource[]> {
  const map = async (filePath: string, [S, W]: (WalkerEntry | null)[]) => {
    let stagedContent: string = "";
    let workDirContent: string = "";

    if (stagedFilePaths.includes(filePath)) {
      if (S !== null) {
        stagedContent = await readContentsFromHash(await S.oid(), gitDir);
      }

      if (W !== null) {
        let wkDir = await W.content();
        if (typeof wkDir === "object") {
          workDirContent = uInt8ToString(wkDir);
        } else {
          workDirContent = "";
        }
      }

      let final: DiffFileSource = {
        filePath: filePath,
        content: [stagedContent, workDirContent],
      };
      return final;
    }
  };

  return await git.walk({
    fs,
    dir: gitDir,
    trees: [git.STAGE(), git.WORKDIR()],
    map,
  });
}

export async function getStagedChangesDiffFiles(
  gitDir: string,
  stagedFilePaths: string[]
): Promise<DiffFileSource[]> {
  const map = async (filePath: string, [S, H]: (WalkerEntry | null)[]) => {
    let stagedContent: string = "";
    let headContent: string = "";

    if (stagedFilePaths.includes(filePath)) {
      if (S !== null) {
        stagedContent = await readContentsFromHash(await S.oid(), gitDir);
      }

      if (H !== null) {
        headContent = await readContentsFromHash(await H.oid(), gitDir);
      }

      let final: DiffFileSource = {
        filePath: filePath,
        content: [headContent, stagedContent],
      };
      return final;
    }
  };

  return await git.walk({
    fs,
    dir: gitDir,
    trees: [git.STAGE(), git.TREE({ ref: "HEAD" })],
    map,
  });
}

interface readContentsFromHashConfig {
  fs: typeof fs;
  dir: string;
  oid: string;
  filepath?: string;
}

async function readContentsFromHash(
  hash: string,
  gitDir: string,
  filePath: string | null = null
) {
  let config: readContentsFromHashConfig = {
    fs,
    dir: gitDir,
    oid: hash,
  };

  if (filePath !== null) {
    config = {
      ...config,
      filepath: filePath,
    };
  }

  const { blob } = await git.readBlob(config);

  return uInt8ToString(blob);
}

function uInt8ToString(arr: Uint8Array): string {
  return Buffer.from(arr).toString("utf8");
}
