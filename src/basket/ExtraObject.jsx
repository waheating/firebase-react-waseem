import React from "react";
import ReusableButton from "./ReusableButton";


const options = [
  { id: 4, name: "Lime Scale Reducer", price: 50, img: "/logo192.png" },
  {
    id: 5,
    name: "Advance Flush System, Power Flush",
    price: 229.0,
    img: "/logo192.png",
  },
  {
    id: 6,
    name: "Thermostatic Radiator Valve",
    price: 40,
    img: "/logo192.png",
  },
];

export const ExtraObject = ({ selectedExtras, setSelectedExtras, setCurrentSet  }) => {
  const toggleExtra = (extra) => {
    const exists = selectedExtras.find((e) => e.id === extra.id);
    if (exists) {
      setSelectedExtras((prev) => prev.filter((e) => e.id !== extra.id));
    } else {
      setSelectedExtras((prev) => [
        ...prev,
        { ...extra, quantity: extra.id === 6 ? 1 : undefined },
      ]);
    }
  };

  const updateQuantity = (id, change) => {
    setSelectedExtras((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: Math.max((item.quantity || 1) + change, 1),
            }
          : item
      )
    );
  };

  return (
    <>
    <div
  className="flex justify-between items-center p-4 rounded-md shadow-sm"
  style={{ backgroundColor: '#00A69C' }}
>
<h3 className=" text-white  text-xl ">Upgrade</h3>

  <ReusableButton
    onClick={() => setCurrentSet(prev => Math.min(prev + 1))}
    label="Next"
    color="blue" // Assuming ReusableButton supports color prop styling
    
    
  />
</div>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {options.map((extra) => {
        const isSelected = selectedExtras.find((e) => e.id === extra.id);
        const quantity = isSelected?.quantity || 1;

        return (
          <div
            key={extra.id}
            className={`flex flex-col h-full bg-white rounded-xl shadow-md  border-2 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg ${
              isSelected ? "border-[#00a69c]" : "border-gray-100"
            }`}
          >
            <div className="h-48 bg-[#f7f9fa] flex items-center justify-center p-4">
              <img
                src={extra.img}
                alt={extra.name}
                className="h-full object-contain"
              />
            </div>

            <div className="p-6 flex flex-col flex-grow">
              <div className="flex-grow">
                <h4 className="text-lg font-bold text-[#2d3748] mb-2">
                  {extra.name}
                </h4>
                <p className="text-[#00a69c] font-bold text-xl mb-4">
                  £{extra.price.toFixed(2)}
                </p>

                {extra.id === 6 && isSelected && (
                  <div className="flex justify-center items-center gap-4 mb-6">
                    <button
                      onClick={() => updateQuantity(extra.id, -1)}
                      className="w-8 h-8 bg-[#e2e8f0] text-[#2d3748] rounded-full hover:bg-[#cbd5e0] transition-colors duration-200 flex items-center justify-center"
                    >
                      −
                    </button>
                    <span className="font-semibold text-lg w-8 text-center">
                      {quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(extra.id, 1)}
                      className="w-8 h-8 bg-[#e2e8f0] text-[#2d3748] rounded-full hover:bg-[#cbd5e0] transition-colors duration-200 flex items-center justify-center"
                    >
                      +
                    </button>
                  </div>
                )}
              </div>

              <button
                onClick={() => toggleExtra(extra)}
                className={`mt-auto w-full py-3 px-4 rounded-md font-semibold text-white transition-all duration-200 ${
                  isSelected
                    ? "bg-[#e53e3e] hover:bg-[#c53030]"
                    : "bg-[#00a69c] hover:bg-[#00857c]"
                }`}
              >
                {isSelected ? "Remove" : "Add to order"}
              </button>
            </div>
          </div>
        );
      })}
    </div>
    </>
  );
};