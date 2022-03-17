// node.js example
import path from "path";
import git from "isomorphic-git";
import fs from "fs";

const dir = path.join(process.cwd(), "../");

interface StatusFile {
  status: number[];
  fileName: string;
  serialize: string;
  isDeleted?: boolean;
}

interface Status {
  untracked: StatusFile[];
  unstaged: StatusFile[];
  staged: StatusFile[];
  unmodified: StatusFile[];
}

async function status(): Promise<Status> {
  let status = await git
    .statusMatrix({
      fs,
      dir,
    })
    .then((s) => {
      const files = matrixToFile(s);
      const sections = statusSections(files);
      console.log(sections);
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
  "003": { section: "unstaged", isDeleted: true },
  "020": { section: "untracked" },
  "022": { section: "staged" },
  "023": { section: "unstaged" },
  "100": { section: "unstaged", isDeleted: true },
  "101": { section: "untracked", isDeleted: true },
  "103": { section: "untracked", isDeleted: true },
  "110": { section: "unmodified" },
  // figure out if true
  "111": { section: "unmodified" },
  "113": { section: "unstaged" },
  "120": { section: "unstaged", isDeleted: true },
  "121": { section: "unstaged" },
  "122": { section: "staged" },
  "123": { section: "unstaged" },
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

async function head() {
  return git.currentBranch({
    fs,
    dir,
  });
}

export { status, head };
