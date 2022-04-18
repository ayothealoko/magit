import styles from "../styles/CollapseLine.module.css";
import { useState } from "react";
import Line from "./Line";
import TriangleIcon from "../icons/TriangleIcon";

interface CollapseLineProps {
  head: JSX.Element;
  body: JSX.Element | JSX.Element[];
  menu?: string[];
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
    menuEl = <Menu menu={menu} />;
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

interface MenuProps {
  menu: string[];
}

function Menu({ menu }: MenuProps): JSX.Element {
  let el = [];

  // add "|" in between menu buttons
  for (let i = 0; i < menu.length; i++) {
    const button = (
      <button key={menu[i]} className={styles.menuButton}>
        {menu[i]}
      </button>
    );
    el.push(button);
    el.push(" | ");
  }

  el.push(
    <button key="more" className={styles.menuButton}>
      more...
    </button>
  );
  return <Line>{el}</Line>;
}

export default CollapseLine;
