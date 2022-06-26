import { Link } from "react-router-dom";
import styles from "../styles/ActionListMenu.module.css";

export interface ActionListMenuProps {
  listMenu: ListGroupProps[];
}

export interface ListInteraction {
  text: string;
  location: string;
}

export interface ListGroupProps {
  title: string;
  list: ListInteraction[];
}

function ActionListMenu({ listMenu }: ActionListMenuProps): JSX.Element {
  return (
    <div className={styles.container}>
      {listMenu.map((v, i) => (
        <ListGroup key={i} title={v.title} list={v.list} />
      ))}
    </div>
  );
}

function ListGroup({ title, list }: ListGroupProps): JSX.Element {
  return (
    <div className={styles.listGroupContainer}>
      <h3 className={styles.listHeader}>{title}</h3>
      <ul className={styles.list}>
        {list.map((v, i) => {
          return (
            <li className={styles.listItem} key={i}>
              <Link className={styles.listLink} to={v.location}>
                {v.text}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default ActionListMenu;
