import React from "react";
import "./inputField.css";

const InputField = (props: IInputField) => {
  const { ...rest } = props;

  return (
    <div className="if-container">
      <input {...rest} />
    </div>
  );
};

interface IInputField extends React.InputHTMLAttributes<HTMLInputElement> {
}

export default InputField;
