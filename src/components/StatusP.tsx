import styles from "../styles/StatusP.module.css";
import StatusHead from "./StatusHead";

function StatusP(): JSX.Element {
	return (
		<p className={styles.container}>
		    <StatusHead />
		</p>	
	);
}



export default StatusP;
