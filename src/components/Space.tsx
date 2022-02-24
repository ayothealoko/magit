interface SpaceProps{
    width:number;
}

function Space({width}:SpaceProps):JSX.Element{
    return (
	<span style={{width:`${width}ch`, display:"inline-block"}}></span>
   );
}

export default Space;
