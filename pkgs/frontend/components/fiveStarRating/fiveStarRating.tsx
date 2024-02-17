import React, { FC, useState } from "react";
import StarIcon from "../Icons/StarIcon";

interface StarRatingProps {
    maxStars: number;
    rating: number;
    size: number;
};

const StarRating: FC<StarRatingProps> = ({ maxStars, rating, size }) => {

    // 評価された星の整数部分と小数部分を計算
    const fullStars = Math.floor(rating);
    // 小数点部分に基づく幅のパーセンテージ
    const partialStarWidth = (rating - fullStars) * 100;
    const avg = (rating / maxStars) * 100;

    //星を描画
    const stars = [];
    for (let i = 0; i < maxStars; i++) {
        if (i < fullStars) {
            // 完全な星
            stars.push(<div key={i} className="fill-Primary10">
                <StarIcon width={size} height={size} />
            </div>);
        } else if (i === fullStars && partialStarWidth > 0) {
            // 部分的な星
            stars.push(
                <div key={i} className="fill-Primary10 relative">
                    <div className="absolute overflow-hidden" style={{ width: `${partialStarWidth}%` }}>
                        <StarIcon width={size} height={size} />
                    </div>
                    <div className="fill-Primary60">
                        <StarIcon width={size} height={size} />
                    </div>
                </div>
            );
        } else {
            // 評価されていない星
            stars.push(<div key={i} className="fill-Primary60">
                <StarIcon width={size} height={size} />
            </div>);
        }
    }

    return (
        <div className="flex [&>div]:px-2.5">{stars}</div>
    );
};

export default StarRating;