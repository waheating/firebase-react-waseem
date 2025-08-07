import React, { useState, useEffect } from 'react';
import { db } from '../firebase/firebase'; // Import your Firebase db instance
import { doc, setDoc, getDoc } from 'firebase/firestore';

const API_KEY = 'wEPUP7ttH0aGz13RwoWhCw46678';
const LOCAL_STORAGE_KEY = 'customerFormData';

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



function safeJSONParse(item) {
  try {
    return JSON.parse(item);
  } catch {
    return null;
  }
}

function AddressAutoCompleteForm({ setCurrentSet, state, selectedExtras, selectedThermostat,selectedDate,setReferenceCode}) {
  const [input, setInput] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
  });
  const [showNotCoveredMessage, setShowNotCoveredMessage] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Load data from localStorage and Firebase
  useEffect(() => {
    const loadData = async () => {
       
      // date jumper
      

      // First try localStorage
      const saved = safeJSONParse(localStorage.getItem(LOCAL_STORAGE_KEY));
      if (saved) {
        setFormData({
          fullName: saved.fullName || '',
          phone: saved.phone || '',
          email: saved.email || '',
        });

        if (saved.address) {
          setSelectedAddress(saved.address);
          setInput(`${saved.address.line_1}, ${saved.address.town_or_city}, ${saved.address.postcode}`);
        }
        
        // Then try to load from Firebase if email exists
        if (saved.email) {
          try {
            const docRef = doc(db, 'customers', saved.email);
            const docSnap = await getDoc(docRef);
            
            if (docSnap.exists()) {
              const firebaseData = docSnap.data();
              setFormData(prev => ({
                ...prev,
                ...firebaseData,
                email: saved.email // Keep the email from localStorage
              }));
              
              if (firebaseData.address) {
                setSelectedAddress(firebaseData.address);
                setInput(`${firebaseData.address.line_1}, ${firebaseData.address.town_or_city}, ${firebaseData.address.postcode}`);
              }
            }
          } catch (err) {
            console.error('Error loading from Firebase:', err);
          }
        }
      }
    };

    loadData();
  }, []);

  // Fetch autocomplete suggestions
  useEffect(() => {
    const fetchSuggestions = async () => {
      if (input.length < 3) {
        setSuggestions([]);
        return;
      }

      try {
        const res = await fetch(
          `https://api.getaddress.io/autocomplete/${input}?api-key=${API_KEY}`
        );
        const data = await res.json();
        if (data.suggestions) {
          setSuggestions(data.suggestions);
        }
      } catch (err) {
        console.error('Autocomplete error:', err);
      }
    };

    const timeoutId = setTimeout(fetchSuggestions, 300);
    return () => clearTimeout(timeoutId);
  }, [input]);

  const fetchFullAddress = async (id) => {
    try {
      const res = await fetch(`https://api.getaddress.io/get/${id}?api-key=${API_KEY}`);
      const data = await res.json();
      setSelectedAddress(data);
      setInput(`${data.line_1}, ${data.town_or_city}, ${data.postcode}`);
      setSuggestions([]);
      setShowNotCoveredMessage(false);
    } catch (err) {
      console.error('Fetch full address error:', err);
    }
  };

  const handleSelect = (suggestion) => {
    fetchFullAddress(suggestion.id);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const generateRandomCode = () => {
    return Math.random().toString(36).substring(2, 10).toUpperCase(); // e.g., "A1B2C3D4"
  };
  


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
  
    if (!selectedAddress) {
      setError('Please select an address from the suggestions');
      setLoading(false);
      return;
    }
  
    const postcode = selectedAddress.postcode.trim().toUpperCase();
    const outwardCode = postcode.split(' ')[0];
  
    if (!outwardCode || !coveredPostcodes.includes(outwardCode)) {
      setShowNotCoveredMessage(true);
      setLoading(false);
      return;
    }
  
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Please enter a valid email address');
      setLoading(false);
      return;
    }
  
    const code = generateRandomCode(); 

    const newUrl = `${window.location.pathname}?code=${code}`;
     window.history.pushState({}, '', newUrl);


    const sanitizedExtras = Array.isArray(selectedExtras)
      ? selectedExtras.map(extra => {
          return Object.fromEntries(
            Object.entries(extra).filter(([_, value]) => value !== undefined)
          );
        })
      : [];
  
    const fullData = {
      ...formData,
      address: selectedAddress,
      extra: sanitizedExtras,
      timestamp: new Date().toISOString(),
      serviceType: state,
      thermostate: selectedThermostat,
      installationDate: selectedDate,
      referenceCode: code, // 👈 store it in the data too
    };
  
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(fullData));
  
      const docRef = doc(db, 'boilers', code); 
      await setDoc(docRef, fullData);
  
      console.log('Data saved successfully with code:', code);
      setReferenceCode(code);
      // optional: store code in state or context
      // to use later for image/QR code
      setCurrentSet(prev => Math.min(prev + 1));
    } catch (err) {
      console.error('Error saving data:', err);
      setError('Failed to save data. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">Customer Details</h2>

      {error && (
        <div className="mb-4 p-4 bg-red-100 text-red-700 rounded border border-red-300">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Full Name */}
        <div>
          <label className="block mb-1 font-medium">Full Name*</label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            required
            className="w-full border px-4 py-2 rounded focus:outline-none focus:ring focus:border-blue-300"
            placeholder="John Doe"
          />
        </div>

        {/* Phone */}
        <div>
          <label className="block mb-1 font-medium">Phone Number*</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            className="w-full border px-4 py-2 rounded focus:outline-none focus:ring focus:border-blue-300"
            placeholder="07123 456789"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block mb-1 font-medium">Email Address*</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full border px-4 py-2 rounded focus:outline-none focus:ring focus:border-blue-300"
            placeholder="john@example.com"
          />
        </div>

        {/* Address Lookup */}
        <div>
          <label className="block font-medium mb-1">Search Address*</label>
          <input
            type="text"
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              setSelectedAddress(null);
            }}
            placeholder="e.g. 10 Downing Street or SW1A 2AA"
            className="w-full border px-4 py-2 rounded focus:outline-none focus:ring focus:border-blue-300"
            required
          />
          {suggestions.length > 0 && (
            <ul className="border mt-2 rounded shadow bg-white max-h-48 overflow-y-auto z-10">
              {suggestions.map((s, index) => (
                <li
                  key={index}
                  onClick={() => handleSelect(s)}
                  className="px-4 py-2 cursor-pointer hover:bg-blue-50 border-b last:border-b-0"
                >
                  {s.address}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Show selected address */}
        {selectedAddress && (
          <div className="mt-4 bg-gray-50 p-4 rounded border text-sm">
            <p><strong>Address Line 1:</strong> {selectedAddress.line_1}</p>
            {selectedAddress.line_2 && <p><strong>Line 2:</strong> {selectedAddress.line_2}</p>}
            <p><strong>City:</strong> {selectedAddress.town_or_city}</p>
            <p><strong>Postcode:</strong> {selectedAddress.postcode}</p>
          </div>
        )}

        {/* Show not covered message */}
        {showNotCoveredMessage && (
          <div className="mt-4 p-4 bg-red-100 text-red-700 rounded border border-red-300">
            <p>We're sorry, but we don't currently cover your postcode area.</p>
            <p className="mt-2">Please contact us at help@waheating.co.uk for alternative solutions.</p>
          </div>
        )}

        {/* Submit */}
        <div className="pt-4">
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded text-white font-medium ${
              loading 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-blue-600 hover:bg-blue-700 transition-colors'
            }`}
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </span>
            ) : (
              'Continue to Payment'
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddressAutoCompleteForm;