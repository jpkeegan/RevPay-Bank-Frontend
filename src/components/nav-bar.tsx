import { useState } from "react"


type NavBarButton = {
    callback:any
    text:string
}

type NavBarProps = {
    left:NavBarButton[]
    right:NavBarButton[]
}

export function NavBar(props:NavBarProps){

    const myStyle = {
        bar:{
            width:"100%",
            display:"flex",
            borderColor:"antiquewhite",
            borderWidth:"2px",
            borderStyle:"solid",
            justifyContent:"space-between",
            alignItems:"center",
            borderRadius:"10px",
            padding:"1px"
        }
    };

    return<>
        <div style={{...myStyle.bar}}>
            <div style={{marginLeft:"15px",  marginTop:"5px", marginBottom:"5px",display:"flex"}}>
                {props.left.map(b=><NavButton key={"lnb"+b.text} text={b.text} callback={b.callback}/>)}
            </div>
            <div style={{marginRight:"15px",  marginTop:"5px", marginBottom:"5px",display:"flex"}}>
                {props.right.map(b=><NavButton key={"rnb"+b.text} text={b.text} callback={b.callback}/>)}
            </div>
        </div>
    </>
}

export function NavButton(props:NavBarButton){
    
    const [isHover, setIsHover] = useState(false);

    const handleMouseEnter = () => {
        setIsHover(true);
     };
     const handleMouseLeave = () => {
        setIsHover(false);
     };

    const myStyle = {
        button:{
            display:"table-cell",
            backgroundImage: isHover ? "radial-gradient(black, slategrey, grey, white)":"radial-gradient(rgba(5, 5, 5, 0.2) 90%, rgba(205, 205, 205, 0.9) 10%)",
            textShadow:"2px 2px 5px white",
            borderRadius:"10px",
            padding:"5px",
            
        }
    };
    
    return <div style={{...myStyle.button, textAlign:"center", cursor:"pointer",marginLeft:"10px",marginRight:"10px"}}>
            <a href="#0" style={{textDecoration:"none"}} 
                onClick={()=>{props.callback()}}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                <h1 style={{marginTop:"2px",marginBottom:"2px"}}>{props.text}</h1>
            </a>
        </div>
}