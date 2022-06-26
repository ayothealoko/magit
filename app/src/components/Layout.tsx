import { Routes, Route, Navigate } from "react-router-dom";
import Actions from "../routes/Actions";
import Status from "../routes/Status";
import styles from "../styles/Layout.module.css";
import BranchActionListMenu from "./BranchActionListMenu";
import CommitActionListMenu from "./CommitActionListMenu";
import LocalBranch from "./LocalBranch";
import MergeActionListMenu from "./MergeActionListMenu";
import PullActionListMenu from "./PullActionListMenu";
import PushActionListMenu from "./PushActionListMenu";
import SideNav from "./SideNav";

function Layout(): JSX.Element {
  return (
    <div className={styles.container}>
      <aside className={styles.aside}>
        <SideNav />
      </aside>
      <Routes>
        <Route
          path="/"
          element={
            <main className={styles.main}>
              <Status />
            </main>
          }
        />
        <Route
          path="actions"
          element={
            <main className={styles.main}>
              <Actions />
            </main>
          }
        >
          <Route path="branch" element={<BranchActionListMenu />} />
          <Route path="branch/localbranch" element={<LocalBranch />} />
          <Route path="push" element={<PushActionListMenu />} />
          <Route path="pull" element={<PullActionListMenu />} />
          <Route path="commit" element={<CommitActionListMenu />} />
          <Route path="merge" element={<MergeActionListMenu />} />
          <Route index element={<Navigate to="branch" />} />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default Layout;
