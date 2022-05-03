import { StatusFile } from "server-types";
import CollapseLine, { Menu } from "./CollapseLine";
import StyledSpan from "./StyledSpan";
import Line from "./Line";

interface UntrackedProps {
  statusFiles: StatusFile[];
}

function UntrackedFilesSection({ statusFiles }: UntrackedProps): JSX.Element {
  const title = `Untracked files (${statusFiles.length})`;

  return (
    <CollapseLine
      head={<StyledSpan text={title} color={3} />}
      body={statusFiles.map((v) => (
        <>
          <Line>
            <span>{v.fileName}</span>
          </Line>
          <Menu
            menu={["stash"]}
            handlers={[
              (e) => {
                console.log(e);
              },
            ]}
          />
        </>
      ))}
    />
  );
}

export default UntrackedFilesSection;
