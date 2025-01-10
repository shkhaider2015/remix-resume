import React from "react";
import './Button.css'

const Button = (props:IButton) => {
    const { label, width, ...rest } = props;
    return <div className="button-con" {...rest} style={{ width }}>
        <p >{label}</p>
    </div>
}

interface IButton extends React.ButtonHTMLAttributes<HTMLDivElement> {
    label?: string;
    width?: string | number;
}

export default Button;