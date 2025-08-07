import { useLocation, useParams, useNavigate } from 'react-router-dom';
import React, { useState } from "react";
import ThermostatSelector from './thermostatSelector';
import { ExtraObject } from './ExtraObject';
import StepButtons from './StepButtons';
import Navbar from './Navbar';
import BasketPanel from './BasketPannel';
import ReusableButton from './ReusableButton';
import CalendarComponent from './CalendarComponent';
import { PaymentPage } from './PaymentPage';
import ErrorBoundary from './localstoragedata/ErrorBoundary';
import AddressAutoCompleteForm from './AddressAutoCompleteForm';
import ConfirmationPage from './ConfirmationPage';


const BoilerQuoteResults = () => {
    
  const { state } = useLocation();
  const navigate = useNavigate();
  const [currentSet, setCurrentSet] = useState(0);
  const [selectedCards, setSelectedCards] = useState([]);
  const [selectedExtras, setSelectedExtras] = useState([]);
  const [selectedThermostat, setSelectedThermostat] = useState(null);
  const [selectedDate, setSelectedDate] = useState();
  const [referenceCode ,setReferenceCode ] = useState(null);
  const[stepJumper,setStepJumper] = useState(false);
  const[confirmationBtn,setConfirmationBtn] = useState(false);

  //confirmation page elements
  const[payLater,setPayLater] = useState(false);
  const[onePayment,setOnePayment] = useState(false);
  const[installment,setInstallment] = useState(false);

  

  const cardSets = [
    // Set 0
    [
        
      {
        id: 1,
        title: "Card A1",
        component: (
          <ThermostatSelector
          setCurrentSet={setCurrentSet}
            selectedThermostat={selectedThermostat}
            setSelectedThermostat={setSelectedThermostat}
          />
        ),
      },
      {
        id: 2,
        title: "Card A2",
        component: (
          <ExtraObject
          setCurrentSet={setCurrentSet}
            selectedExtras={selectedExtras}
            setSelectedExtras={setSelectedExtras}
          />
        ),
      },
    ],
    // Other sets can have placeholders or other cards
    [
      {
        id: 2,
        title: "Card B1",
        component: (
          <CalendarComponent
            setCurrentSet={setCurrentSet}
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
          />
        ),
      },
    ],
    [
      { id: 4,
        title: "Card C1",
        component:(
          <ErrorBoundary>
            <AddressAutoCompleteForm
            setReferenceCode={setReferenceCode} 
           selectedDate={selectedDate}
          selectedThermostat={selectedThermostat}
          setCurrentSet={setCurrentSet}
          selectedExtras={selectedExtras}
          state={state}
          />
          </ErrorBoundary>
         
        )

      },
      
    ],
    [
      { id: 5, 
       title: "Card D1",
       component:(
        <PaymentPage
        setStepJumper = {setStepJumper}
        setCurrentSet={setCurrentSet}
        setConfirmationBtn = {setConfirmationBtn}
        setPayLater = {setPayLater}
        setOnePayment = {setOnePayment}
        setInstallment = {setInstallment}
        />
      )
     },
      
    ],
    [
      { id: 6, 
       title: "Card E1",
       component:(
         
        <ConfirmationPage 
        referenceCode={referenceCode}
        setStepJumper = {setStepJumper}
        setConfirmationBtn = {setConfirmationBtn}
        payLater = {payLater}

        />
     
       
     )
     },
      
    ]
  ];

  const currentCards = cardSets[currentSet] || [];

  return (
    <>
    <Navbar/>
   
    <div className="lg:flex w-full lg:w-[90%] bg-blue-50 lg:flex-row h-screen m-auto overflow-x-hidden">
    <div className="lg:w-[70%] w-full  flex flex-col overflow-x-hidden ">
    {/* Navigation */}
        <div className=" ml-5 mb-4 h-[5%] flex float-start gap-1 items-center mt-5 bg-transparent ">     
            {/**this is button */}
            
            {!confirmationBtn && (
  <button
    onClick={() => {
      if (currentSet > 0) {
        setCurrentSet((prev) => prev - 1);
      } else {
        navigate(-1); // Go back in history
      }
    }}
    className="flex items-center justify-center gap-1 mr-6 last:mr-0 group"
  >
    {/* Circle with arrow */}
    <div
      className="w-8 h-8 flex items-center justify-center rounded-full text-sm font-semibold bg-gray-300 text-gray-700 opacity-70 group-hover:bg-red-600 hover:bg-red-700 group-hover:text-white transition-all"
    >
      <svg
        className="w-4 h-4"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
      </svg>
    </div>

    {/* Label */}
    <div className="lg:text-2xl lg:mx-4 font-semibold whitespace-nowrap text-black opacity-70 group-hover:opacity-100 transition-opacity">
      Back
    </div>
  </button>
)}


  {/* Vertical <div className="w-0.5 h-10 bg-gray-400 ml-2"></div> line on the right */}
  


<div
  className="   transition-transform duration-300 ease-out pointer-events-none"
  style={{
    transform: `translateX(calc(25% - ${currentSet * 25}%))`,
    
 }}
>
  <StepButtons currentStep={currentSet} />
</div>


        </div>

        {/* Cards */}
        <div className="h-[95%] w-full  p-4 bg-blue-50 overflow-hidden lg: overflow-x-hidden lg:overflow-y-auto md:overflow-hidden">
          <div className="flex gap-4 flex-wrap justify-center">
            {currentCards.map((card) => (
              <div
                key={card.id}
                className="bg-white p-4 rounded shadow w-[100%]"
              >
                
                {card.component ? (
                  card.component
                ) : (
                  <button
                    className="mt-2 bg-green-500 text-white px-4 py-2 rounded"
                    onClick={() =>
                      setSelectedCards((prev) =>
                        prev.find((c) => c.id === card.id)
                          ? prev.filter((c) => c.id !== card.id)
                          : [...prev, card]
                      )
                    }
                  >
                    {selectedCards.find((c) => c.id === card.id)
                      ? "Remove"
                      : "Select"}
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Column */}
      <div className="lg:w-[30%] md:w-full bg-blue-50 p-4 overflow-hidden  z-20">
                <BasketPanel
                 onNextClick={() => handleNextStep()}
                 state={state}
                 selectedCards={selectedCards}
                 setSelectedCards={setSelectedCards}
                 selectedThermostat={selectedThermostat}
                 setSelectedThermostat={setSelectedThermostat}
                 selectedExtras={selectedExtras}
                 setSelectedExtras={setSelectedExtras}
                 selectedDate={selectedDate}
                 setSelectedDate={setSelectedDate}
                 setCurrentSet={setCurrentSet}
                 stepJumper = {stepJumper}
                 confirmationBtn ={confirmationBtn}
               />

      </div>
    </div>
    </>
  );
};

export default BoilerQuoteResults ;


/**import React, { useState } from 'react';
import Navbar from '../ui/BoilerSelectedFun/Navbar';
import StepSlider from '../ui/StepSlider';
import { ChevronLeft } from "lucide-react";
import { useLocation } from "react-router-dom";
import OrderSummaryA from "../ui/BoilerSelectedFun/OrderSummaryA";
import ThemeButton from '../ui/ThemeButton';
import ProductCard from '../ui/ProductCarD';
import ThermostatSelector from './thermostatSelector';








export function BoilerSelected() {
  const[selectedId, setSelectedId] = useState(1);
  const [selectedUpgrades, setSelectedUpgrades] = useState([]);
  const [selectedThermostat, setSelectedThermostat] = useState(null);
 
  // ✅ useLocation at the top level
  const location = useLocation();
  const { title, price, imageUrl } = location.state || {};

 

 

  return (
    <div className="bg-slate-200 overflow-x-hidden">
      <Navbar />
      <div className="flex  justify-center h-screen gap-10 px-[10%]">
        <div className="w-9/12 flex flex-col">
          
          <div className="h-[10%] bg-slate-200 p-2 flex justify-center items-center relative">
            <button
              onClick={() => {}}
              className="absolute left-[9%] z-20 bg-white drop-shadow-lg rounded-full w-12 h-12 flex items-center justify-center"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <StepSlider
              labels={["1", "2", "3", "4", "5"]}
              texts={[
                "Step one example text",
                "Step two example text",
                "Step three example text",
                "Step four example text",
                "Step five example text",
              ]}
              colors={[
                "bg-red-500",
                "bg-green-500",
                "bg-blue-500",
                "bg-yellow-500",
                "bg-purple-500",
              ]}
              startOffsetPercent={30}
            />
          </div>

          
          <div className="h-[90%] bg-white p-2 overflow-auto rounded-lg">
          <ThermostatSelector onSelect={setSelectedThermostat} />
          
          </div>
        </div>

        
        <div className="w-3/12 bg-slate-200 p-4 ">
  
 
   <OrderSummaryA img={imageUrl} title={title} price={price}  selectedThermostate={selectedThermostat}/>

  
   </div>

   

        </div>
      </div>
    
  );
}

export default BoilerSelected;
 



const BoilerQuoteResults = () => {
  const { boilerName } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();
  
  return (
    <div className="container mx-auto px-4 py-8">
      
      <button 
        onClick={() => navigate(-1)}
        className="mb-6 flex items-center text-blue-600 hover:text-blue-800 transition-colors"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
        </svg>
        Back to Boiler Selection
      </button>

      
      <div className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg shadow-sm">
        
        <div className="w-10 h-10 flex-shrink-0">
          <img 
            src={state.boilerImage} 
            alt={state.boilerName}
            className="w-full h-full object-cover"
          />
        </div>
        
     
        <div className="flex-grow">
          <h3 className="font-medium text-gray-900 line-clamp-1">{state.boilerName}</h3>
          <div className="flex justify-between mt-1 text-sm">
            <span className="font-semibold">£{state.boilerPrice.toLocaleString()}</span>
            <span className="text-gray-600">{state.boilerWarranty} warranty</span>
          </div>
        </div>
      </div>

      
    </div>
  );
};

export default BoilerQuoteResults;*/