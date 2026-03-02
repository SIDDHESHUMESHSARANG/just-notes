import Navbar from "../components/Navbar";
import { Link } from "react-router";
import { CornerDownRight } from "lucide-react";
import { useEffect, useState } from "react";

const LandingPage = () => {
  const [index, setIndex] = useState(0);
  const wordsArr = ['Aspire', 'Inspire', 'Transpire'];

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % wordsArr.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [wordsArr.length]);

  return (
    <div className="min-h-screen flex flex-col bg-base-100">
      <main className="flex-grow flex flex-col items-center justify-center px-4 text-center bg-grid bg-grid-lg">
        <h1 className="text-5xl md:text-[80px] font-bold tracking-tighter flex flex-col items-center leading-tight">
          <span className="words text-outline h-[1.2em] md:h-[1.1em] flex items-center justify-center duration-1000 mb-2">
            {wordsArr[index]}
          </span>
          <div className="flex flex-wrap items-center justify-center gap-1 md:gap-4">
            <span className="text-[#404040]">With</span>
            <span className="bg-gradient-to-br from-red-500 via-red-600 to-red-900 bg-clip-text text-transparent">
              Just Notes
            </span>
          </div>
        </h1>
        
        <div className="flex flex-col gap-2 mt-6">
          <p className="text-gray-500 text-lg md:text-xl font-medium">
            The <span className="text-red-600">most direct</span> platform for your notes.
          </p>

          <p className="text-gray-500 mb-10 text-lg md:text-xl font-medium">
            Made by <span className="text-red-600">Siddhesh Umesh Sarang</span>
          </p>
        </div>

        <div className="flex md:flex-row flex-col gap-5">
          <Link to={"/home"} className="btn btn-primary btn-md md:btn-lg px-8 md:px-10 rounded-full text-white shadow-xl">
            Get Started <CornerDownRight />
          </Link>

          <Link to={"https://siddheshumeshsarang.web.app"} className="btn btn-outline btn-sm md:btn-lg px-8 md:px-10 rounded-full shadow-xl">
            Contact Developer<CornerDownRight />
          </Link>
        </div>
      </main>
    </div>
  );
};

export default LandingPage;