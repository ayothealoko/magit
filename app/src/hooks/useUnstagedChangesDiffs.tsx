import { useEffect, useState } from "react";
import { FileDiff, StatusFile } from "server-types";
import { fetchUnstagedChangesDiffs } from "../fetch";

function useUnstagedChangesDiffs(statusFiles: StatusFile[]) {
  const [unstagedDiffData, setDiffData] = useState<
    Record<string, FileDiff> | undefined
  >();

  useEffect(() => {
    // sentinel to cancel async request
    let isSuscribed = true;

    if (unstagedDiffData === undefined && statusFiles.length !== 0) {
      fetchUnstagedChangesDiffs(statusFiles.map((v) => v.fileName)).then(
        (diffs) => {
          if (isSuscribed) {
            let diff: Record<string, FileDiff> = {};

            diffs.forEach((d) => (diff[d.filePath] = d));
            setDiffData(diff);
          }
        }
      );
    }

    return () => {
      isSuscribed = false;
    };
  }, [unstagedDiffData, statusFiles]);

  return unstagedDiffData;
}

export default useUnstagedChangesDiffs;
