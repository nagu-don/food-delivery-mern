import { createContext, useState, useEffect } from "react";
import axios from "axios"

export const StoreContext= createContext(null);

const StoreContextProvider=(props)=>{
    const [category, setCategory]=useState('All');
    const [cartItems,setCartItems]=useState({});
    const url="http://localhost:4000"
    const [token,setToken]=useState("")
    const [food_list,setFoodList]=useState([])

    const changeCategory=(menu_name)=>{
        if(menu_name==='All'|| menu_name!==category){
            setCategory(menu_name)
        }
        else{
            setCategory('All')
        }
    }

    const addToCart = async (itemId)=>{
        if(!cartItems[itemId]){
            setCartItems((prev)=>({...prev,[itemId]:1}))
        }
        else {
            setCartItems((prev)=>({...prev,[itemId]:prev[itemId]+1}))
        }
        if(token){
            await axios.post(url+"/api/cart/add",{itemId},{headers:{token}})
        }
    }

    const removeFromCart= async (itemId)=>{
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
            if(token){
                await axios.post(url+"/api/cart/remove",{itemId},{headers:{token}})
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

    const loadCartData = async (token)=>{
        const response= await axios.post(url+"/api/cart/get",{},{headers:{token}});
        setCartItems(response.data.cartData)
    }

    useEffect(()=>{
        async function loadData(){
            await fetchFoodList();
            if(localStorage.getItem("token")){
                setToken(localStorage.getItem("token"));
                await loadCartData(localStorage.getItem("token"))
            }
        }
        loadData();
    },[])

    const fetchFoodList = async () =>{
        const response = await axios.get(url+"/api/food/list")
        setFoodList(response.data.data)
    }


    const contextValue={
        food_list,
        cartItems,
        category,
        url,
        token,
        setToken,
        changeCategory,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
    }
    return(
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}
export default StoreContextProvider