import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuthContext } from './useAuthContext';

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch } = useAuthContext();
  const navigate = useNavigate();

  const login = async (email, password) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post('/api/user/login', { email, password }, {
        headers: { 'Content-Type': 'application/json' },
      });

      const data = response.data;
      // console.log('res:', response, 'data:', data);

      if (data.success === false) {
        setIsLoading(false);
        setError(data.error);
      } else if (data.success === true) {
        localStorage.setItem("user", JSON.stringify(data));

        dispatch({type: 'LOGIN', payload: data})
        // Show success message using toast
        toast.success("Login successful!", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });

        setIsLoading(false);

        // Redirect to the dashboard
        navigate('/dashboard');
      }
    } catch (error) {
      setIsLoading(false);
      setError(error.message || 'An error occurred during login');
    }
  };

  return { login, isLoading, error };
};
