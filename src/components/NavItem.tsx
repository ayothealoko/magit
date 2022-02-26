import styles from "../styles/NavItem.module.css";

interface NavItemProp {
    icon:({className}:{className: string}) => JSX.Element;
    text:string;
    active?: boolean;
}

function NavItem({icon,text, active}: NavItemProp): JSX.Element {
    const Icon = icon;
    
    if(active === true) {
	return (
		<div className={`${styles.container} ${styles.containerActive}`}>
			<div className={styles.design}></div>
			<Icon className={styles.icon} />
			<span>{text}</span>
	    </div>
	);
    } else {
	return (
		<div className={styles.container}>
		    <Icon className={styles.icon} />
		    <span>{text}</span>
	    </div>
	);
    }
}

export default NavItem;
