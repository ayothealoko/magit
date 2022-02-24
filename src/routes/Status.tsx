import StatusP from "../components/StatusP";
import styles from "../styles/Status.module.css";

function Status(): JSX.Element {
	return (
	    <div className={styles.container}>
		<h1 className={styles.header}>status</h1>
		<StatusP />
	    </div>
	);
}

export default Status;
