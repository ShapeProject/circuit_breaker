export default function Login() {
  return (
    <div className="h-screen w-screen flex flex-row text-black">
      <div className="h-full w-5/6">
        <div className="h-full px-20 py-10 flex flex-col justify-between">
          <div>
            <a href="#" className="flex flex-row space-x-6 items-center">
              <svg
                className="h-10 w-10 fill-black"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 40 40"
              >
                <use xlinkHref="/SymbolMark.svg#SymbolMark" />
              </svg>
              <span className="text-2xl font-semibold">Trusted Score</span>
            </a>
          </div>
          <div className="space-y-26">
            <div className="">
              <h1 className="text-6xl font-medium">Trusted Score</h1>
            </div>
            <div className="text-2xl font-normal">
              <div>Your personalized evaluation score.</div>
              <div>And a score that shows how much you are trusted.</div>
            </div>
            <div className="size-fit text-base font-semibold text-white">
              <a
                href="#"
                className="inline-block bg-black rounded-lg"
              >
                <div className="px-18 py-6 rounded-lg">
                <span>Connect Wallet</span>
                </div>
              </a>
            </div>
          </div>
          <div className="flex flex-row space-x-6">
            <a href="#" className="inline-block">
              <svg
                className="h-10 w-10 fill-black"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <use xlinkHref="./MCSVG/social_x_line.svg#social_x_line" />
              </svg>
            </a>
            <a href="#">
              <svg
                className="h-10 w-10 fill-black"
                xmlns="http://www.w3.org.2000/svg"
                viewBox="0 0 24 24"
              >
                <use xlinkHref="./MCSVG/github_2_fill.svg#github_2_fill" />
              </svg>
            </a>
          </div>
        </div>
      </div>
      <div className="h-full w-1/3 bg-gradient-to-tl from-blue-400 to-pink-700"></div>
    </div>
  );
}
