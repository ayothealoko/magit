import { getColor } from "../colors";
import styles from "../styles/StyledLine.module.css";

interface StyledLineProps {
  children: JSX.Element | React.ReactNode;
  color: number;
  backgroundColor: number;
  onClick?: (event: any) => void;
}

function StyledLine({
  children,
  color,
  backgroundColor,
  onClick,
}: StyledLineProps): JSX.Element {
  const fontColor = getColor(color);
  const bgColor = getColor(backgroundColor);
  return (
    <>
      <span
        className={styles.line}
        onClick={onClick}
        style={{ color: fontColor, backgroundColor: bgColor }}
      >
        {children}
      </span>
      <br />
    </>
  );
}

export default StyledLine;
