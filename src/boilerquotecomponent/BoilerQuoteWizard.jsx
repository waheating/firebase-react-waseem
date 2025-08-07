import { useState } from "react";
import { Card, CardContent } from "./Card";
import { Button } from "./Button";
import { FaLessThanEqual } from "react-icons/fa";
import GasWarningModal from "./GasWarningModal";
import { useNavigate } from "react-router-dom";
//import Navbar from "../basket/Navbar";

const baseSteps = [
  {
    question: "Does your boiler works on main gas?",
    options: ["Yes","No"],
    key: "mainGas",
  },
  {
    question: "What type of boiler do you currently have?",
    options: ["Combi Boiler", "Regular Boiler", "System Boiler","Back Boiler"],
    key: "currentBoiler",
  },
  {
    question: "Is your current Boiler Working?",
    options: ["Yes","No"],
    key: "boilerWorking",
  },
  
  {
    question: "What type of home do you live in?",
    options: ["Semi-detached","Detached","Terraced","Bungalow","Apartment"],
    key: "propertyType",
  },
  {
    question: "Do you want to change the location of the boiler?",
    options: ["No", "Yes"],
    key: "changeLocationDecision",
  },
  {
    question: "How many bedrooms do you have?",
    options: ["1 bedroom","2 bedroom","3 bedroom","4 bedroom"],
    key: "bedRoom",
  },
  {
    question: "How many bathtubs?",
    options: ["0","1","2","3"],
    key: "bathtubs",
  },
  {
    question: "How many separate shower?",
    options: ["0","1","2","3"],
    key: "shower",
  },
  {
    question: "Where does your boiler flue exit?", 
    options: ["external Wall","Roof"],
    key: "flueExit",
  },
  {
    question: "How long is your boiler flue?",
    options: ["0-1m","1-2m","2-4m","4-8m","unsure"],
    key: "flueLengthWall",
  },
  {
    question: "How close is your boiler flue to a door or window?",
    options: ["More than 30cm","Less than 30cm"],
    key: "flueToWindow",
  },
  {
    question: "What's Your PostCode?",
    input: true,
    key: "postcodeWall",
  },
];
const roofFollowUpSteps=[
    {
      question: "What type of roof do you have?",
      options: ["Flat","Slope"],
      key: "roofType",
    },
    {
      question: "How long is your boiler flue to the roof?",
      options: ["0-1m","1-2m","2-4m","4-8m","unsure"],
      key: "flueLength",
    },
    {
      question: "What's Your PostCode?",
      input: true,
      key: "postcodeRoof",
    }
  
]
const apartmentFollowUpSteps=[
  {
    question: "Is your aparment on or above 2nd floor?",
    options: ["Yes","No"],
    key: "apartments",
  },
  
]

const combiFollowUpSteps = [
 
  {
    question: "Where is your current boiler located?",
    options: ["Kitchen", "Bathroom", "Garage","loft/attic", "Other"],
    key: "currentBoilerLocation",
  },
  {
    question: "Where do you want to relocate the boiler?",
    options: ["Same Room", "Same Floor", "Different Floor", "loft/attic","Other"],
    key: "newPlace",
  },
];
const regularFollowUpSteps = [
 
  {
    question: "How fast water flow from kitchen cold tap",
    options: ["Fast", "Medium","Slow"],
    key: "waterSpeed",
  },
]
const regularToCombiFollowUpSteps = [
 
    {
      question: "Do you want to convert to a Combi boiler",
      options: ["Yes","No"],
      key: "changeToCombi",
    }
  
];
const coveredPostcodes = [
  "SL1","SL2","SL3","SL9","SL0","SL4","SL6","TW1","UB9","HP9","UB8","HP1","UB7","UB1","SL8",
  "TW2","TW6","HP8","UB3","SL5","WD3","RG4","UB4","SL7","GU2","HA4","HP7","UB2","UB5","RG1",
  "HA6","TW5","KT1","TW4","HA5","TW3","HA2","UB6","HP6","RG9","WD1","TW7","GU1","W73","HP5",
  "W72","WD5","WD4","WD2","W71","HA1","W79","WD9","HA0","HA3","TW8","W51","HP3","W54","KT8",
  "W52","NW9","W55","RG5","W59","W53","HA9","TW9","HA7","NW1","W30","W39","W38","GU4","W43",
  "W45","KT2","HP2","W44","KT7","W27","W33","W26","W23","W37","W36","W21","W25","RG6","HA8",
  "SW1","W41","W42","W49","WD6","HP4","RG2","KT6","NW2","W60","AL2","KT5","W69","WD7","W66",
  "W68","W67","KT9","NW7","GU3","KT3","NW4","NW6","SW6","SW2","OX3","OX4","RG7","W93","W87",
  "W86","W92","KT4","SW5","RG3","W24","W89","W91","W85","W84","W94","N33","N81","NW8","N88",
  "N87","N80","NW3","N20","N31","SW7","GU5","AL3","N32","AL1","N12","SW3","N39","W22","SM4",
  "RG8","N28","OX1","N64","SM3","NW5","N29","N22","N66","SW4","AL4","CR4","SW8","N65","SM1",
  "N10","OX9","N19","WC2","SM2","WC1","N11","SM5","N70","SW9","AL5","N1C","N49","N44","N15",
  "N43","N79","RH5","SM7","N76","E58","N89","N69","N71","N77","N14","N78","GU9","AL9","EC1",
  "EC4","EC3","EC2","LU7","LU6","N51","N18","SM6","N1P","N42","N17","N16","N13","N41","N59",
  "N52","GU7","CR0","GU8","CR9","CR7","N21","RH4","E17","E16","E28","E27","E84","E82","E18",
  "E83","E1W","E26","E15","E11","E81","E20","E98","E59","LU1","E29","RH3","E12","CR8","E10",
  "CR2","E97","E99","E22","E89","E96","CR5","N99","E14","E13","E55","E50","E35","E95","N90",
  "AL8","N91","E34","N97","LU2","E32","SG1","N98","E39","E33","RH2","GU6","AL7","LU5"
];

export default function BoilerQuoteWizard() {
  const [showNotCoveredMessage, setShowNotCoveredMessage] = useState(false);
   const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [steps, setSteps] = useState([...baseSteps]);
  const [showGasWarning, setShowGasWarning] = useState(false); // New state for warning message
  const [secondFloor, setSecondFloor] = useState(false);
  const [changeLocation, setChangeLocation] = useState(false);
  const[flatChangeLocation,setFlatChangeLocation] = useState(false);
  const[backBoiler, setBackBoiler] = useState(false);
  const[slowWater, setSlowWater] = useState(false); 

  const handleOptionSelect = (option) => {
    const key = steps[step].key;
    const newAnswer = { ...answers, [key]: option };
   // delete keys variable
    const combiFollowUpKeys = combiFollowUpSteps.map(step => step.key);
    const roofFollowUpKeys = roofFollowUpSteps.map(step =>step.key);
    const apartmentFollowUpKeys = apartmentFollowUpSteps.map(step =>step.key); 
    const regularFollowUpKeys = regularFollowUpSteps.map(step =>step.key);
    const regularToCombiFollowUpKeys = regularToCombiFollowUpSteps.map(step =>step.key);
    
   //if no gas selected
   if (key === "mainGas" && option === "No") {
    setShowGasWarning(true);
    return;
  }
  if(key === "currentBoiler" && option === "Back Boiler"){
    setBackBoiler(true);
    setSlowWater(true);
    
  }
  else if(key === "currentBoiler" && option != "Back Boiler"){
    setBackBoiler(false);
    setSlowWater(false);
    
  }
  
  // regular system and back boiler selection
  if (option === "Regular Boiler" || option === "System Boiler"|| option === "Back Boiler" ) {
    const alreadyInserted = steps.some(
      (stepObj) => regularFollowUpKeys.includes(stepObj.key)
    );
  
    if (!alreadyInserted) {
      const updatedSteps = [
        ...steps.slice(0, step + 1),       // steps up to current
        ...regularFollowUpSteps,             // insert follow-up
        ...steps.slice(step + 1),          // remaining steps
      ];
      setSteps(updatedSteps);
    }
  
    setAnswers(newAnswer);
    setStep(step + 1);
    return;
  }
  if (key === "currentBoiler" && option === "Combi Boiler" ) {
    const filteredSteps = steps.filter(
      (stepObj) => !regularFollowUpKeys.includes(stepObj.key)
    );
  
    const filteredAnswers = Object.fromEntries(
      Object.entries(newAnswer).filter(
        ([answerKey]) => !regularFollowUpKeys.includes(answerKey)
      )
    );
  
    setSteps(filteredSteps);
    setAnswers(filteredAnswers);
    setStep(step + 1);
    return;
  }

  //change to combi boiler
  if (key === "waterSpeed" && option != "Slow") {
    const alreadyInserted = steps.some(
      (stepObj) => regularToCombiFollowUpKeys.includes(stepObj.key)
    );
  
    if (!alreadyInserted) {
      const updatedSteps = [
        ...steps.slice(0, step + 1),       // steps up to current
        ...regularToCombiFollowUpSteps,             // insert follow-up
        ...steps.slice(step + 1),          // remaining steps
      ];
      setSteps(updatedSteps);
    }
  
    setAnswers(newAnswer);
    setStep(step + 1);
    return;
  }
  if (key === "waterSpeed" && option === "Slow") {
    const filteredSteps = steps.filter(
      (stepObj) => !regularToCombiFollowUpKeys.includes(stepObj.key)
    );
  
    const filteredAnswers = Object.fromEntries(
      Object.entries(newAnswer).filter(
        ([answerKey]) => !regularToCombiFollowUpKeys.includes(answerKey)
      )
    );
  
    setSteps(filteredSteps);
    setAnswers(filteredAnswers);
    setStep(step + 1);
    return;
  }

  // if apartmnet is selected 
  if (key === "propertyType" && option === "Apartment") {
    const alreadyInserted = steps.some(
      (stepObj) => apartmentFollowUpKeys.includes(stepObj.key)
    );
  
    if (!alreadyInserted) {
      const updatedSteps = [
        ...steps.slice(0, step + 1),       // steps up to current
        ...apartmentFollowUpSteps,             // insert follow-up
        ...steps.slice(step + 1),          // remaining steps
      ];
      setSteps(updatedSteps);
    }
  
    setAnswers(newAnswer);
    setStep(step + 1);
    return;
  }
  if (key === "propertyType" && option != "Apartment") {
    const filteredSteps = steps.filter(
      (stepObj) => !apartmentFollowUpKeys.includes(stepObj.key)
    );
  
    const filteredAnswers = Object.fromEntries(
      Object.entries(newAnswer).filter(
        ([answerKey]) => !apartmentFollowUpKeys.includes(answerKey)
      )
    );
  
    setSteps(filteredSteps);
    setAnswers(filteredAnswers);
    setStep(step + 1);
    return;
  }
    
  //above second floor
  if (key === "apartments" && option === "Yes") {
    setSecondFloor(true); // set state to true
    setAnswers(newAnswer);
    setStep(step + 1);
    return;
  }
  
  if (key === "apartments" && option === "No") {
    setSecondFloor(false); // reset if user changes their mind
    setAnswers(newAnswer);
    setStep(step + 1);
    return;
  }
  
    
  
   

    //combi boiler relocation
    if (key === "changeLocationDecision" && option === "Yes") {
      setChangeLocation(true);
      const alreadyInserted = steps.some(
        (stepObj) => combiFollowUpKeys.includes(stepObj.key)
      );
    
      if (!alreadyInserted) {
        const updatedSteps = [
          ...steps.slice(0, step + 1),       // steps up to current
          ...combiFollowUpSteps,             // insert follow-up
          ...steps.slice(step + 1),          // remaining steps
        ];
        setSteps(updatedSteps);
      }
    
      setAnswers(newAnswer);
      setStep(step + 1);
      return;
    }
    
    if (key === "changeLocationDecision" && option === "No") {
      
      setChangeLocation(false);
      const filteredSteps = steps.filter(
        (stepObj) => !combiFollowUpKeys.includes(stepObj.key)
      );
    
      const filteredAnswers = Object.fromEntries(
        Object.entries(newAnswer).filter(
          ([answerKey]) => !combiFollowUpKeys.includes(answerKey)
        )
      );
    
      setSteps(filteredSteps);
      setAnswers(filteredAnswers);
      setStep(step + 1);
      return;
    }
    //location change question to future sentance
    if(changeLocation){

    }
    //this is for roof flue Exit
    if (key === "flueExit" && option === "Roof") {
      const updatedSteps = [
        ...steps.slice(0, step + 1),       // steps up to current
        ...roofFollowUpSteps,             // insert follow-up
        ...steps.slice(step + 1),          // remaining steps
      ];
      setSteps(updatedSteps);
      setAnswers(newAnswer);
      
      setStep(step + 1);
      return;
    }
    if (key === "flueExit" && option === "external Wall") {
      const filteredSteps = steps.filter(
        (stepObj) => !roofFollowUpKeys.includes(stepObj.key)
      );
  
      // Remove those answers flue Exit
      const filteredAnswers = Object.fromEntries(
        Object.entries(newAnswer).filter(([answerKey]) => !roofFollowUpKeys.includes(answerKey))
      );
  
      setSteps(filteredSteps);
      setAnswers(filteredAnswers);
      
      setStep(step + 1);
      return;
    }
    
    setAnswers(newAnswer);
    
     setStep(step +1);
      return;
  };

  const backButton = () => {
    removeLastAnswer();
    setStep(step-1);
  };

  const removeLastAnswer = () => {
    const keys = Object.keys(answers);
    if (keys.length === 0) return;
  
    const lastKey = keys[keys.length - 1];
    const { [lastKey]: _, ...rest } = answers;
    setAnswers(rest);
  };

  //post code checker
  const handleShowResults = () => {
    const lastKey = Object.keys(answers).at(-1);
    const lastValue = answers[lastKey];
  
    if (!lastValue) return;
  
    const cleaned = lastValue.trim().toUpperCase().replace(/\s/g, "");
    const outwardCode = cleaned.slice(0, 3);
  
    if (coveredPostcodes.includes(outwardCode)) {
      localStorage.setItem("boilerAnswers", JSON.stringify(answers));
      localStorage.setItem("boilerSteps", JSON.stringify(steps));
      navigate("/boilerQuote/results", { state: { answers } });

    } else {
      setShowNotCoveredMessage(true);
    }
  };

  const getDynamicQuestion = (stepObj) => {
    const { key, question } = stepObj;
  
    
    if (!changeLocation){
      switch (key) {
        case "flueExit":
           return "Where does your boiler flue exit?"; 
        case "flueLengthWall":
          return "How long is your boiler flue?";
        case "flueToWindow":
          return "How close is your boiler flue to a door or window?";
        case "roofType":
          return "What type of roof do you have?";
        case "flueLength":
          return "How long is your boiler flue to the roof?";
        default:
          return question;
      }
    }
  
    if(changeLocation){
    switch (key) {
      case "flueExit":
        return "Where will your boiler flue exit?";
      case "flueLengthWall":
        return "How long will your boiler flue?";
      case "flueToWindow":
        return "How close will your boiler flue to a door or window?";
      case "roofType":
        return "Where will your boiler flue come out?";
      case "flueLength":
          return "How long will your boiler flue to the roof?";
      default:
        return question;
    }
  }
  };

  const currentStep = steps[step];
  const progressPercentage = ((step + 1) / steps.length) * 100;

  return (
    <>
      
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white px-4 py-10">
        <div className="max-w-xl mx-auto">
          {showGasWarning && <GasWarningModal onClose={() => setShowGasWarning(false)} />}

          {/* Progress bar */}
          <div className="mb-6">
            <div className="w-full bg-gray-300 rounded-full h-3 overflow-hidden">
              <div
                className="bg-orange-500 h-full transition-all duration-300"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
            <p className="text-xs text-gray-600 mt-2 text-center">
              Step {step + 1} of {steps.length}
            </p>
          </div>

          <Card className="rounded-2xl shadow-xl border border-gray-100">
            <CardContent className="px-6 py-8 sm:px-10">
              <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
                {getDynamicQuestion(currentStep)}
              </h2>

              {currentStep.input ? (
                <div className="flex flex-col items-center space-y-6">
                  <input
                    type="text"
                    value={answers[currentStep.key] || ""}
                    onChange={(e) =>
                      setAnswers((prev) => ({ ...prev, [currentStep.key]: e.target.value }))
                    }
                    maxLength={7}
                    placeholder="e.g. UB3 5LL"
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 text-center text-lg focus:ring-2 focus:ring-orange-400 focus:outline-none"
                  />

                  <Button
                    onClick={handleShowResults}
                    disabled={(answers[currentStep.key] || "").trim().length < 6}
                    className="w-full text-lg font-semibold"
                  >
                    Show Me Results
                  </Button>

                  {showNotCoveredMessage && (
                    <div className="w-full p-4 border border-yellow-400 bg-yellow-50 rounded-xl text-center">
                      <p className="text-sm text-gray-700">
                        <strong>Sorry!</strong> We don't cover this area yet.
                      </p>
                      <Button
                        onClick={() => setShowNotCoveredMessage(false)}
                        className="mt-3 bg-red-600 hover:bg-red-700 text-white"
                      >
                        Cancel
                      </Button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 ">
                  {currentStep.options
                    .filter((option) => {
                      if (currentStep.key === "flueExit" && secondFloor) return option !== "Roof";
                      if (currentStep.key === "flueToWindow" && secondFloor)
                        return option !== "Less than 30cm";
                      if (currentStep.key === "changeToCombi" && backBoiler) return option !== "No";
                      if (currentStep.key === "waterSpeed" && slowWater) return option !== "Slow";
                      return true;
                    })
                    .map((option) => (
                      <Button
                        key={option}
                        onClick={() => handleOptionSelect(option)}
                        className="text-base py-3"
                      >
                        {option} 
                      </Button>
                    ))}
                </div>
              )}

              <div className="mt-8 flex justify-between">
                <Button
                  onClick={backButton}
                  variant="outline"
                  hidden={step === 0}
                  disabled={step === 0}
                >
                  Back
                </Button>
              </div>

              <div className="mt-10">
                <h3 className="text-md font-semibold mb-2 text-gray-700">Answers so far:</h3>
                <ul className="space-y-1 text-sm text-gray-600">
                 
                  {Object.entries(answers).map(([key, value]) => {
  const matchedStep = steps.find((step) => step.key === key);
  const question = matchedStep ? matchedStep.question : key;

  return (
    <li key={key}>
      <strong>{question}</strong>: {value}
    </li>
  );
})}
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
