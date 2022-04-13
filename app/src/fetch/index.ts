import axios from "axios";
import { FileDiff } from "server-types";

export async function fetchUnstagedChangesDiffs(
  filePaths: string[]
): Promise<FileDiff[]> {
  const response = await axios.post<FileDiff[]>("/unstaged-changes", {
    files: filePaths,
  });
  return response.data;
}
