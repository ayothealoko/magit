import styles from "../styles/Line.module.css";

interface LineProps{
    children:JSX.Element| React.ReactNode;
    onClick?: (event:any)=>void;
}

function Line({children, onClick}:LineProps):JSX.Element{
    return (
	<>
	    <span className={styles.line} onClick={onClick}>{children}</span>
	    <br />
	</>
    );
}

export default Line;
