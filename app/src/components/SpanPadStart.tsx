import Space from "./Space";

interface SpanPadStartProps {
  text: string;
  pad: number;
}

function SpanPadStart({ text, pad }: SpanPadStartProps): JSX.Element {
  const length = text.length;
  // Todo handle case where text greater than pad

  let padding = 0;
  if (pad > length) {
    padding = pad - length;
  }

  return (
    <>
      {text}
      <Space width={padding} />
    </>
  );
}

export default SpanPadStart;
