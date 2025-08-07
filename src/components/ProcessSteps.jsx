import React from "react";

const ProcessSteps = () => {
  const steps = [
    {
      id: 1,
      title: "Your Answers",
      description: "Answer questions about your home to get a fixed-price quote.",
      icon: "/frontpagephotos/question.png",
    },
    {
      id: 2,
      title: "Choose a Boiler",
      description: "Compare brands, models, and payment options (upfront or instalments).",
      icon: "/frontpagephotos/chooseboiler.jpg",
    },
    {
      id: 3,
      title: "Choose Installation Date ",
      description: "Next-day installation by qualified and experienced engineer.",
      icon: "/frontpagephotos/thirdimg.jpeg",
    },
  ];

  return (
    <div className="p-8 md:p-12 rounded-lg">
      <h2 className="text-3xl md:text-4xl text-gray-400 text-center mb-10 md:mb-16 ">
        Get a fixed online price instantly, no salesperson needed
      </h2>
      
      <div className="flex flex-col items-center justify-center gap-8 lg:flex-row lg:gap-12">
        {steps.map((step, index) => (
          <React.Fragment key={step.id}>
            <div 
              className={`flex flex-col items-center text-center max-w-sm p-6 md:p-8 rounded-xl hover:shadow-md transition-all ${
                step.id === 2 ? "bg-[#e6e3ea]" : "bg-white"
              }`}
            >
              {/* Make image larger only for id: 2 */}
              <img 
                src={step.icon} 
                alt={step.title} 
                className={`mb-6 object-contain ${
                  step.id === 2 ? "w-32 h-32 md:w-40 md:h-40" : "w-24 h-24 md:w-32 md:h-32"
                }`}
              />
              <h3 className="font-bold text-xl md:text-2xl mb-2 text-gray-800">{step.title}</h3>
              <p className="text-md md:text-lg text-gray-600">{step.description}</p>
            </div>

            {/* Arrow - shows down arrow on medium and below, right arrow on large and above */}
            {index < steps.length - 1 && (
              <div className="text-3xl md:text-4xl text-orange-500 my-4 lg:my-0 lg:mx-4">
                <span className="lg:hidden">↓</span>
                <span className="hidden lg:inline">→</span>
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default ProcessSteps;