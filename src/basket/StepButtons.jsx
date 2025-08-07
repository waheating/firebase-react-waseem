import React from 'react';

const steps = [
  'Upgrades',
  'Select install date',
  'Contact details',
  'Payment',
  'Confirmation',
];
const StepButtons = ({ currentStep }) => {
  return (
    <div className="py-2 no-scrollbar">
      <div className="flex items-center min-w-max px-1 sm:px-4">
        {steps.map((step, index) => {
          const isActive = index === currentStep;

          return (
            <React.Fragment key={index}>
              <div className="flex items-center">
                {/* Circle - scales down on small screens */}
                <div
                  className={`w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center rounded-full text-xs sm:text-sm font-semibold shrink-0 ${
                    isActive
                      ? 'bg-red-600 text-white opacity-100'
                      : 'bg-gray-300 text-gray-700 opacity-20'
                  }`}
                >
                  {index + 1}
                </div>

                {/* Label - scales down and truncates on small screens */}
                <div
                  className={`text-xs sm:text-sm font-semibold whitespace-nowrap transition-opacity duration-200 mx-1 sm:mx-2 max-w-[90px] sm:max-w-none ${
                    isActive
                      ? 'text-gray-700 opacity-100'
                      : 'text-gray-700 opacity-20'
                  }`}
                >
                  {step}
                </div>
              </div>

              {/* Separator - scales down on small screens */}
              {index < steps.length - 1 && (
                <div className="w-4 sm:w-8 md:w-10 h-0.5 bg-gray-400 mx-1 sm:mx-2"></div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

// Add this to your global CSS to hide scrollbar while keeping functionality
// .no-scrollbar::-webkit-scrollbar {
//   display: none;
// }
// .no-scrollbar {
//   -ms-overflow-style: none;
//   scrollbar-width: none;
// }

export default StepButtons;