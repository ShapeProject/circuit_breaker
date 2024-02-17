import { FC } from "react";
import StarIcon from "../Icons/StarIcon";

type PropsType = {
    count: number;
    value: number;
    size: number;
};

export const FiveStarRating: FC<PropsType> = ({ count, value, size, }: PropsType) => {

    const avg = (value / count) * 100;

    return (
        <div className="w-fit rounded-2xl mx-auto px-8 py-4 border border-Primary10">
            <div className="relative w-full [&>ul]:w-full [&>ul]:flex [&>ul]:flex-row [&>ul]:items-center">
                <ul
                    className="absolute top-0 left-0 z-10 overflow-hidden"
                    style={{ width: `${avg}%` }}>
                    {...Array.from({ length: count }, (_, index) => (
                        // eslint-disable-next-line react/jsx-key
                        <li>
                            <StarIcon key={index} width={size} height={size} className=" fill-Primary10" />
                        </li>
                    ))}
                </ul>

                <ul>
                    {...Array.from({ length: count }, (_, index) => (
                        // eslint-disable-next-line react/jsx-key
                        <li>
                            <StarIcon key={index} width={size} height={size} className=" fill-Primary60" />
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};