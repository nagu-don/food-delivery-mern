import React from 'react'
import Navbar from './components/Navbar/navbar.jsx'
import { Routes,Route } from 'react-router-dom'
import Home from "./pages/Home/home.jsx"
import Cart from "./pages/Cart/cart.jsx"
import PlaceOrder from "./pages/PlaceOrder/PlaceOrder.jsx"

const App = () => {
  return (
    <div className='app'>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/cart" element={<Cart/>}/>
        <Route path="/place-order" element={<PlaceOrder/>}/>
      </Routes>
    </div>
  )
}

export default App
