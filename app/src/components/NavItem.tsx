import { NavLink } from "react-router-dom";
import styles from "../styles/NavItem.module.css";

interface NavItemProp {
  icon: ({ className }: { className: string }) => JSX.Element;
  text: string;
  link: string;
}

function NavItem({ icon, text, link }: NavItemProp): JSX.Element {
  const Icon = icon;

  return (
    <NavLink
      to={link}
      className={({ isActive }) => {
        return isActive
          ? `${styles.container} ${styles.active}`
          : styles.container;
      }}
    >
      <div className={styles.design}></div>
      <Icon className={styles.icon} />
      <span>{text}</span>
    </NavLink>
  );
}

export default NavItem;
