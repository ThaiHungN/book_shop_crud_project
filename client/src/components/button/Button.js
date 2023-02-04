import "./button.scss";

const Button = (props) => {

    let styles = props.styles;
    let customedClass = props.customedClass;

    if(customedClass === undefined){
        customedClass = "";
    }

    styles.display = "flex";
    styles.alignItems = "center";
    styles.justifyContent = "center";

    

    return <div className = {["button", props.customedClass].join(" ")} 
                style = {styles}
                onClick = {props.handleClick}            
            >
        {props.icon &&
            <img src = {props.icon}></img>
        }

        {props.content}
    </div>
}

export default Button;