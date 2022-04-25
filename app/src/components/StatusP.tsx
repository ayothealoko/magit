import styles from "../styles/StatusP.module.css";
import EmptyLine from "./EmptyLine";
import StatusHead from "./StatusHead";
import UnstagedChangesSection from "./UnstagedChangesSection";
import { FileDiff, Status } from "server-types";
import StashesSection from "./StashesSection";
import { useEffect, useState } from "react";
import { fetchUnstagedChangesDiffs } from "../fetch";

interface StatusPProps {
  sections: Status;
}

function StatusP({ sections }: StatusPProps): JSX.Element {
  const [diffData, setDiffData] = useState<
    Record<string, FileDiff> | undefined
  >();

  const statusFiles = sections.unstaged;

  useEffect(() => {
    if (diffData === undefined && statusFiles.length !== 0) {
      fetchUnstagedChangesDiffs(statusFiles.map((v) => v.fileName)).then(
        (diffs) => {
          let diff: Record<string, FileDiff> = {};

          diffs.forEach((d) => (diff[d.filePath] = d));
          setDiffData(diff);
        }
      );
    }
  }, [diffData, statusFiles]);

  return (
    <p className={styles.container}>
      <StatusHead />
      <EmptyLine />
      <UnstagedChangesSection
        statusFiles={sections.unstaged}
        diffData={diffData}
      />
      <StashesSection
        data={[
          { index: 0, title: "Fix issue 4" },
          { index: 1, title: "Replace jsx" },
        ]}
      />
    </p>
  );
}

export default StatusP;
