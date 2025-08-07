import React, { useEffect } from "react";
import ReusableButton from "./ReusableButton";


const thermostatOptions = [
  {
    id: 1,
    name: "ESI Wireless Thermostat",
    price: null,
    img: "/thermostat/esi.jpg",
  },
  {
    id: 2,
    name: "Hive Smart Thermostat",
    price: 229.0,
    img: "/logo512.png",
  },
  {
    id: 3,
    name: "Re-connect Existing Controls",
    price: null,
    img: "/logo192.png",
  },
];

const ThermostatSelector = ({ selectedThermostat, setSelectedThermostat, setCurrentSet }) => {
  useEffect(() => {
    if (!selectedThermostat) {
      const defaultThermostat = thermostatOptions.find((t) => t.id === 1);
      setSelectedThermostat(defaultThermostat);
    }
  }, [selectedThermostat, setSelectedThermostat]);

  const toggleThermostat = (option) => {
    if (selectedThermostat?.id === option.id) {
      setSelectedThermostat(null);
    } else {
      setSelectedThermostat(option);
    }
  };

  return (
    <>
      {/* Header with title and button */}
      <div
  className="flex justify-between items-center p-4 rounded-md shadow-sm"
  style={{ backgroundColor: '#00A69C' }}
>
<h3 className=" text-white  text-xl ">Thermostate</h3>

  <ReusableButton
    onClick={() => setCurrentSet(prev => Math.min(prev + 1))}
    label="Next"
    color="blue" // Assuming ReusableButton supports color prop styling
    
  />
</div>

      {/* Card Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
        {thermostatOptions.map((option) => {
          const isSelected = selectedThermostat?.id === option.id;

          return (
            <div
              key={option.id}
              className={`flex flex-col h-full bg-white rounded-lg shadow-sm border-2 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-md ${
                isSelected ? "border-[#00a69c]" : "border-gray-100"
              }`}
            >
              <div className="h-40 sm:h-48 md:h-56 flex items-center justify-center p-4">
                <img
                  src={option.img}
                  alt={option.name || "Thermostat Image"}
                  className="h-full w-full object-contain"
                />
              </div>

              <div className="p-4 sm:p-6 flex flex-col flex-grow">
                <div className="flex-grow">
                  <h4 className="text-base sm:text-lg md:text-xl font-bold text-[#2d3748] mb-2">
                    {option.name}
                  </h4>
                  <p className="text-[#00a69c] font-bold text-lg sm:text-xl md:text-2xl mb-4">
                    {option.price === 0
                      ? "Free"
                      : option.price !== null
                      ? `£${option.price.toFixed(2)}`
                      : ""}
                  </p>
                </div>

                <button
                  onClick={() => toggleThermostat(option)}
                  className={`mt-auto w-full py-2 sm:py-3 px-4 rounded-md font-semibold text-white transition-all duration-200 text-sm sm:text-base ${
                    isSelected
                      
                      ? "bg-[#2d3748] hover:bg-[#1a202c]"
                      : "bg-[#00a69c] hover:bg-[#00857c]"
                  }`}
                >
                  {isSelected ? "Selected" : "Select"}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default ThermostatSelector;