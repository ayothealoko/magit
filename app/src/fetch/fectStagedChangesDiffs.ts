import axios from "axios";
import { FileDiff } from "server-types";

export async function fetchStagedChangesDiffs(
  filePaths: string[]
): Promise<FileDiff[]> {
  const response = await axios.post<FileDiff[]>("/staged-changes", {
    files: filePaths,
  });
  return response.data;
}
