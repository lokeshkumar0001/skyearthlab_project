import { useContext } from "react"
import { UserContext } from "../context/UserContext";

export const useUserContext = () => {
  const context = useContext(UserContext);

  if(!context) {
    throw Error('useAuthContext must be used inside an AuthContextProvider')
  }

  return context
}