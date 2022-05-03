import styles from "../styles/ActionsP.module.css";
import ActionMenu from "./ActionMenu";
import EmptyLine from "./EmptyLine";
import StatusHead from "./StatusHead";

function ActionsP(): JSX.Element {
  return (
    <div className={styles.container}>
      <StatusHead />
      <EmptyLine />
      <ActionMenu />
    </div>
  );
}

export default ActionsP;
