import { useState } from "react";
import axios from "axios";
import { useAuthContext } from './useAuthContext';
import { useNavigate } from 'react-router-dom';

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  // const { dispatch } = useAuthContext();
  const navigate = useNavigate();

  const signup = async (username, email, password, firstname, lastname) => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        "api/user/",
        { username, email, password, firstname, lastname },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.data;

      if (data.success === false) {
        setIsLoading(false);
        setError(data.error);
      } else if (data.success === true) {
        localStorage.setItem("user", JSON.stringify(data));
        setIsLoading(false);
        navigate('/login');
      }
    } catch (error) {
      setIsLoading(false);
      setError(error.message || "Signup Failed!");
    }
  };

  return { signup, isLoading, error };
};
