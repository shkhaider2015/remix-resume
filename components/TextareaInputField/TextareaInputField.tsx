import React from "react";
import "./TextareaInputField.css";

const TextareaInputField = (props: IInputField) => {
  const { ...rest } = props;

  return (
    <div className="ta-if-container">
      <textarea {...rest} />
    </div>
  );
};

interface IInputField extends React.InputHTMLAttributes<HTMLTextAreaElement> {
}

export default TextareaInputField;
