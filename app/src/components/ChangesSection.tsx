import styles from "../styles/ChangesSection.module.css";
import { FileDiff, StatusFile } from "server-types";
import CollapseLine, { MenuProps } from "./CollapseLine";
import StyledSpan from "./StyledSpan";
import Line from "./Line";
import SpanPadStart from "./SpanPadStart";
import StyledLine from "./StyledLine";

interface ChangesProps {
  sectionTitle: string;
  statusFiles: StatusFile[];
  status: string[];
  menu1: MenuProps;
  menu2: MenuProps[];
  menu2Index: number[];
  diffData?: Record<string, FileDiff>;
}

function ChangesSection({
  sectionTitle,
  statusFiles,
  menu1,
  menu2,
  menu2Index,
  status,
  diffData,
}: ChangesProps): JSX.Element {
  const title = `${sectionTitle} (${statusFiles.length})`;

  return (
    <CollapseLine
      head={<StyledSpan text={title} color={3} />}
      menu={menu1}
      body={statusFiles.map((v, i) => (
        <L1
          key={v.fileName}
          data={v}
          diff={diffData ? diffData[v.fileName] : undefined}
          menu={menu2[menu2Index[i]]}
          status={status[i]}
        />
      ))}
    />
  );
}

interface L1Props {
  data: StatusFile;
  menu: MenuProps;
  status: string;
  diff?: FileDiff;
}

function L1({ data, diff, menu, status }: L1Props): JSX.Element {
  const { fileName } = data;

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
    if (line.length > 0 && (line[0] === "+" || line[0] === "-")) {
      return true;
    }
    return false;
  };

  const DiffHeaderEl = ({ line }: LineElProps): JSX.Element => {
    return (
      <StyledLine color={4} backgroundColor={5}>
        {line}
      </StyledLine>
    );
  };

  const DiffLineEl = ({ line }: LineElProps): JSX.Element => {
    return (
      <Line>
        <pre className={styles.preLine}>{line}</pre>
      </Line>
    );
  };

  const DiffChangeEl = ({ line }: LineElProps): JSX.Element => {
    const first = line[0];
    let text = line.slice(1);
    let isChange = false;

    if (first === "+" || first === "-") {
      isChange = true;
    }

    if (isChange) {
      if (first === "+") {
        return (
          <StyledLine color={9} backgroundColor={8}>
            <span className={styles.indicator}>{first}</span>
            <pre className={styles.preLine}>{text}</pre>
          </StyledLine>
        );
      }
      return (
        <StyledLine color={7} backgroundColor={6}>
          <span className={styles.indicator}>{first}</span>
          <pre className={styles.preLine}>{text}</pre>
        </StyledLine>
      );
    }

    return <DiffLineEl line={line} />;
  };

  const view = text.map((v: string, i: number): JSX.Element => {
    if (isHeader(v)) {
      return <DiffHeaderEl key={i} line={v} />;
    }

    if (isChange(v)) {
      return <DiffChangeEl key={i} line={v} />;
    }

    return <DiffLineEl key={i} line={v} />;
  });
  return <>{view}</>;
}

export default ChangesSection;
