import React from "react";
import Navbar from "./Navbar";
import OfferCards from "./OfferCards";
import HoverCards from "./HoverCard ";
import ProcessSteps from "./ProcessSteps";
import BoilerReviews from "./BoilerReviews";
import Footer from "./Footer";


export default function Main(){

    return (
        <div className=" overflow-hidden w-full bg-gradient-to-br from-black via-gray-900 to-black text-white flex flex-col ">
          <Navbar />
          <OfferCards />   
        <ProcessSteps/>
        <BoilerReviews/>
        <Footer/>
        </div>
      );

   
}