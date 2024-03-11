import { createContext, useReducer, useEffect } from 'react'

export const AuthContext = createContext()

export const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return { user: action.payload, loading: false };
    case 'LOGOUT':
      return { user: null, loading: false };
    case 'LOADING_COMPLETE':
      return { ...state, loading: false };
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, { 
    user: null,
    loading: true,
  })

  useEffect(() => {
    const storedUser = localStorage.getItem('user');

    try {
      const user = JSON.parse(storedUser);

      if (user && user.token) {
        dispatch({ type: 'LOGIN', payload: user });
      }
    } catch (error) {
      console.error('Error parsing user from localStorage:', error);
      // Optionally, you can clear invalid user data from localStorage here
    } finally {
      // Set loading to false once the check is complete
      dispatch({ type: 'LOADING_COMPLETE' });
    }
  }, [])

  console.log('AuthContext state:', state)
  
  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      { children }
    </AuthContext.Provider>
  )

}