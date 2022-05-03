import ActionsP from "../components/ActionsP";
import styles from "../styles/Actions.module.css";

function Actions(): JSX.Element {
  return (
    <div className={styles.container}>
      <h1 className={styles.header}>Actions</h1>
      <ActionsP />
    </div>
  );
}

export default Actions;
