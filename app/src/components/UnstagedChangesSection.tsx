import { StatusFile } from "server-types";
import CollapseLine from "./CollapseLine";
import StyledSpan from "./StyledSpan";
import Line from "./Line";
import SpanPadStart from "./SpanPadStart";

interface UnstagedProps {
  data: StatusFile[];
}

function UnstagedChangesSection({ data }: UnstagedProps): JSX.Element {
  const title = `Unstaged changes (${data.length})`;
  return (
    <CollapseLine
      head={<StyledSpan text={title} color={3} />}
      menu={["stage all"]}
      body={data.map((v) => (
        <L1 data={v} />
      ))}
    />
  );
}

interface L1Props {
  data: StatusFile;
}

function L1({ data }: L1Props): JSX.Element {
  const { fileName } = data;

  let status = "modified";
  let menu = ["stage"];
  if (data.isDeleted) {
    status = "deleted";
    menu = ["stage", "recover"];
  }

  const headEl = (
    <span>
      <SpanPadStart text={status} pad={10} /> <StyledSpan text={fileName} />
    </span>
  );

  return <CollapseLine head={headEl} menu={menu} body={<Line>Hello</Line>} />;
}

export default UnstagedChangesSection;
