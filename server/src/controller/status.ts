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

type SectionType = "unmodified" | "unstaged" | "staged" | "untracked";

interface StatusField {
  section: SectionType | SectionType[];
  isDeleted?: boolean;
}

const statusRecord: Record<string, StatusField> = {
  // added, staged, with unstaged changes
  "023": { section: ["unstaged", "staged"] },
  // modified, staged, with unstaged changes
  "123": { section: ["unstaged", "staged"] },
  // modified, unstaged
  "121": { section: "unstaged" },
  // deleted, unstaged
  "101": { section: "unstaged", isDeleted: true },
  // added, staged
  "022": { section: "staged" },
  // modified, staged
  "122": { section: "staged" },
  // deleted, staged
  "100": { section: "staged", isDeleted: true },
  // new, untracked
  "020": { section: "untracked" },
  // unmodified
  "111": { section: "unmodified" },
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

    if (Array.isArray(section.section)) {
      section.section.forEach((s) => {
        if (s in status) {
          status[s].push(v);
        }
      });
    } else {
      if (section.section in status) {
        status[section.section].push(v);
      }
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
