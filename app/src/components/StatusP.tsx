import styles from "../styles/StatusP.module.css";
import EmptyLine from "./EmptyLine";
import StatusHead from "./StatusHead";
import UnstagedChangesSection from "./UnstagedChangesSection";
import { Status } from "server-types";
import StashesSection from "./StashesSection";

interface StatusPProps {
  sections: Status;
}

function StatusP({ sections }: StatusPProps): JSX.Element {
  return (
    <p className={styles.container}>
      <StatusHead />
      <EmptyLine />
      <UnstagedChangesSection data={sections.unstaged} />
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
