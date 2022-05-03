import { Link } from "react-router-dom";
import ActionIcon from "../icons/ActionsIcon";
import HomeIcon from "../icons/HomeIcon";
import styles from "../styles/SideNav.module.css";
import Menu from "./Menu";
import NavItem from "./NavItem";

function SideNav(): JSX.Element {
  return (
    <div className={styles.container}>
      <div className={`${styles.menu} ${styles.status}`}>
        <NavItem icon={HomeIcon} text="status" link="/" />
        <NavItem icon={ActionIcon} text="actions" link="/actions" />
      </div>
      <div className={styles.menuWrapper}>
        <Menu />
      </div>
      <footer className={styles.footer}>
        <h3 className={styles.footerHeader}>magit</h3>
        <Link className={styles.footerLink} to="#">
          licences and credits
        </Link>
      </footer>
    </div>
  );
}

export default SideNav;
