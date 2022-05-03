import styles from "../styles/ActionMenu.module.css";
import FileIcon from "../icons/FileIcon";
import NavItem from "./NavItem";
import { Outlet } from "react-router-dom";

function ActionMenu(): JSX.Element {
  return (
    <div className={styles.container}>
      <div className={styles.nav}>
        <NavItem key="branch" icon={FileIcon} text="branch" link="/actions" />
        <NavItem key="push" icon={FileIcon} text="push" link="/actions/push" />
        <NavItem key="pull" icon={FileIcon} text="pull" link="/actions/pull" />
        <NavItem
          key="commit"
          icon={FileIcon}
          text="commit"
          link="/actions/commit"
        />
        <NavItem
          key="merge"
          icon={FileIcon}
          text="merge"
          link="/actions/merge"
        />
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  );
}

export default ActionMenu;
