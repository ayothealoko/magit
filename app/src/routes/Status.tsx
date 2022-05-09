import styles from "../styles/Status.module.css";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/store";
import { selectSections, fetchSections } from "../slices/statusSlice";
import StatusP from "../components/StatusP";

function Status(): JSX.Element {
  const dispatch = useAppDispatch();
  const sections = useAppSelector(selectSections);

  useEffect(() => {
    if (sections.status === "idle") {
      dispatch(fetchSections());
    }
  }, [sections, dispatch]);

  return (
    <div className={styles.container}>
      <h1 className={styles.header}>status</h1>
      <StatusP sections={sections.data} />
    </div>
  );
}

export default Status;
