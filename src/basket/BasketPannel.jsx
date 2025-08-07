import React, { useState, useEffect } from 'react';
import { FaShoppingBasket } from 'react-icons/fa';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';

const BasketPanel = ({
  state,
  selectedCards = [],
  setSelectedCards,
  selectedThermostat,
  setSelectedThermostat,
  selectedExtras = [],
  setSelectedExtras,
  selectedDate = null,
  setSelectedDate,
  onNextClick = () => {},
  setCurrentSet,
  stepJumper,
  confirmationBtn,
}) => {
  const [isMobileBasketOpen, setMobileBasketOpen] = useState(false);

  // Set default thermostat if none is selected
  useEffect(() => {
    if (!selectedThermostat) {
      setSelectedThermostat({
        id: 1,
        name: "EPH Wireless Thermostat",
        price: null,  // This will show as "Included"
        img: "../boilerImages/alpha.png"
      });
    }
  }, [selectedThermostat, setSelectedThermostat]);

  // Calculate thermostat count (always at least 1)
  const thermostatCount = selectedThermostat ? 10 : 0;
  const itemCount =
    selectedCards.length +
    selectedExtras.length +
    thermostatCount + // Always includes thermostat
    (selectedDate ? 1 : 0);

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="lg:w-full bg-[#f7f9fa] p-6 overflow-y-auto hidden lg:block sticky top-0 h-screen">
        <h2 className="text-xl font-bold mb-4">Your Basket ({itemCount})</h2>
        <BasketContent
          state={state}
          selectedCards={selectedCards}
          setSelectedCards={setSelectedCards}
          selectedThermostat={selectedThermostat}
          setSelectedThermostat={setSelectedThermostat}
          selectedExtras={selectedExtras}
          setSelectedExtras={setSelectedExtras}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          setCurrentSet ={setCurrentSet}
          stepJumper ={stepJumper}
          confirmationBtn={ confirmationBtn}
        />
      </div>

      {/* Mobile Footer */}
      <div className="lg:hidden fixed bottom-0 opacity-90 left-0 w-full bg-white border-t border-gray-200 z-30 flex justify-between items-center px-4 py-3 shadow-lg">
        <div className="flex items-center">
          <div className="relative mr-2">
            <FaShoppingBasket className="text-xl text-[#00a69c]" />
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
              {itemCount}
            </span>
          </div>
          <span className="font-medium">Basket ({itemCount})</span>
        </div>

        <div className="flex gap-2">
          <button
            className="bg-gray-200 hover:bg-gray-300 px-3 py-2 rounded-lg transition-colors"
            onClick={() => setMobileBasketOpen(true)}
          >
            View
          </button>
         
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileBasketOpen && (
        <div className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40">
          <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl p-4 max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Your Basket ({itemCount})</h2>
              <button 
                className="text-2xl"
                onClick={() => setMobileBasketOpen(false)}
              >
                &times;
              </button>
            </div>
            <BasketContent
              state={state}
              selectedCards={selectedCards}
              setSelectedCards={setSelectedCards}
              selectedThermostat={selectedThermostat}
              setSelectedThermostat={setSelectedThermostat}
              selectedExtras={selectedExtras}
              setSelectedExtras={setSelectedExtras}
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
              setCurrentSet ={setCurrentSet}
              stepJumper = {stepJumper}
              confirmationBtn={ confirmationBtn}
            />
          </div>
        </div>
      )}
    </>
  );
};

const BasketContent = ({
  state,
  selectedCards,
  setSelectedCards,
  selectedThermostat,
  setSelectedThermostat,
  selectedExtras,
  setSelectedExtras,
  selectedDate,
  setSelectedDate,
  setCurrentSet,
  stepJumper,
  confirmationBtn,
}) => {
  const [isAccordionOpen, setAccordionOpen] = useState(false);

  // Included items data
  const includedItems = [
    { id: 1, name: "System Flush", img: "/logo.png" },
    { id: 2, name: "Magnetic Filter", img: "/logo.png" },
    { id: 3, name: "Chemical Inhibitor", img: "/logo.png" },
    { id: 4, name: "TRV Valves", img: "/logo.png" },
    { id: 5, name: "Limescale Preventer", img: "/logo.png" },
    { id: 6, name: "10 Year Warranty", img: "/logo.png" }
  ];

  // Calculate total price
  const calculateTotal = () => {
    let total = 0;
    
    // Add boiler price if available
    if (state.boilerPrice) {
      total += parseFloat(state.boilerPrice);
    }
    
    // Add thermostat price if available and not included
    if (selectedThermostat?.price) {
      total += parseFloat(selectedThermostat.price);
    }
    
    // Add extras prices
    selectedExtras.forEach(extra => {
      const quantity = extra.quantity || 1;
      total += parseFloat(extra.price) * quantity;
    });
    
    return total;
  };

  const totalPrice = calculateTotal();

  return (
    <div className="space-y-4">
      {/* Boiler Item */}
      <div className="flex items-center gap-4 p-4 bg-white rounded-lg shadow">
        <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
          <img 
            src={state.boilerImage} 
            alt={state.boilerName}
            className="h-10 object-contain"
          />
        </div>
        <div>
          <h3 className="font-semibold">{state.boilerName}</h3>
          <div className="flex justify-between mt-1">
            <span className="font-bold text-blue-600">£{state.boilerPrice?.toLocaleString()}</span>
            <span className="text-blue-600 text-sm">Warranty: {state.boilerWarranty}</span>
          </div>
        </div>
      </div>

      {/* Thermostat - Always shown */}
      <div className="bg-white rounded-lg shadow p-4">
        <div className="flex justify-between items-center">
          <div>
            <p className="font-medium">
              {selectedThermostat?.name || "Thermostat"}
            </p>
            <p className="text-sm text-blue-600">
              {selectedThermostat?.price ? `£${selectedThermostat.price.toFixed(2)}` : "Included"}
            </p>
          </div>
          {selectedThermostat?.id !== 1 && !confirmationBtn && (
  <button 
    className="text-red-500"
    onClick={() => setSelectedThermostat({
      id: 1,
      name: "iHeat Wireless Thermostat",
      price: null,
      img: "../boilerImages/alpha.png"
    })}
  >
    &times;
  </button>
)}

        </div>
      </div>

      {/* Selected Cards */}
      {selectedCards.length > 0 && (
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="font-semibold mb-2">Selected Cards ({selectedCards.length})</h3>
          {selectedCards.map(card => (
            <div key={card.id} className="flex justify-between items-center py-2">
              <span>{card.title}</span>
              {!confirmationBtn && (
  <button 
    className="text-red-500"
    onClick={() => setSelectedCards(prev => prev.filter(c => c.id !== card.id))}
  >
    &times;
  </button>
)}
            </div>
          ))}
        </div>
      )}

      {/* Selected Extras */}
      {selectedExtras.length > 0 && (
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="font-semibold mb-2">Selected Extras ({selectedExtras.length})</h3>
          {selectedExtras.map(extra => (
            <div key={extra.id} className="flex justify-between items-center py-2">
              <div>
                <p className="font-medium">{extra.name}</p>
                <p className="text-sm text-blue-600">
                  £{extra.price}{extra.quantity ? ` × ${extra.quantity}` : ''}
                </p>
              </div>
              {!confirmationBtn && (
  <button 
    className="text-red-500"
    onClick={() => setSelectedExtras(prev => prev.filter(e => e.id !== extra.id))}
  >
    &times;
  </button>
)}

            </div>
          ))}
        </div>
      )}

      {/* Selected Date */}
      {selectedDate && (
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex justify-between items-center py-2">
            <div>
              <p className="font-medium">Installation Date</p>
              <p className="text-sm text-gray-700">
                {selectedDate.toLocaleDateString('en-GB', {
                  weekday: 'long',
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric'
                })}
              </p>
            </div>
            {!confirmationBtn && (
  <button
    className="text-red-500 text-xl font-bold hover:text-red-700 transition"
    onClick={() => {
      setSelectedDate(null);

      if (setCurrentSet && stepJumper) {
        setCurrentSet(prev => Math.max(prev - 2, 0));
      } else {
        setCurrentSet(prev => Math.max(prev - 1, 0));
      }
    }}
    aria-label="Cancel selected date"
  >
    &times;
  </button>
)}

          </div>
        </div>
      )}

      {/* Extra Items Included Accordion */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <button
          className="w-full flex justify-between items-center p-4 text-left"
          onClick={() => setAccordionOpen(!isAccordionOpen)}
        >
          <span className="font-semibold">Extra Items Included</span>
          {isAccordionOpen ? <FiChevronUp /> : <FiChevronDown />}
        </button>
        
        {isAccordionOpen && (
          <div className="p-4 border-t">
            <div className="grid grid-cols-2 gap-4">
              {includedItems.map(item => (
                <div key={item.id} className="flex items-center space-x-3">
                  <div className="w-8 h-8 flex-shrink-0 bg-gray-100 rounded flex items-center justify-center">
                    <img src={item.img} alt={item.name} className="h-6 w-6 object-contain" />
                  </div>
                  <span className="text-sm">{item.name}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Total Price */}
      <div className="bg-white rounded-lg shadow p-4 border-t-2 border-blue-500">
        <div className="flex justify-between items-center">
          <p className="font-bold text-lg">Total</p>
          <p className="font-bold text-blue-600 text-xl">£{totalPrice.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
        </div>
      </div>
    </div>
  );
};

export default BasketPanel;