import React from "react";
import './Button.css'

const Button = (props:IButton) => {
    const { label, width, ...rest } = props;
    return <button className="button-con" {...rest} style={{ width }}>
        <p >{label}</p>
    </button>
}

interface IButton extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    label?: string;
    width?: string | number;
}

export default Button;