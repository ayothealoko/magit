import styles from "../styles/NavItem.module.css";

interface NavItemProp {
    icon:string;
    text:string;
    active?: boolean;
}

function NavItem({icon,text, active}: NavItemProp): JSX.Element {
    if(active === true) {
	return (
		<div className={`${styles.container} ${styles.containerActive}`}>
			<div className={styles.design}></div>
			<img className={styles.img} src={icon} alt="" />
			<span>{text}</span>
	    </div>
	);
    } else {
	return (
		<div className={styles.container}>
			<img className={styles.img} src={icon} alt="" />
			<span>{text}</span>
	    </div>
	);
    }
}

export default NavItem;
