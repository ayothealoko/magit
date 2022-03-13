import styles from "../styles/CollapseLine.module.css";
import { useState } from "react";
import Line from "./Line";
import StyledSpan from "./StyledSpan";
import TriangleIcon from "../icons/TriangleIcon";

interface CollapseLineProps {
  head: {
    text: string;
    color?: number;
    bgColor?: number;
  };
  level1: {
    text: string;
    bgColor?: number;
    color?: number;
    level2?: {
      text: string;
      bgColor?: number;
      color?: number;
    }[];
  }[];
}
function CollapseLine({ head, level1 }: CollapseLineProps): JSX.Element {
  const [isOpen, setIsOpen] = useState(true);
  const handleClickToggle = () => {
    setIsOpen((val) => !val);
  };

  let iconClass = styles.iconClosed;

  if (isOpen == true) {
    iconClass = styles.iconOpen;
  }

  let level1Comp = null;
  if (isOpen === true) {
    level1Comp = level1.map((l, i) => {
      if (l.level2 !== undefined) {
        return <Level1Collaspable key={i} {...l} />;
      } else {
        return <Level1NonCollaspable key={i} {...l} />;
      }
    });
  }

  return (
    <>
      <Line onClick={handleClickToggle}>
        <TriangleIcon className={iconClass} />
        <StyledSpan {...head} />
      </Line>
      {level1Comp}
    </>
  );
}

interface Level1NonCollaspableProps {
  text: string;
  bgColor?: number;
  color?: number;
}

function Level1NonCollaspable(props: Level1NonCollaspableProps): JSX.Element {
  return (
    <>
      return{" "}
      <Line>
        {" "}
        <StyledSpan {...props} />{" "}
      </Line>
    </>
  );
}

interface Level1CollaspableProps {
  text: string;
  bgColor?: number;
  color?: number;
  level2?: {
    text: string;
    bgColor?: number;
    color?: number;
  }[];
}

function Level1Collaspable({
  text,
  bgColor,
  color,
  level2,
}: Level1CollaspableProps): JSX.Element {
  const [isOpen, setIsOpen] = useState(true);
  const handleClickToggle = () => {
    setIsOpen((val) => !val);
  };

  let iconClass = styles.iconClosed;
  let level2Comp: JSX.Element | null = null;
  if (isOpen === true && level2 !== undefined) {
    iconClass = styles.iconOpen;
    level2Comp = <Level2 data={level2} />;
  }

  const l1 = { text: text, bgColor, color };

  return (
    <>
      <Line onClick={handleClickToggle}>
        <TriangleIcon className={iconClass} />
        <StyledSpan {...l1} />
      </Line>
      {level2Comp}
    </>
  );
}

interface Level2Props {
  data: {
    text: string;
    bgColor?: number;
    color?: number;
  }[];
}

function Level2({ data }: Level2Props): JSX.Element {
  return (
    <>
      {data.map((t, i) => {
        return (
          <Line key={i}>
            {" "}
            <StyledSpan {...t} />{" "}
          </Line>
        );
      })}
    </>
  );
}

interface Level1Props {
  data: {
    text: string;
    bgColor?: number;
    color?: number;
    level2?: {
      text: string;
      bgColor?: number;
      color?: number;
    }[];
  };
}

/* function Level1({}:Level1Props):JSX.Element{
 *     return (
 *   );
 * } */

export default CollapseLine;
