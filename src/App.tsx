import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Header from './componets/Header/Header';
import NavBar from './componets/NavBar/NavBar';

import './App.css';
import Home from './pages/Home/Home';

function App() {
  return (
      <BrowserRouter>
    <div className="App">
      <Header />
        <div className='Main'>
          <div className='NavBar'>
            <NavBar />
          </div>
          <div className='Home'>
          <Routes>
             <Route path="/" element={<Home/>}/>
             <Route path="*" element={<div>404</div>}/>
          </Routes>
           
          </div>
        </div>

    </div>
      </BrowserRouter>
  );
}


export default App;
