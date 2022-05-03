import { useEffect, useState } from "react";
import { FileDiff, StatusFile } from "server-types";
import { fetchStagedChangesDiffs } from "../fetch/fectStagedChangesDiffs";

function useStagedChangesDiffs(statusFiles: StatusFile[]) {
  const [stagedDiffData, setDiffData] = useState<
    Record<string, FileDiff> | undefined
  >();

  useEffect(() => {
    // sentinel to cancel async request
    let isSuscribed = true;
    if (stagedDiffData === undefined && statusFiles.length !== 0) {
      fetchStagedChangesDiffs(statusFiles.map((v) => v.fileName)).then(
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
  }, [stagedDiffData, statusFiles]);

  return stagedDiffData;
}

export default useStagedChangesDiffs;
