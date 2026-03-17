import { createContext, useState, useEffect } from "react";
import { food_list } from "../assets/assets";

export const StoreContext= createContext(null)

const StoreContextProvider=(props)=>{
    const [category, setCategory]=useState('All');
    const [cartItems,setCartItems]=useState({});

    const changeCategory=(menu_name)=>{
        if(menu_name==='All'|| menu_name!==category){
            setCategory(menu_name)
        }
        else{
            setCategory('All')
        }
    }

    const addToCart =(itemId)=>{
        if(!cartItems[itemId]){
            setCartItems((prev)=>({...prev,[itemId]:1}))
        }
        else {
            setCartItems((prev)=>({...prev,[itemId]:prev[itemId]+1}))
        }
    }

    const removeFromCart=(itemId)=>{
        if(cartItems[itemId]){
            setCartItems((prev)=>{
                const newCart={...prev}
                if(newCart[itemId]===1){
                    delete newCart[itemId]
                }
                else{
                    newCart[itemId]=newCart[itemId]-1
                }
                return newCart
            })
            }
        }
        const getTotalCartAmount=()=>{
            let totalAmount=0;
            for(const item in cartItems){
                if(cartItems[item]>0){
                    let itemInfo=food_list.find((product)=>product._id===item)
                    totalAmount+=itemInfo.price*cartItems[item];
                }
            }
            return totalAmount;
        }

    const contextValue={
        food_list,
        cartItems,
        category,
        changeCategory,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount
    }
    return(
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}
export default StoreContextProvider