import CollapseLine, { Menu } from "./CollapseLine";
import StyledSpan from "./StyledSpan";
import Line from "./Line";
import SpanPadStart from "./SpanPadStart";

interface StashesProps {
  data: Data[];
}

interface Data {
  index: number;
  title: string;
}

function StashesSection({ data }: StashesProps): JSX.Element {
  const title = `Stashes (${data.length})`;

  return (
    <CollapseLine
      head={<StyledSpan text={title} color={3} />}
      body={data.map((v) => (
        <>
          <Line>
            <SpanPadStart text={`stash@{${v.index}}`} pad={11} />
            <span>{v.title}</span>
          </Line>
          <Menu
            menu={["apply"]}
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

export default StashesSection;
