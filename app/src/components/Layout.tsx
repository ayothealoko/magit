import { Routes, Route, Navigate } from "react-router-dom";
import Status from "../routes/Status";
import styles from "../styles/Layout.module.css";
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
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default Layout;
