import { NavigationSidebar } from "@/components/navigation/navigationSidebar";
import Input from "@/components/input/input";

export default function Evaluate() {
  return (
    <div className="h-screen w-screen flex flex-row bg-white">
      <NavigationSidebar />
      <div className="h-full w-full px-10 py-20 bg-white ">
        <div className="h-full w-full rounded-2xl flex flex-col justify-between py-20 text-center shadow-lg">
          <h1 className="text-Primary10 text-Title">Send an evaluate</h1>

          <div className="w-fit m-auto space-y-24">
            <Input
              labelText="Address"
              id="Address"
              type="text"
              autoCorrect="off"
              autoCapitalize="off"
              autoComplete="off"
              icon="AddressIcon"
            />
            <Input
              labelText="Score"
              id="Score"
              type="text"
              autoCorrect="off"
              autoCapitalize="off"
              autoComplete="off"
              icon="ScoreIcon"
            />
          </div>

          <div>
            <button className="group rounded-lg bg-Primary10 border-2 border-transparent hover:bg-Primary20 active:bg-Primary30 focus-visible:border-black disabled:bg-Primary50">
              <div className="rounded-lg px-18 py-4 border border-transparent group-focus-visible:border-white">
                <span className="text-Button text-white">Send</span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
