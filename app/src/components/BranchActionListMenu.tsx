import ActionListMenu, { ListGroupProps } from "./ActionListMenu";

const checkoutListGroup: ListGroupProps = {
  title: "checkout",
  list: [
    { text: "local branch", location: "localbranch" },
    { text: "new branch", location: "newbranchandcheckout" },
  ],
};

const createListGroup: ListGroupProps = {
  title: "create",
  list: [{ text: "new branch", location: "newbranch" }],
};

const doListGroup: ListGroupProps = {
  title: "do",
  list: [
    { text: "rename", location: "rename" },
    { text: "reset", location: "reset" },
    { text: "delete", location: "delete" },
  ],
};

const listMenu: ListGroupProps[] = [
  checkoutListGroup,
  createListGroup,
  doListGroup,
];

function BranchActionListMenu(): JSX.Element {
  return <ActionListMenu listMenu={listMenu} />;
}

export default BranchActionListMenu;
