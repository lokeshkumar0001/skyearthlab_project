import React, { createContext, useEffect, useReducer } from 'react';
import axios from 'axios'

const SET_CUSTOMER_INFO = 'SET_CUSTOMER_INFO';

const customerReducer = (state, action) => {
  switch (action.type) {
    case SET_CUSTOMER_INFO:
      return {
        customerInfo: action.payload,
      };
    default:
      return state;
  }
};

export const CustomerContext = createContext();

export const CustomerContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(customerReducer, { customerInfo: [] });

  useEffect(()=>{
    const storedUser = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : undefined;

    async function fetchCustomer(){
      if(storedUser.token){
        try {
          const res = await axios.get("/api/customer",  {
            headers: {
              Authorization: `Bearer ${storedUser.token}`,
            },
          });
            
          const {success,data} = res.data
          if(success === true){
            dispatch({type:'SET_CUSTOMER_INFO',payload:[...data]})
          }
    
        } catch (error) {
          console.error("Fetch customer data failed");
        }
      }
     
    }

    fetchCustomer();
    
  },[])

  console.log('CustomerState:', state);

  return (
    <CustomerContext.Provider value={{ ...state, customerDispatch: dispatch }}>
      {children}
    </CustomerContext.Provider>
  );
};
