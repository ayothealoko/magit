import styles from "../styles/StatusP.module.css";
import EmptyLine from "./EmptyLine";
import StatusHead from "./StatusHead";
import UnstagedChangesSection from "./UnstagedChangesSection";
import { Status } from "server-types";
import StashesSection from "./StashesSection";
import StagedChangesSection from "./StagedChangesSection";
import useUnstagedChangesDiffs from "../hooks/useUnstagedChangesDiffs";
import useStagedChangesDiffs from "../hooks/useStagedChangesDiffs";

interface StatusPProps {
  sections: Status;
}

function StatusP({ sections }: StatusPProps): JSX.Element {
  const unstaged = sections.unstaged;
  const staged = sections.staged;
  const unstagedDiffData = useUnstagedChangesDiffs(unstaged);
  const stagedDiffData = useStagedChangesDiffs(staged);

  return (
    <p className={styles.container}>
      <StatusHead />
      <EmptyLine />
      <UnstagedChangesSection
        statusFiles={sections.unstaged}
        diffData={unstagedDiffData}
      />
      <StagedChangesSection
        statusFiles={sections.staged}
        diffData={stagedDiffData}
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
