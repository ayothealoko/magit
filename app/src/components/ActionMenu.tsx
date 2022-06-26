import styles from "../styles/ActionMenu.module.css";
import FileIcon from "../icons/FileIcon";
import NavItem from "./NavItem";
import { Outlet } from "react-router-dom";

function ActionMenu(): JSX.Element {
  return (
    <div className={styles.container}>
      <div className={styles.nav}>
        <NavItem key="branch" icon={FileIcon} text="branch" link="branch" />
        <NavItem key="push" icon={FileIcon} text="push" link="push" />
        <NavItem key="pull" icon={FileIcon} text="pull" link="pull" />
        <NavItem key="commit" icon={FileIcon} text="commit" link="commit" />
        <NavItem key="merge" icon={FileIcon} text="merge" link="merge" />
      </div>
      <div className={styles.main}>
        <Outlet />
      </div>
    </div>
  );
}

export default ActionMenu;
