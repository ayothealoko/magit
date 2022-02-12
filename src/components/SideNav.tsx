import styles from "../styles/SideNav.module.css";
import Menu from "./Menu";
import NavItem from "./NavItem"

function SideNav(): JSX.Element {
	return (
	    <div className={styles.container}>
		<div className={`${styles.menu} ${styles.status}`}>
				<NavItem icon="/icons/home.svg" text="status" active={true} />
		</div>
		<div className={styles.menuWrapper}>
		    <Menu />
				</div>
		<footer className={styles.footer}>
		    <h3 className={styles.footerHeader}>magit</h3>
		    <a className={styles.footerLink} href="#">licences and credits</a>

		</footer>
	    </div>
	);
}

export default SideNav;


