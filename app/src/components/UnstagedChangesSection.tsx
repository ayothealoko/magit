import { FileDiff, StatusFile } from "server-types";
import { MenuProps } from "./CollapseLine";
import ChangesSection from "./ChangesSection";

interface UnstagedProps {
  statusFiles: StatusFile[];
  diffData?: Record<string, FileDiff>;
}

function UnstagedChangesSection({
  statusFiles,
  diffData,
}: UnstagedProps): JSX.Element {
  /* useEffect(() => {
*   if (diffData === null && statusFiles.length !== 0) {
*     fetchUnstagedChangesDiffs(statusFiles.map((v) => v.fileName)).then((diffs) => {
*       let diff: Record<string, FileDiff> = {};

*       diffs.forEach((d) => (diff[d.filePath] = d));
*       setDiffData(diff);
*     });
*   }
* }, [diffData, statusFiles]);
 */

  const sectionTitle = "Unstaged changes";
  const status = statusFiles.map(provideStatus);
  // top menu
  const menu1: MenuProps = {
    menu: ["stage all"],
    handlers: [
      (e) => {
        console.log("stage all");
      },
    ],
  };

  // level 1 menu
  const menu2: MenuProps[] = [
    {
      menu: ["stage"],
      handlers: [
        () => {
          console.log("stage");
        },
      ],
    },
    {
      menu: ["stage", "restore"],
      handlers: [
        () => {
          console.log("stage");
        },
        () => {
          console.log("restore");
        },
      ],
    },
  ];

  const menu2Index = status.map((x) => {
    if (x === "deleted") {
      return 1;
    } else {
      return 0;
    }
  });

  const props = {
    sectionTitle,
    statusFiles,
    menu1,
    menu2,
    status,
    diffData,
    menu2Index,
  };

  return <ChangesSection {...props} />;
}

const provideStatus = (file: StatusFile): string => {
  const states: Record<string, string> = {
    //added, staged, with unstaged changes
    "023": "modified",
    //modified, staged, with unstaged changes
    "123": "modified",
    //modified, unstaged
    "121": "modified",
    //deleted, unstaged
    "101": "deleted",
  };

  let status = states[file.serialize];

  return status ? status : "";
};

export default UnstagedChangesSection;
