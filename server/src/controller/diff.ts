import git, { WalkerEntry } from "isomorphic-git";
import { createTwoFilesPatch } from "diff";
import fs from "fs";

export async function unstagedChanges(
  gitDir: string,
  files: string[]
): Promise<FileDiff[]> {
  // stores all difs of FILES
  let diffFiles = await getFileContents(gitDir, files);
  let diffArr = diffFiles.map((v) => {
    const [workDirFile, stagedFile] = v.content;
    const diff: FileDiff = {
      filePath: v.filePath,
      diff: createTwoFilesPatch("old", "new", stagedFile, workDirFile),
    };

    return diff;
  });

  return diffArr;
}

interface FileDiff {
  filePath: string;
  diff: string;
}

interface DiffFileSource {
  filePath: string;
  content: [string, string];
}

export async function getFileContents(
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
