import ActionListMenu, { ListGroupProps } from "./ActionListMenu";

const pushToBranchListGroup: ListGroupProps = {
  title: "push to branch",
  list: [
    { text: "remote", location: "push/remote" },
    { text: "upstream", location: "push/upstream" },
  ],
};

const pushListGroup: ListGroupProps = {
  title: "push",
  list: [{ text: "other branch", location: "push/otherbranch" }],
};

const listMenu: ListGroupProps[] = [pushToBranchListGroup, pushListGroup];

function PushActionListMenu(): JSX.Element {
  return <ActionListMenu listMenu={listMenu} />;
}

export default PushActionListMenu;
