import ActionListMenu, { ListGroupProps } from "./ActionListMenu";

const pullToBranchListGroup: ListGroupProps = {
  title: "pull to branch",
  list: [
    { text: "remote", location: "pull/remote" },
    { text: "upstream", location: "pull/upstream" },
  ],
};

const pullListGroup: ListGroupProps = {
  title: "pull",
  list: [{ text: "other branch", location: "pull/other branch" }],
};

const listMenu: ListGroupProps[] = [pullListGroup, pullToBranchListGroup];

function PullActionListMenu(): JSX.Element {
  return <ActionListMenu listMenu={listMenu} />;
}

export default PullActionListMenu;
