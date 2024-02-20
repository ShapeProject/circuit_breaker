import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useRouter } from 'next/router';
import { useEffect, useState } from "react";
import { useAccount } from 'wagmi';

/**
 * Login Component
 * @returns 
 */
export default function Login() {
  const [positionY, setPositionY] = useState([0, 0, 0, 0, 0]);
  const [styleId, setStyleId] = useState(["", "", "", "", ""]);
  // アニメーションの遅延
  const [delay] = useState([0, -1, -2, -3, -4]);

  const router = useRouter();
  const account = useAccount();

  useEffect(() => {
    // アニメーションを実行
    const newPositionY = positionY.map(
      () => Math.floor(Math.random() * 50) + 25
    );
    setPositionY(newPositionY);
  }, []);

  useEffect(() => {
    // 古いstyle要素を削除
    styleId.forEach((id) => {
      if (id) {
        const oldStyle = document.getElementById(id);
        if (oldStyle) {
          document.head.removeChild(oldStyle);
        }
      }
    });

    // 新しいstyle要素を作成
    const newStyleId = positionY.map((posY, index) => {
      const style = document.createElement("style");
      style.id = `style-${Date.now()}-${index}`; // id生成

      style.innerHTML = `
        @keyframes bounceY${index + 1} {
          0%, 100% { transform: translateY(-${posY}%); }
          50% { transform: translateY(45%); }
        }

        #circle${index + 1} {
          animation: bounceY${index + 1} 5s ease-in-out infinite;
          animation-delay: ${delay[index]}s;
        }
      `;

      document.head.appendChild(style);
      return style.id;
    });

    setStyleId(newStyleId);
  }, [positionY, delay]);

  useEffect(() => {
    if (account.address != undefined) {
      router.push('/my-page');
    }
  }, [account]);

  return (
    <div className="h-screen w-screen flex flex-row text-Primary10">
      <div className="relative h-full w-full bg-white">
        <div className="relative z-10 h-full px-20 py-10 flex flex-col justify-between">
          <div>
            <a href="#" className="flex flex-row w-fit space-x-6 items-center">
              <svg
                className="h-10 w-10 fill-Primary10"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 40 40"
              >
                <use xlinkHref="/SymbolMark.svg#SymbolMark" />
              </svg>
              <span className="text-2xl font-semibold">Trusted Score</span>
            </a>
          </div>
          <div className="space-y-[6rem]">
            <div className="">
              <h1 className="text-6xl font-medium">Trusted Score</h1>
            </div>
            <div className="text-2xl font-normal">
              <div>Your personalized evaluation score.</div>
              <div>And a score that shows how much you are trusted.</div>
            </div>
            <div>
              <button className="group rounded-lg bg-Primary10 border-2 border-transparent hover:bg-Primary20 active:bg-Primary30 focus-visible:border-black disabled:bg-Primary40">
                <div className="rounded-lg px-18 py-4 border border-transparent group-focus-visible:border-white">
                  <span className="text-base font-semibold text-white">
                    <ConnectButton />
                  </span>
                </div>
              </button>
            </div>
          </div>
          <div className="flex flex-row space-x-6">
            <a href="#" className="group">
              <svg
                className="h-10 w-10 fill-Primary10 group-hover:fill-Primary20 group-active:fill-Primary30 group-disabled:fill-Primary40"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <use xlinkHref="./MCSVG/social_x_line.svg#social_x_line" />
              </svg>
            </a>
            <a href="#" className="group">
              <svg
                className="h-10 w-10 fill-Primary10 group-hover:fill-Primary20 group-active:fill-Primary30 group-disabled:fill-Primary40"
                xmlns="http://www.w3.org.2000/svg"
                viewBox="0 0 24 24"
              >
                <use xlinkHref="./MCSVG/github_2_fill.svg#github_2_fill" />
              </svg>
            </a>
          </div>
        </div>
        <svg className="absolute z-0 top-0 right-0 h-full w-auto"
          viewBox="0 0 740 1080"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g filter="url(#filter0_di_349_929)">
            <path
              d="M163.753 1275.75C22.9513 1007.88 54.9154 888.589 259.645 917.875C464.375 947.161 496.339 827.869 355.538 560C214.736 292.13 246.7 172.838 451.43 202.124C656.16 231.41 688.124 112.118 547.322 -155.751"
              stroke="#FBFBFB"
              stroke-width="105.5"
            />
          </g>
          <defs>
            <filter
              id="filter0_di_349_929"
              x="0.939819"
              y="-220.295"
              width="741.195"
              height="1560.59"
              filterUnits="userSpaceOnUse"
              color-interpolation-filters="sRGB"
            >
              <feFlood flood-opacity="0" result="BackgroundImageFix" />
              <feColorMatrix
                in="SourceAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                result="hardAlpha"
              />
              <feOffset dx="16" />
              <feGaussianBlur stdDeviation="20" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix
                type="matrix"
                values="0 0 0 0 0.211765 0 0 0 0 0.172549 0 0 0 0 0.286275 0 0 0 0.16 0"
              />
              <feBlend
                mode="normal"
                in2="BackgroundImageFix"
                result="effect1_dropShadow_349_929"
              />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="effect1_dropShadow_349_929"
                result="shape"
              />
              <feColorMatrix
                in="SourceAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                result="hardAlpha"
              />
              <feOffset dy="4" />
              <feGaussianBlur stdDeviation="2" />
              <feComposite
                in2="hardAlpha"
                operator="arithmetic"
                k2="-1"
                k3="1"
              />
              <feColorMatrix
                type="matrix"
                values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"
              />
              <feBlend
                mode="normal"
                in2="shape"
                result="effect2_innerShadow_349_929"
              />
            </filter>
          </defs>
        </svg>
      </div>

      <div className="h-full w-1/3 overflow-hidden relative bg-gradient-to-tl from-blue-400 to-pink-700">

        <svg className="absolute right-0 left-0 top-0 w-[76%] aspect-square mx-auto"
          id="circle2"
          
          width="466"
          height="466"
          viewBox="0 0 466 466"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            cx="233"
            cy="233"
            r="233"
            fill="url(#paint0_linear_483_262)"
            fill-opacity="0.8"
          />
          <defs>
            <linearGradient
              id="paint0_linear_483_262"
              x1="4.16636e-05"
              y1="-1.38879e-05"
              x2="466"
              y2="466"
              gradientUnits="userSpaceOnUse"
            >
              <stop stop-color="white" />
              <stop offset="0.48" stop-color="#AE9EAC" />
              <stop offset="1" stop-color="#A3A2FF" />
            </linearGradient>
          </defs>
        </svg>
        <svg className="absolute right-0 left-0 bottom-1/4 w-[69%] aspect-square mx-auto"
          id="circle3"
          width="420"
          height="420"
          viewBox="0 0 420 420"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            cx="210"
            cy="210"
            r="210"
            fill="url(#paint0_linear_483_261)"
            fill-opacity="0.8"
          />
          <defs>
            <linearGradient
              id="paint0_linear_483_261"
              x1="3.75509e-05"
              y1="-1.2517e-05"
              x2="420"
              y2="420"
              gradientUnits="userSpaceOnUse"
            >
              <stop stop-color="white" />
              <stop offset="0.48" stop-color="#AE9EAC" />
              <stop offset="1" stop-color="#A3A2FF" />
            </linearGradient>
          </defs>
        </svg>
        <svg className="absolute right-0 left-0 -bottom-1/4 w-full aspect-square mx-auto"
          id="circle1"
          width="610"
          height="610"
          viewBox="0 0 610 610"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            cx="305"
            cy="305"
            r="305"
            fill="url(#paint0_linear_483_255)"
          />
          <defs>
            <linearGradient
              id="paint0_linear_483_255"
              x1="5.45382e-05"
              y1="-1.81794e-05"
              x2="610"
              y2="610"
              gradientUnits="userSpaceOnUse"
            >
              <stop stop-color="white" />
              <stop offset="0.5" stop-color="#C1ABC4" stop-opacity="0.6" />
              <stop offset="1" stop-color="#C3C1FF" stop-opacity="0.16" />
              <stop offset="1" stop-color="#C3C1FF" stop-opacity="0.16" />
            </linearGradient>
          </defs>
        </svg>
        <svg className="absolute right-0 left-0 top-1/4 w-[29%] aspect-square mx-auto"
          id="circle4"
          
          width="176"
          height="176"
          viewBox="0 0 176 176"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            cx="88"
            cy="88"
            r="88"
            fill="url(#paint0_linear_483_263)"
            fill-opacity="0.8"
          />
          <defs>
            <linearGradient
              id="paint0_linear_483_263"
              x1="1.57356e-05"
              y1="-5.24521e-06"
              x2="176"
              y2="176"
              gradientUnits="userSpaceOnUse"
            >
              <stop stop-color="white" />
              <stop
                offset="0.566014"
                stop-color="#AE9EAC"
                stop-opacity="0.64"
              />
              <stop offset="1" stop-color="#C7C6FF" />
            </linearGradient>
          </defs>
        </svg>
        <svg className="absolute right-0 left-0 bottom-0 w-[28%] aspect-square mx-auto"
          id="circle5"
          width="168"
          height="168"
          viewBox="0 0 168 168"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            opacity="0.6"
            cx="84"
            cy="84"
            r="84"
            fill="url(#paint0_linear_483_265)"
          />
          <defs>
            <linearGradient
              id="paint0_linear_483_265"
              x1="168"
              y1="-1.00136e-05"
              x2="1.00136e-05"
              y2="168"
              gradientUnits="userSpaceOnUse"
            >
              <stop stop-color="white" />
              <stop offset="1" stop-color="#A3A2FF" />
            </linearGradient>
          </defs>
        </svg>

      </div>
    </div>
  );
}
