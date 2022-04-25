import { FileDiff, StatusFile } from "server-types";
import { MenuProps } from "./CollapseLine";
import ChangesSection from "./ChangesSection";

interface StagedProps {
  statusFiles: StatusFile[];
  diffData?: Record<string, FileDiff>;
}

function StagedChangesSection({
  statusFiles,
  diffData,
}: StagedProps): JSX.Element {
  const sectionTitle = "Staged changes";
  const status = statusFiles.map(provideStatus);
  // top menu
  const menu1: MenuProps = {
    menu: ["unstage all"],
    handlers: [
      () => {
        console.log("unstage all");
      },
    ],
  };

  // level 1 menu
  const menu2: MenuProps[] = [
    {
      menu: ["unstage"],
      handlers: [
        () => {
          console.log("unstage");
        },
      ],
    },
  ];

  const menu2Index = status.map(() => {
    return 0;
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
    //added, staged
    "022": "new file",
    //modified, stage
    "122": "modified",
    //deleted, staged
    "100": "deleted",
    //added, staged, with unstaged changes
    "023": "new file",
    //modified, staged, with unstaged changes
    "123": "modified",
  };

  let status = states[file.serialize];

  return status ? status : "";
};

export default StagedChangesSection;
