import ActionListMenu, { ListGroupProps } from "./ActionListMenu";

const actionsListGroup: ListGroupProps = {
  title: "actions",
  list: [
    { text: "merge", location: "merge" },
    { text: "merge and edit message", location: "merge/mergeandeditmessage" },
    { text: "merge and dont commit", location: "merge/mergebutdontcommit" },
    { text: "squash merge", location: "merge/squashmerge" },
  ],
};

const listMenu: ListGroupProps[] = [actionsListGroup];

function MergeActionListMenu(): JSX.Element {
  return <ActionListMenu listMenu={listMenu} />;
}

export default MergeActionListMenu;
