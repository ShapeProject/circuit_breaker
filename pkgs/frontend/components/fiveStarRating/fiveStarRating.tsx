import React, { FC, useState } from "react";
import StarIcon from "../Icons/StarIcon";

type PropsType = {
    count: number;
    value: number;
    size: number;
};

export const FiveStarRating: FC<PropsType> = ({ count, value, size, }: PropsType) => {

    const avg = (value / count) * 100;

    return (
        <>
            <div className="relative w-fit">
                <ul 
                className="absolute top-0 left-0 z-10 flex flex-row items-center space-x-1 overflow-hidden" 
                style={{ width: `${avg}%` }}>
                    {...Array.from({ length: count }, (_, index) => (
                        <li>
                            <StarIcon key={index} width={size} height={size} className=" fill-Primary10" />
                        </li>
                    ))}
                </ul>

                <ul className="flex flex-row items-center space-x-1">
                    {...Array.from({ length: count }, (_, index) => (
                        <li>
                            <StarIcon key={index} width={size} height={size} className=" fill-Primary60" />
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
};