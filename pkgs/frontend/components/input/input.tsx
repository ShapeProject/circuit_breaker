import React, { useState } from "react";
import { Icon } from "./icons";

type InputProps = {
  labelText: string;
  id: string;
  type: string;
  autoCorrect: string;
  autoCapitalize: string;
  autoComplete: string;
  icon: any;
  value: any;
  onChange: any;
};

const Input: React.FC<InputProps> = ({
  labelText,
  id,
  type,
  autoCorrect,
  autoCapitalize,
  autoComplete,
  icon,
  value,
  onChange
}) => {
  const [isInputFocused, setIsInputFocused] = useState(false);

  const handleInputFocus = () => {
    setIsInputFocused(true);
  };

  return (
    <div className="w-full">
      <label htmlFor={id}>
        <div
          className={`rounded-2xl lg:rounded-lg border-2 ${isInputFocused ? "border-Input30" : "border-transparent"
            }`}
        >
          <div
            className={`rounded-2xl lg:rounded-lg px-8 py-4 border-2 lg:px-5 lg:py-3 xs:px-3 xs:py-1 ${isInputFocused
              ? "bg-white border-Input10"
              : "bg-Input30 border-transparent"
              }`}
          >
            <div className="flex flex-row items-center justify-between">
              <div className="relative h-11 w-full flex text-left">
                <span
                  className={`absolute ${isInputFocused 
                    ? "-top-1 text-Input10 text-InputLabelFocusLg lg:text-InputLabelFocusMd xs:text-InputLabelFocusSm xs:top-1"
                    : value
                      ? "-top-1 text-Input20 text-InputLabelFocusLg lg:text-InputLabelFocusMd xs:text-InputLabelFocusSm xs:top-1"
                      : "top-1/2 -translate-y-1/2 text-Input20 text-InputLabelLg lg:text-InputLabelMd xs:text-InputLabelSm"
                    }`}
                >
                  {labelText}
                </span>
                <div className="relative h-8 w-full">
                  <input
                    className={`w-full absolute -bottom-5 text-InputLg lg:text-InputMd xs:text-InputSm bg-transparent border-0 outline-0 xs:pb-2`}
                    id={id}
                    type={type}
                    autoCorrect={autoCorrect}
                    autoCapitalize={autoCapitalize}
                    autoComplete={autoComplete}
                    onFocus={handleInputFocus}
                    onBlur={() => setIsInputFocused(false)}
                    value={value}
                    onChange={(e:any) => onChange(e.target.value)}
                  />
                </div>
              </div>
              <Icon name={icon} className={`ml-8 ${isInputFocused ? "fill-Primary10" : "fill-Input20"}`} />
            </div>
          </div>
        </div>
      </label>
    </div>
  );
};

export default Input;