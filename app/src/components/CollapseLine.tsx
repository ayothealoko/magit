import styles from "../styles/CollapseLine.module.css";
import { useState } from "react";
import Line from "./Line";
import TriangleIcon from "../icons/TriangleIcon";

interface CollapseLineProps {
  head: JSX.Element;
  body: JSX.Element | JSX.Element[];
  menu?: MenuProps;
}

function CollapseLine({ head, body, menu }: CollapseLineProps): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);
  const handleClickToggle = () => {
    setIsOpen((val) => !val);
  };

  let iconClass = styles.iconClosed;

  if (isOpen == true) {
    iconClass = styles.iconOpen;
  }

  let bodyEl = null;
  if (isOpen === true) {
    bodyEl = body;
  }

  let menuEl = null;
  if (menu !== undefined) {
    menuEl = <Menu menu={menu.menu} handlers={menu.handlers} />;
  }

  return (
    <>
      <Line onClick={handleClickToggle}>
        <TriangleIcon className={iconClass} />
        {head}
      </Line>
      {menuEl}
      {bodyEl}
    </>
  );
}

export interface MenuProps {
  menu: string[];
  handlers: ((e: React.MouseEvent<HTMLButtonElement>) => void)[];
}

export function Menu({ menu, handlers }: MenuProps): JSX.Element {
  let el = [];

  // add "|" in between menu buttons
  for (let i = 0; i < menu.length; i++) {
    const button = (
      <button key={menu[i]} className={styles.menuButton} onClick={handlers[i]}>
        {menu[i]}
      </button>
    );
    el.push(button);
    if (i < menu.length - 1) {
      el.push(" | ");
    }
  }

  return <Line>{el}</Line>;
}

export default CollapseLine;
