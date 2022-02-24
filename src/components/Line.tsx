interface LineProps{
    children:JSX.Element;
}

function Line({children}:LineProps):JSX.Element{
    return (
	<>
	   {children}
	    <br />
	</>
    );
}

export default Line;
