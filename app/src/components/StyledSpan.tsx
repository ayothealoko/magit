import { getColor } from "../colors";

interface StyledSpanProps {
  text: string;
  color?: number;
  bgColor?: number;
}

function StyledSpan({ text, color, bgColor }: StyledSpanProps): JSX.Element {
  const fontColor = getColor(color);
  const bgFontColor = getColor(bgColor);

  return (
    <span style={{ color: fontColor, backgroundColor: bgFontColor }}>
      {text}
    </span>
  );
}

export default StyledSpan;
