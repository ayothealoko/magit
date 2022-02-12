import styles from "../styles/Layout.module.css";
import SideNav from "./SideNav";

function Layout(): JSX.Element {
	return (
		<div className={styles.container}>
			<aside className={styles.aside}><SideNav /></aside>
			<main className={styles.main}></main>
	    </div>
	);
}

export default Layout;
