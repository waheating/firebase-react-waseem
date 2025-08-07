// src/pages/QRCodeGenerator
import React, { useEffect, useRef, useState } from 'react';
import QRCode from 'qrcode';
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/firebase"; 

const ConfirmationPage = ({ referenceCode, setStepJumper, setConfirmationBtn, payLater }) => {
  const canvasRef = useRef(null);
  const [fullName, setFullName] = useState("");
       
  const code = referenceCode;
 // const ip =  `192.168.10.12`;
 // const url = `http://${ip}:5173/upload/${code}`;
  //const url = `${ip}/upload/${code}`;
  const ip = `192.168.10.12`;
   // const ip = `192.168.26.166`;
  const url = `http://${ip}:5173/upload/${code}`;
 // const ip = '192.168.10.12';  // Replace with actual LAN IP
  //const url = `http://${ip}:5173/upload/${code}`;

  useEffect(() => {
    setStepJumper(false);
    setConfirmationBtn(true);

    if (canvasRef.current) {
      QRCode.toCanvas(canvasRef.current, url, { width: 200 }, (err) => {
        if (err) console.error(err);
      });
    }
  }, [url]);

   // ✅ Fetch full name
   useEffect(() => {
    const fetchFullName = async () => {
      try {
        const docRef = doc(db, "boilers", code);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setFullName(docSnap.data().fullName || "");
          
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching full name:", error);
      }
    };

    fetchFullName();
  }, [code]);
 
 

  return (
    <div className="flex flex-col items-center justify-center p-8 bg-gradient-to-br from-blue-50 to-white rounded-3xl shadow-lg max-w-md mx-auto my-10 space-y-8 border border-gray-100">
  <div className="text-center space-y-2">
  <h2 className="text-1xl font-normal text-gray-600 bg-clip-text ">Hi: {fullName || "Loading..."}</h2>
  <h2 className="text-2xl font-bold text-gray-800 bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400">
      Upload Boiler Images
    </h2>
    <p className="text-gray-600">
  <span className="hidden sm:inline">Scan the QR code or </span>
        Use the link below to upload your boiler images.
</p>

  </div>

  {/* Upload Link Section */}
  <div className="w-full text-center space-y-4">
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-block px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:from-blue-600 hover:to-blue-700"
    >
      Upload Images Now
    </a>

    <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
      <p className="text-gray-700 font-medium">
        Reference Code: <span className="text-blue-600 font-bold">{code}</span>
      </p>
    </div>
  </div>

  {/* QR Code Canvas */}
  <div className="hidden sm:block p-4 bg-white rounded-2xl shadow-inner border border-gray-200">
    <canvas ref={canvasRef} className="rounded-lg" />
  </div>

  <div className="text-center space-y-2 text-sm text-gray-500">
    
    {payLater && (
       <p>Once your boiler images have been reviewed,<br/>
      you will receive a secure payment link via email. </p>
)}
  </div>
</div>
  )
  
};

export default ConfirmationPage;