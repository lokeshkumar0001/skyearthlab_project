import { createContext, useReducer, useEffect } from 'react'
import axios from 'axios'

export const UserContext = createContext()

export const userReducer = (state, action) => {
    switch (action.type) {
      case 'USER_UPDATE':
        return { userData: action.payload, loadingUser: false };
      case 'USER_DATA_REQUESTED':
        return { ...state, loadingUser: true };
      case 'USER_REMOVE':
        return { userData: null, loadingUser: false };
      case 'USER_LOADING_COMPLETE':
        return { ...state, loadingUser: false };
      default:
        return state;
    }
  };

export const UserContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(userReducer, { 
      userData: null,
      loadingUser: true,
    })
  
    useEffect(() => {
      const storedUser = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : undefined;

      if (storedUser && storedUser.token) {
        const getCurrentUser = async () => {
          try {
            const res = await axios.get('/api/user/me', {
              headers: {
                Authorization: `Bearer ${storedUser.token}`,
              },
            });
            
            // Handle the response here
            const userData = res.data;
            dispatch({type:"USER_UPDATE",payload:userData})
            dispatch({type:"USER_LOADING_COMPLETE"})

          } catch (error) {
            // 
            console.error('Error fetching current user:', error);
          }
        };
      
        // Call the function to get the current user
        getCurrentUser();
      }

    }, [])

  
    console.log('UserContext state:', state)
    
    return (
      <UserContext.Provider value={{ ...state, dispatch }}>
        { children }
      </UserContext.Provider>
    )
  
  }