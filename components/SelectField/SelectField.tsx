import { useState } from "react";
import "./SelectField.css"; // CSS file for styles
import { useOutsideClick } from "~/hooks/useOutsideClick";
import { IOption, ISelect } from "utils/interfaces/components";

const SelectField = (props: ISelect) => {
  const { options = [], placeholder = "Select an option", onChange } = props;
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<IOption | null>(null);

  const ref = useOutsideClick(() => {
    setIsOpen(false);
  });

  const handleOptionClick = (option: IOption) => {
    setSelectedOption(option);
    setIsOpen(false);
    if (onChange) onChange(option);
  };

  return (
    <div ref={ref} className="select-container">
      {/* Select Box */}
      <div
        className={`select-box ${!selectedOption ? "placeholder" : ""} ${
          isOpen ? "open" : ""
        } `}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {selectedOption ? selectedOption.label : placeholder}
      </div>

      {/* Options Dropdown */}
      <div className={`options-container ${isOpen ? "open" : ""}`}>
        {options.length === 0 && <p>Empty</p>}
        {options.map((option) => (
          <div
            key={option.value}
            className="option"
            onClick={() => handleOptionClick(option)}
          >
            {option.label}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SelectField;
