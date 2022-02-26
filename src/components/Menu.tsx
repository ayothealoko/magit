import { useState } from "react";
import styles from "../styles/Menu.module.css";
import NavItem from "./NavItem"
import {ReactComponent as file} from "../icons/file.svg";
import FileIcon from "../icons/FileIcon";

function Menu(): JSX.Element {
    const [isOpen, setIsOpen] = useState(true);
    const buffers = [
	"main.jsx",
	"index.js",
	"navComponent.jsx",
	"galleryComponent.jsx"
    ];

    const handleClickToggle = () => {
	setIsOpen(val => !val);
    }

    const itemContainer = isOpen? styles.itemContainer : `${styles.itemContainer} ${styles.collapse}`

    const icon= isOpen? styles.icon : `${styles.icon} ${styles.rotateIcon}`

	return (
	<div className={styles.container}>
		    <h3 className={styles.header} onClick={handleClickToggle}>diff buffers <img className={icon} src="/icons/triangle.svg" alt="" /> </h3>
		    <div className={itemContainer}>
		    {buffers.map((text, id) =>{
			return (
			    // TODO use Proper id
		    <NavItem key={id} icon={FileIcon} text={text} />);
		    })}
		    </div>
		</div>
	);
}

export default Menu;
