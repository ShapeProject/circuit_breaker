import { FC } from "react";

type LogomarkProps = {
    color: string,
};

export const Logomark: FC<LogomarkProps> = ({color}) => {

    return (
        <>
            <a href="#" className="flex flex-row w-fit space-x-[14.4px] items-center">
                <svg
                    className="h-6 w-6"
                    fill={color}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 40 40"
                >
                    <use xlinkHref="/SymbolMark.svg#SymbolMark" />
                </svg>
                <span className={`text-logoMd text-${color}`}>Trusted Score</span>
            </a>
        </>
    );
};