// node.js example
import git from "isomorphic-git";
import fs from "fs";
import { dir } from "../utils/gitdir";

// Shared types
import { Status, StatusFile } from "server-types";

async function status(): Promise<Status> {
  let status = await git
    .statusMatrix({
      fs,
      dir,
    })
    .then((s) => {
      const files = matrixToFile(s);
      const sections = statusSections(files);
      return sections;
    });

  return status;
}

function matrixToFile(
  status: Awaited<ReturnType<typeof git.statusMatrix>>
): StatusFile[] {
  const ans = status.map((v) => {
    let file: StatusFile = {
      status: v.slice(1) as number[],
      fileName: v[0],
      serialize: serialize(v),
    };

    return file;
  });

  return ans;
}

interface StatusField {
  section: "unmodified" | "unstaged" | "staged" | "untracked";
  isDeleted?: boolean;
}

const statusRecord: Record<string, StatusField> = {
  "000": { section: "unmodified" },
  "020": { section: "untracked" },
  "022": { section: "staged" },
  "103": { section: "untracked", isDeleted: true },
  "110": { section: "unmodified" },
  // figure out if true
  "111": { section: "unmodified" },
  "122": { section: "staged" },

  //unstaged changes
  //added, staged, with unstaged changes
  "023": { section: "unstaged" },
  //modified, staged, with unstaged changes
  "123": { section: "unstaged" },
  //modified, unstaged
  "121": { section: "unstaged" },
  //deleted, unstaged
  "101": { section: "unstaged", isDeleted: true },
};

function statusSections(files: StatusFile[]): Status {
  let status: Status = {
    unstaged: [],
    staged: [],
    untracked: [],
    unmodified: [],
  };

  files.forEach((v) => {
    const section = statusRecord[v.serialize];
    if (section.isDeleted === true) {
      v.isDeleted = true;
    }

    if (section.section in status) {
      status[section.section].push(v);
    }
  });

  return status;
}

function serialize(row: Array<String | number>): string {
  if (row.length === 4) {
    return `${row[1]}${row[2]}${row[3]}`;
  } else {
    return "000";
  }
}

export { status };
