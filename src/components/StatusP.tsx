import styles from "../styles/StatusP.module.css";
import CollapseLine from "./CollapseLine";
import EmptyLine from "./EmptyLine";
import Line from "./Line";
import StatusHead from "./StatusHead";
import StyledSpan from "./StyledSpan";

function StatusP(): JSX.Element {
	return (
		<p className={styles.container}>
		    <StatusHead />
		    <EmptyLine />
		    <CollapseLine head={{
		    text:"Unstaged changes"
		    }}
				  level1={[
				      {
					  text:"Hello",
					  bgColor:2,
					  level2:[{
					     text:"hello" 
					  }]
				      },
				      {
					  text:"Mason",
					  bgColor:2,
					  level2:[{
					     text:"Jar" 
					  }]
				      },
				  ]}
		    />
		</p>	
	);
}



export default StatusP;
