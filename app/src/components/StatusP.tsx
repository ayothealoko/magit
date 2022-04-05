import styles from "../styles/StatusP.module.css";
import EmptyLine from "./EmptyLine";
import StatusHead from "./StatusHead";
import UnstagedChangesSection from "./UnstagedChangesSection";
import { Status } from "server-types";

interface StatusPProps {
  sections: Status;
}

function StatusP({ sections }: StatusPProps): JSX.Element {
  return (
    <p className={styles.container}>
      <StatusHead />
      <EmptyLine />
      <UnstagedChangesSection data={sections.unstaged} />
    </p>
  );
}

export default StatusP;
