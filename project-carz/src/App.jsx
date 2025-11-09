import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import Home from './components/Home'
import FindCars from './components/FindCars'
import Contact from './components/Contact'
import AddCar from './components/AddCar'

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/find-cars/*" element={<FindCars />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/add-car" element={<AddCar />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App