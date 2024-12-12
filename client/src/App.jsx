import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import HomePage from "./page/HomePage";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="pb-0 relative bg-custom h-screen flex flex-col  px-5 p-32 lg:pb-0 lg:p-32 overflow-hidden">
      <div className="h-full w-full  flex flex-col gap-5">
        <div className="absolute -top-32 right-0 transform rotate-[45deg] ">
          <div className=" h-52 w-52 rounded-lg lg:rounded-3xl  bg-[#414545] bg-dotted bg-dots">
            <div className="flex  justify-center items-center "></div>
          </div>
        </div>
        <div className="w-full h-full flex flex-col overflow-auto rounded-lg lg:rounded-t-3xl bg-[#414545] bg-dotted bg-dots">
          <div className="flex gap-5 items-center justify-center ">
            <img src="/assets/logo.svg" className=" mt-20 h-6 " alt="" />
            <img
              src="/assets/sortit.svg"
              className=" mt-20 h-8 " 
              alt=""
            />
          </div>
          <div className="flex mb-10  w-full flex-1 justify-center items-center ">
            <HomePage />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
