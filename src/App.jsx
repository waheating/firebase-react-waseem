import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import Main from './components/Menu';
import BoilerQuoteMain from './boilerquotecomponent/BoilerQuoteMain';
import BoilerResult from './boilerResults/BoilerResult';
import BoilerQuoteResults from './basket/BoilerQuoteResults';
import ImageUpload from './basket/ImageUpload';

function App() {
 
  return (
    <Router>
    <Routes>
    
      <Route path="/" element={<Main />} />
       <Route path="/boilerQuote" element={<BoilerQuoteMain/>} />   
   <Route path="/boilerQuote/results" element={<BoilerResult />} />
   <Route path="/boilerQuote/results/:boilerName" element={<BoilerQuoteResults />} /> 
       
   <Route path="/upload/:code" element={<ImageUpload />} />



      
      
    </Routes>
  </Router>
    
  )
}

export default App
