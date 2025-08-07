import React, { useEffect } from "react";

export const PaymentPage = ({ setStepJumper, setCurrentSet, setConfirmationBtn, setPayLater, setOnePayment, setInstallment }) => {


     useEffect(()=>{
      setStepJumper(true);
      setConfirmationBtn(false);

     });

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Choose your payment option</h2>
      
      <div className="space-y-4">
        {/* Pay Now Option onClick={() => setCurrentSet("payNow") */}
        <div 
          className="p-5 border-2 border-blue-500 rounded-lg cursor-pointer hover:bg-blue-50 transition-colors"
        
        >
          <div className="flex items-center">
            <div className="bg-blue-100 p-3 rounded-full mr-4">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">Pay Now</h3>
              <p className="text-sm text-gray-500">One-off Payment</p>
            </div>
          </div>
        </div>

        {/* Pay Later Option */}
        <div 
          className="p-5 border-2 border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
          onClick={() => {
            setCurrentSet(prev => Math.min(prev + 1));
            setPayLater(true);
            setOnePayment(false);
            setInstallment(false);
          }}
          
        >
          <div className="flex items-center">
            <div className="bg-gray-100 p-3 rounded-full mr-4">
              <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">Pay Later</h3>
              <p className="text-sm text-gray-500">Pay Later</p>
            </div>
          </div>
        </div>

        {/* Pay Monthly Option */}
        <div 
          className="p-5 border-2 border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
         
        >
          <div className="flex items-center">
            <div className="bg-gray-100 p-3 rounded-full mr-4">
              <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">Pay Monthly</h3>
              <p className="text-sm text-gray-500">Spread your payments over 12 months</p>
            </div>
          </div>
        </div>
      </div>

     
    </div>
  );
};