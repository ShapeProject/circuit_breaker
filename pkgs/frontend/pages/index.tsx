import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useRouter } from 'next/router';
import { useEffect, useState } from "react";
import { useAccount } from 'wagmi';
import { Logomark } from '@/components/logomark';

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
    <div className="w-screen h-screen flex flex-row">
      <div className="w-full relative">
        <div className="relative z-10 h-full px-20 py-10 flex flex-col justify-between xs:px-6 xs:py-6">
          <div>
            <Logomark color='Primary10' />
          </div>
          <div className="h-1/3 flex flex-col justify-between space-y-4 xs:justify-center xs:place-items-center xs:text-center">
            <div>
              <h1 className="text-6xl lg:text-5xl xs:text-4xl">Trusted Score</h1>
            </div>
            <div className="text-2xl font-normal lg:text-base xs:text-sm">
              <div>Your personalized evaluation score.</div>
              <div>And a score that shows how <br className='hidden xs:block' />much you are trusted.</div>
            </div>
            <div className='xs:w-full'>
              <div
              className='[&_button]:font-sans  [&_button]:bg-Primary10 [&_button]:hover:bg-Primary20 [&_button]:active:bg-Primary30 [&_button]:disabled:bg-Primary50 [&_button]:text-white [&_button]:rounded-lg 
              w-fit xs:w-full 
              [&_button]:text-ButtonLg xs:[&_button]:text-ButtonMd
              [&_button]:py-[16px] [&_button]:px-18 
              lg:[&_button]:py-[13px] lg:[&_button]:px-14 
              xs:[&_button]:w-full'>
                <ConnectButton />
              </div>

            </div>
          </div>

          {/* Twitter,GitHub */}
          <div className="flex flex-row space-x-10 lg:space-x-8 xs:justify-center">
            <a href="https://twitter.com/Shape_ProjectJa" target='_blank' className="group">
              <svg
                className="h-10 w-10 fill-Primary10 group-hover:fill-Primary20 group-active:fill-Primary30 group-disabled:fill-Primary50 lg:h-6 lg:w-6"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <use xlinkHref="./icons/social_x_line.svg#social_x_line" />
              </svg>
            </a>

            <a 
              href="https://github.com/ShapeProject/circuit_breaker" 
              target="_blank"
              className="group"
            >
              <svg
                className="h-10 w-10 fill-Primary10 group-hover:fill-Primary20 group-active:fill-Primary30 group-disabled:fill-Primary50 lg:h-6 lg:w-6"
                xmlns="http://www.w3.org.2000/svg"
                viewBox="0 0 24 24"
              >
                <use xlinkHref="./icons/github_2_fill.svg#github_2_fill" />
              </svg>
            </a>
          </div>
        </div>

        <svg
          className="absolute z-0 top-0 right-0 h-full w-auto"
          viewBox="0 0 740 1080"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g filter="url(#filter0_di_349_929)">
            <path
              className='stroke-[105.5px] lg:stroke-[70px]'
              d="M163.753 1275.75C22.9513 1007.88 54.9154 888.589 259.645 917.875C464.375 947.161 496.339 827.869 355.538 560C214.736 292.13 246.7 172.838 451.43 202.124C656.16 231.41 688.124 112.118 547.322 -155.751"
              stroke="#FBFBFB"
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

      <div className="w-1/3 overflow-hidden relative bg-LoginGradient sm:hidden">
        <svg
          id="circle2"
          className="absolute right-0 left-0 top-0 w-[76%] aspect-square mx-auto"
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

        <svg
          id="circle3"
          className="absolute right-0 left-0 bottom-1/4 w-[69%] aspect-square mx-auto"
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

        <svg
          id="circle1"
          className="absolute right-0 left-0 -bottom-1/4 w-full aspect-square mx-auto"
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

        <svg
          id="circle4"
          className="absolute right-0 left-0 top-1/4 w-[29%] aspect-square mx-auto"
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

        <svg
          id="circle5"
          className="absolute right-0 left-0 bottom-0 w-[28%] aspect-square mx-auto"
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
