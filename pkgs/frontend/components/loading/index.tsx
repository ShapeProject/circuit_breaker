import { OrbitProgress } from "react-loading-indicators";

/**
 * Spinner Component
 * @returns 
 */
const Loading = () => {
    
  return (
    <div className="text-center m-5">
      <OrbitProgress 
        color="#8b31cc" 
        size="large" 
        text="wait...." 
        textColor="" 
      />
    </div>
  );
};

export default Loading;