import React from "react";
import "./inputField.css";

const InputField = (props: IInputField) => {
  const { error, ...rest } = props;

  return (
    <div className="if-container">
      <input {...rest} />
      {
        error && <span className="error" >{error}</span>
      }
    </div>
  );
};

interface IInputField extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string
}

export default InputField;
