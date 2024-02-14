import { NavigationSidebar } from "@/components/navigation/navigationSidebar";


export default function MyPage() {
  return (
    <div className="h-screen w-screen flex flex-row">
      <NavigationSidebar />
      <div className="h-full w-full flex flex-row px-10">
        <div className="w-fit rounded-t-2xl flex flex-col space-y-14 px-10 py-14 bg-white shadow-lg">
          <h1 className="text-Title mx-auto">My Page</h1>
          <div className="px-10 py-6 space-y-10">
            <div className="space-y-6 flex flex-col">
              <span className="text-BodyStrong text-Primary40">Total Score</span>
              <span className="w-64 text-BodyMono text-right">1,105</span>
            </div>
            <div className="space-y-6 flex flex-col">
              <span className="text-BodyStrong text-Primary40">Received</span>
              <span className="w-64 text-BodyMono text-right">13</span>
            </div>
          </div>
          <div>★★★★★</div>
        </div>
        <div className="relative p-10 [&_div]:flex [&_div]:justify-center [&_div]:items-center">
          <div className="h-full aspect-square rounded-full bg-Gray30">
            <div className="h-68pct aspect-square rounded-full bg-white shadow-md">
              <div className="h-89pct aspect-square rounded-full border-40 border-Gray20 border-dashed">
                <div className="h-92pct aspect-square rounded-full border-24 border-Gray20">
                <div className="h-92pct aspect-square rounded-full border-12 border-Gray20">
                  <div className="h-92pct aspect-square rounded-full bg-Primary10 shadow-lg">
                    <span className="font-mono text-AvgScore text-white">85</span>
                  </div>
                </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
