import React, { useState } from 'react'
import Navbar from './components/Navbar/navbar.jsx'
import { Routes,Route } from 'react-router-dom'
import Home from "./pages/Home/home.jsx"
import Cart from "./pages/Cart/cart.jsx"
import PlaceOrder from "./pages/PlaceOrder/PlaceOrder.jsx"
import Footer from './components/Footer/Footer.jsx'
import LoginPopup from './components/LoginPopup/LoginPopup.jsx'

const App = () => {
  const [showLogin,setShowLogin]=useState(false)
  return (
    <div>
      {showLogin?<LoginPopup setShowLogin={setShowLogin}/>:<></>}
      <div className='app'>
        <Navbar setShowLogin={setShowLogin}/>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/cart" element={<Cart/>}/>
          <Route path="/place-order" element={<PlaceOrder/>}/>
        </Routes>
      </div>
      <Footer/>
    </div>
  )
}

export default App
