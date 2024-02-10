import { NavigationSidebar } from "@/components/navigation/navigationSidebar";


export default function MyPage() {
  return (
    <div className="h-screen w-screen flex flex-row">
      <NavigationSidebar />
      <h1>My Page</h1>
      <p>This is my page</p>
    </div>
  );
}
