import React from "react";
import AddressIcon from "@/components/Icons/AddressIcon";

type InputProps = {
    labelText: string;
    type: string;
    autoCorrect: string;
    autoCapitalize: string;
    autoComplete: string;
};

const Input: React.FC<InputProps> = ({
    labelText,
    type,
    autoCorrect,
    autoCapitalize,
    autoComplete,
}) => {
    return (
        <label>
            <div className="w-fit rounded-2xl border-2 border-Input30">
                <div className="w-fit rounded-2xl px-8 py-4 b/g-Input30 border-2 border-Input10">
                    <div className="flex flex-row items-center space-x-2">
                        <div className="flex flex-col space-y-4 text-left">
                            <span className="text-Input10 text-InputLabelFocus">
                                {labelText}
                            </span>
                            <input
                                className="h-4 text-Input bg-transparent align-middle border-0 outline-0"
                                placeholder=""
                                type={type}
                                autoCorrect={autoCorrect}
                                autoCapitalize={autoCapitalize}
                                autoComplete={autoComplete}
                            />
                        </div>
                        <AddressIcon className="fill-Primary10" />
                    </div>
                </div>
            </div>
        </label>
    );
};

export default Input;
