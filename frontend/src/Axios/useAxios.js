import axios from "axios";
import jwtDecode from "jwt-decode";
import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";

let baseURL = process.env.REACT_APP_API_URL

const useAuthAxios = () => {
  const authInfo = useContext(AuthContext)

  const instance = axios.create({
    baseURL,
    withCredentials: true
  })

  console.log(authInfo)
  // mainly for logging a user in, prior to receiving tokens
  if (!authInfo) {
    return instance
  }
  else {
    instance.interceptors.request.use((config) => {
      if (authInfo.user.exp)
        console.log('authInfo', authInfo)
      console.log('config', config)
      return config
    })
  }

  return instance
}

export default useAuthAxios