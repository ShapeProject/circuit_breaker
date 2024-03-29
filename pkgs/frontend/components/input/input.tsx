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
    <div>
      <label htmlFor={id}>
        <div
          className={`w-fit rounded-2xl border-2 ${isInputFocused ? "border-Input30" : "border-transparent"
            }`}
        >
          <div
            className={`w-fit rounded-2xl px-8 py-4 border-2 ${isInputFocused
              ? "bg-white border-Input10"
              : "bg-Input30 border-transparent"
              }`}
          >
            <div className="flex flex-row items-center space-x-2">
              <div className="relative h-11 flex text-left">
                <span
                  className={`absolute ${isInputFocused 
                    ? "-top-1 text-InputLabelFocus text-Input10"
                    : value
                      ? "-top-1 text-InputLabelFocus text-Input20"
                      : "top-1/2 -translate-y-1/2 text-InputLabel text-Input20"
                    }`}
                >
                  {labelText}
                </span>
                <div className="relative h-8 w-InputWidth">
                  <input
                    className={`w-full absolute -bottom-5 text-Input bg-transparent border-0 outline-0`}
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
              <Icon name={icon} className={`${isInputFocused ? "fill-Primary10" : "fill-Input20"}`} />
            </div>
          </div>
        </div>
      </label>
    </div>
  );
};

export default Input;