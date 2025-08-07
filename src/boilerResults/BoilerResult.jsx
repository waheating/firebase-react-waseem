import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import BestSellersList from "./BestSellersList";
//import Navbar from "../basket/Navbar";

  
export default function BoilerResult() {
  const [loading, setLoading] = useState(true);
  const [showText, setShowText] = useState({ step1: false, step2: false });
  const [fadeIn, setFadeIn] = useState(false);

  const location = useLocation();
  const [answers, setAnswers] = useState({});
  const [steps, setSteps] = useState([]);

  useEffect(() => {
    const storedAnswers = localStorage.getItem("boilerAnswers");
    const storedSteps = localStorage.getItem("boilerSteps");

    if (location.state?.answers) {
      setAnswers(location.state.answers);
    } else if (storedAnswers) {
      setAnswers(JSON.parse(storedAnswers));
    }

    if (storedSteps) {
      setSteps(JSON.parse(storedSteps));
    }

    // Animation delays
    const t1 = setTimeout(() => setShowText((prev) => ({ ...prev, step1: true })), 1000);
    const t2 = setTimeout(() => setShowText((prev) => ({ ...prev, step2: true })), 2500);
    const t3 = setTimeout(() => {
      setLoading(false);
      setTimeout(() => setFadeIn(true), 200);
    }, 3500);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  if (loading) {
    return (
        <div className="flex items-center justify-center h-screen bg-gray-50">
      <div className="bg-white border border-gray-300 shadow-lg rounded-xl px-8 py-6 text-center space-y-4 w-full max-w-md">
      <svg
            className="animate-spin h-16 w-16 text-orange-500 mx-auto"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v8H4z"
            ></path>
          </svg>
          
          <div className="text-lg space-y-2 transition-opacity duration-700">
            {showText.step1 && (
              <p className="text-indigo-600 font-medium">
                Boiler is being Selected...
              </p>
            )}
            {showText.step2 && (
              <p className="text-emerald-600 font-medium">
                Price is being Calculated...
              </p>
            )}
          </div>
        </div>
      </div>
    );
  }

  
  return (
    <>
   
    <div
  className={`max-w-6xl mx-auto  p-4 transition-opacity duration-700 ${
    fadeIn ? "opacity-100" : "opacity-0"
  }`}
>
  {/* Responsive Boiler Catalog Section */}
 
  <div className="">
    
      <BestSellersList data={answers} />
    </div>
  {/* Quote Breakdown Section */}
  <div className=" bg-gray-50 border rounded-lg shadow-md p-6">
    <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-6">
      Boiler Quote Breakdown
    </h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {steps.map((step, index) => {
        const value = answers[step.key];
        if (!value) return null;

        return (
          <div
            key={step.key}
            className="bg-white border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
          >
            <p className="text-sm font-medium text-gray-600">
              {step.question}
            </p>
            <p className="text-base font-semibold text-gray-800 mt-1">
              {value}
            </p>
          </div>
        );
      })}
    </div>
  </div>
</div>
</>
  );
   
  
}
