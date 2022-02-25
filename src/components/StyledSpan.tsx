interface StyledSpanProps{
    text:string;
    color?:number;
    bgColor?:number;
}

const colors = [
	"#1788D6",
	"#84AF12",
	"#52C2B2",
];


function StyledSpan({text, color, bgColor}:StyledSpanProps):JSX.Element{
    let fontColor = "inherit";
    let bgFontColor = "inherit";

    if(color !== undefined && colors[color] !== undefined){
	 fontColor= colors[color];
    }

    if(bgColor!==undefined && colors[bgColor] !== undefined){
	 bgFontColor= colors[bgColor];
    }

    return (
	<span  style={{color: fontColor, backgroundColor: bgFontColor}}>{text}</span>
    );
}

export default StyledSpan;
