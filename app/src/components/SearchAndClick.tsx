import { useMemo, useState } from "react";
import styles from "../styles/SearchAndClick.module.css";
import CancelBtn from "./CancelBtn";

interface SearchAndClickProps {
  breadCrumb: string;
  header: string;
  list: string[];
}

interface FilterItem {
  id: number;
  text: string;
}

function SearchAndClick({
  breadCrumb,
  header,
  list,
}: SearchAndClickProps): JSX.Element {
  const [inputText, setInputText] = useState("");
  const fullList = useFullList(list);
  const filterList = useFilterList(inputText, fullList);

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  };

  return (
    <div className={styles.container}>
      <span className={styles.breadCrumb}>{breadCrumb}</span>

      <h2 className={styles.header}>{header}</h2>

      <input
        className={styles.input}
        value={inputText}
        onChange={onChangeInput}
        type="text"
      />
      <ul className={styles.list}>
        {filterList.map((v) => {
          return (
            <li key={v.id} className={styles.li}>
              <button className={styles.candidates}>{v.text}</button>
            </li>
          );
        })}
        {filterList.length === 0 ? (
          <li className={styles.li}>
            <div className={`${styles.candidates} ${styles.noCandidates}`}>
              no matches
            </div>
          </li>
        ) : null}
      </ul>
      <CancelBtn />
    </div>
  );
}

function useFullList(list: string[]): FilterItem[] {
  const fullList = useMemo(() => {
    return list
      .map((v, i) => {
        return { id: i, text: v };
      })
      .sort(filterItemCompare);
  }, [list]);

  return fullList;
}

function filterItemCompare(a: FilterItem, b: FilterItem): number {
  const al = a.text.toLowerCase();
  const bl = b.text.toLowerCase();

  if (al < bl) {
    return -1;
  }

  if (al > bl) {
    return 1;
  }

  return 0;
}

function useFilterList(search: string, filterList: FilterItem[]): FilterItem[] {
  return filterList.filter((v) => {
    return v.text.includes(search);
  });
}

export default SearchAndClick;
