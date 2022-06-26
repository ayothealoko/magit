import ActionListMenu, { ListGroupProps } from "./ActionListMenu";

const createListGroup: ListGroupProps = {
  title: "create",
  list: [{ text: "commit", location: "commit/commit" }],
};

const editHEADListGroup: ListGroupProps = {
  title: "edit HEAD",
  list: [{ text: "ammend", location: "commit/ammend" }],
};

const editListGroup: ListGroupProps = {
  title: "edit",
  list: [{ text: "squash", location: "commit/squash" }],
};

const listMenu: ListGroupProps[] = [
  createListGroup,
  editHEADListGroup,
  editListGroup,
];

function CommitActionListMenu(): JSX.Element {
  return <ActionListMenu listMenu={listMenu} />;
}

export default CommitActionListMenu;
