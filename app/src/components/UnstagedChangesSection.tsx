import { FileDiff, StatusFile } from "server-types";
import CollapseLine from "./CollapseLine";
import StyledSpan from "./StyledSpan";
import Line from "./Line";
import SpanPadStart from "./SpanPadStart";
import { useEffect, useState } from "react";
import { fetchUnstagedChangesDiffs } from "../fetch";

interface UnstagedProps {
  data: StatusFile[];
}

function UnstagedChangesSection({ data }: UnstagedProps): JSX.Element {
  const [diffData, setDiffData] = useState<Record<string, FileDiff> | null>(
    null
  );

  useEffect(() => {
    if (diffData === null && data.length !== 0) {
      fetchUnstagedChangesDiffs(data.map((v) => v.fileName)).then((diffs) => {
        let diff: Record<string, FileDiff> = {};

        diffs.forEach((d) => (diff[d.filePath] = d));
        console.log(diff);
        setDiffData(diff);
      });
    }
  }, [diffData, data]);

  const title = `Unstaged changes (${data.length})`;
  return (
    <CollapseLine
      head={<StyledSpan text={title} color={3} />}
      menu={["stage all"]}
      body={data.map((v) => (
        <L1 data={v} diff={diffData ? diffData[v.fileName] : undefined} />
      ))}
    />
  );
}

interface L1Props {
  data: StatusFile;
  diff?: FileDiff;
}

function L1({ data, diff }: L1Props): JSX.Element {
  console.log(diff);
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

  let diffEl = <Line> </Line>;
  if (diff !== undefined) {
    diffEl = <DiffElement diff={diff} />;
  }

  return (
    <>
      <CollapseLine head={headEl} menu={menu} body={diffEl} />
    </>
  );
}

interface DiffElementProps {
  diff: FileDiff;
}

function DiffElement({ diff }: DiffElementProps): JSX.Element {
  let text = diff.diff.split("\n");

  const isHeader = (line: string): Boolean => {
    const length = line.length;

    // meaning "@@ @@"
    if (
      length > 5 &&
      line[0] === "@" &&
      line[1] === "@" &&
      line[length - 2] === "@" &&
      line[length - 1] === "@"
    ) {
      return true;
    }
    return false;
  };

  interface LineElProps {
    line: string;
  }

  const isChange = (line: string): Boolean => {
    // meaning "+ " or "- "
    if (line.length > 1 && (line[0] === "+" || line[0] === "-")) {
      return true;
    }
    return false;
  };

  const DiffHeaderEl = ({ line }: LineElProps): JSX.Element => {
    return (
      <Line>
        <StyledSpan text={line} />
      </Line>
    );
  };

  const DiffLineEl = ({ line }: LineElProps): JSX.Element => {
    return <Line>{line}</Line>;
  };

  const DiffChangeEl = ({ line }: LineElProps): JSX.Element => {
    const first = line[0];
    let isChange = false;

    if (first === "+" || first === "-") {
      isChange = true;
    }

    if (isChange) {
      return (
        <Line>
          <StyledSpan text={line} />
        </Line>
      );
    }

    return <DiffLineEl line={line} />;
  };

  const view = text.map((v: string): JSX.Element => {
    if (isHeader(v)) {
      return <DiffHeaderEl line={v} />;
    }

    if (isChange(v)) {
      return <DiffChangeEl line={v} />;
    }

    return <DiffLineEl line={v} />;
  });
  return <>{view}</>;
}

export default UnstagedChangesSection;
