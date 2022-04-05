export interface StatusFile {
  status: number[];
  fileName: string;
  serialize: string;
  isDeleted?: boolean;
}

export interface Status {
  untracked: StatusFile[];
  unstaged: StatusFile[];
  staged: StatusFile[];
  unmodified: StatusFile[];
}
