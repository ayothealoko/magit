import Line from "./Line";
import Space from "./Space";
import SpanPadStart from "./SpanPadStart";
import StyledSpan from "./StyledSpan";

function StatusHead(): JSX.Element {
  return (
    <>
      <Head branch="master" fileName="README.md" message="use less bold text" />
      <Merge branch="origi/master" fileName="README.md" message="remove logo" />
      <Push branch="origi/master" fileName="README.md" message="remove logo" />
      <Tag version="2.8.0" number="(8)" />
    </>
  );
}

interface HeadProps {
  branch: string;
  fileName?: string;
  message: string;
}

function Head({ branch, fileName, message }: HeadProps): JSX.Element {
  let fileComp = null;
  if (fileName !== undefined) {
    fileComp = (
      <>
        {fileName}:<Space width={1} />
      </>
    );
  }
  return (
    <Line>
      <span>
        <SpanPadStart text="Head:" pad={8} />
        <StyledSpan text={branch} color={0} />
        <Space width={1} />
        {fileComp}
        {message}
      </span>
    </Line>
  );
}

function Merge({ branch, fileName, message }: HeadProps): JSX.Element {
  let fileComp = null;
  if (fileName !== undefined) {
    fileComp = (
      <>
        {fileName}:<Space width={1} />
      </>
    );
  }
  return (
    <Line>
      <span>
        <SpanPadStart text="merge:" pad={8} />
        <StyledSpan text={branch} color={1} />
        <Space width={1} />
        {fileComp}
        {message}
      </span>
    </Line>
  );
}

function Push({ branch, fileName, message }: HeadProps): JSX.Element {
  let fileComp = null;
  if (fileName !== undefined) {
    fileComp = (
      <>
        {fileName}:<Space width={1} />
      </>
    );
  }
  return (
    <Line>
      <span>
        <SpanPadStart text="push:" pad={8} />
        <StyledSpan text={branch} color={1} />
        <Space width={1} />
        {fileComp}
        {message}
      </span>
    </Line>
  );
}

interface TagProps {
  version: string;
  number: string;
}

function Tag({ version, number }: TagProps): JSX.Element {
  return (
    <Line>
      <span>
        <SpanPadStart text="tag:" pad={8} />
        <StyledSpan text={version} color={2} />
        <Space width={1} />
        <StyledSpan text={number} color={1} />
      </span>
    </Line>
  );
}

export default StatusHead;
