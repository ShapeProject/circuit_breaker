import React, { FC, useEffect, useState } from "react";

interface ProgressCircleProps {
    score: number;
    maxScore: number;
};

const ScoreCircle:FC<ProgressCircleProps> = ({score, maxScore }) => {

    // 円周の全長
    const circumference = 888 * Math.PI;

    // スコアに基づいてoffsetを計算
    const calculteOffset = (score:number, maxScore: number, circumference: number) => {
        const ratio = score / maxScore;
        return circumference - ratio * circumference * (maxScore / 139.3);
    };

    const [offset, setOffset] = useState(calculteOffset(score, maxScore, circumference));

    useEffect(() => {
        setOffset(calculteOffset(score, maxScore, circumference));
    }, [score, maxScore, circumference]);

    return (
        <>
            <div className="relative h-full aspect-square rounded-full bg-Gray30">
                <svg className="h-68pct aspect-square rounded-full bg-white shadow-md" viewBox="0 0 680 680" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="340" cy="340" r="280" stroke="#ECECF1" stroke-width="40" stroke-dasharray="3 25" />
                    <circle cx="340" cy="340" r="228" stroke="#ECECF1" stroke-width="24" />
                    <circle cx="340" cy="340" r="186" stroke="#ECECF1" stroke-width="12" />
                </svg>
                <div className="absolute h-31pct aspect-square rounded-full bg-Primary10 shadow-lg">
                    <span className="font-mono text-AvgScore text-white">{score}</span>
                </div>

                <div className="absolute w-full h-full aspect-square rounded-ful">
                    <svg className="h-85pct" viewBox="0 0 888 874" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M442.482 0.00251389C442.988 0.000839233 443.494 0 444 0C444.506 0 445.012 0.000839233 445.518 0.00251389L445.359 48.0023C444.906 48.0008 444.453 48 444 48C443.547 48 443.094 48.0008 442.641 48.0023L442.482 0.00251389ZM646.553 48.1816C647.453 48.6369 648.35 49.0953 649.246 49.5565L627.276 92.2332C626.476 91.8214 625.674 91.4122 624.872 91.0057L646.553 48.1816ZM238.754 49.5565C239.65 49.0953 240.547 48.637 241.447 48.1816L263.128 91.0057C262.325 91.4123 261.524 91.8214 260.724 92.2332L238.754 49.5565ZM806.373 183.835C806.968 184.647 807.561 185.461 808.151 186.278L769.246 214.392C768.719 213.663 768.19 212.935 767.658 212.21L806.373 183.835ZM79.849 186.278C80.439 185.461 81.0316 184.647 81.6269 183.835L120.342 212.21C119.81 212.935 119.281 213.663 118.753 214.392L79.849 186.278ZM0.231323 380.266C0.385012 379.266 0.542 378.268 0.702278 377.27L48.0948 384.882C47.9517 385.773 47.8115 386.665 47.6743 387.558L0.231323 380.266ZM887.298 377.27C887.458 378.268 887.615 379.267 887.769 380.267L840.326 387.558C840.188 386.665 840.048 385.773 839.905 384.882L887.298 377.27ZM17.3386 589.23C17.0237 588.271 16.7119 587.311 16.4033 586.349L62.1068 571.68C62.3822 572.538 62.6603 573.395 62.9413 574.25L17.3386 589.23ZM871.597 586.349C871.288 587.311 870.976 588.271 870.661 589.23L825.059 574.25C825.34 573.395 825.618 572.538 825.893 571.68L871.597 586.349ZM127.579 767.558C126.865 766.848 126.152 766.135 125.442 765.421L159.497 731.593C160.131 732.232 160.768 732.869 161.407 733.503L127.579 767.558ZM761.157 766.824C760.912 767.069 760.667 767.313 760.421 767.557L726.593 733.503C726.942 733.157 727.29 732.81 727.637 732.463C727.926 732.173 728.215 731.884 728.503 731.593L762.558 765.421C762.092 765.89 761.625 766.357 761.157 766.824Z" fill="#DCDBE2" />
                        <path d="M143.48 749.52C84.0423 690.083 43.565 614.355 27.1663 531.913C10.7675 449.471 19.184 364.018 51.3512 286.36C83.5184 208.701 137.992 142.325 207.883 95.6254C277.774 48.9258 359.943 24 444 24C528.057 24 610.226 48.9258 680.117 95.6254C750.008 142.325 804.482 208.701 836.649 286.36C868.816 364.018 877.232 449.471 860.834 531.913C844.435 614.355 803.958 690.083 744.52 749.52" stroke="#DCDBE2" stroke-width="32" stroke-linecap="round" />

                        <path
                        d="M143.48 749.52C84.0423 690.083 43.565 614.355 27.1663 531.913C10.7675 449.471 19.184 364.018 51.3512 286.36C83.5184 208.701 137.992 142.325 207.883 95.6254C277.774 48.9258 359.943 24 444 24C528.057 24 610.226 48.9258 680.117 95.6254C750.008 142.325 804.482 208.701 836.649 286.36C868.816 364.018 877.232 449.471 860.834 531.913C844.435 614.355 803.958 690.083 744.52 749.52"
                        stroke="url(#paint0_linear_692_272)" 
                        stroke-width="32" 
                        stroke-linecap="round"
                        strokeDasharray={circumference}
                        strokeDashoffset={offset}
                        />
                        <defs>
                            <linearGradient id="paint0_linear_692_272" x1="170" y1="449" x2="718" y2="449" gradientUnits="userSpaceOnUse">
                                <stop stop-color="#C3ABC2" />
                                <stop offset="1" stop-color="#6AA3EB" />
                            </linearGradient>
                        </defs>
                    </svg>

                </div>
            </div>
        </>
    );
};

export default ScoreCircle;