import styles from "../styles/NavItem.module.css";

interface NavItemProp {
    icon:JSX.Element;
    text:string;
    active?: boolean;
}

function NavItem({icon,text, active}: NavItemProp): JSX.Element {
    
    if(active === true) {
	return (
		<div className={`${styles.container} ${styles.containerActive}`}>
			<div className={styles.design}></div>
			<span>{text}</span>
	    </div>
	);
    } else {
	return (
		<div className={styles.container}>
		    {icon}
		    <span>{text}</span>
	    </div>
	);
    }
}

export default NavItem;
