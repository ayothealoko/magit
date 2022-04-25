import { useEffect, useState } from "react";
import { FileDiff, StatusFile } from "server-types";
import { fetchUnstagedChangesDiffs } from "../fetch";

function useUnstagedChangesDiffs(statusFiles: StatusFile[]) {
  const [unstagedDiffData, setDiffData] = useState<
    Record<string, FileDiff> | undefined
  >();

  useEffect(() => {
    if (unstagedDiffData === undefined && statusFiles.length !== 0) {
      fetchUnstagedChangesDiffs(statusFiles.map((v) => v.fileName)).then(
        (diffs) => {
          let diff: Record<string, FileDiff> = {};

          diffs.forEach((d) => (diff[d.filePath] = d));
          setDiffData(diff);
        }
      );
    }
  }, [unstagedDiffData, statusFiles]);

  return unstagedDiffData;
}

export default useUnstagedChangesDiffs;
