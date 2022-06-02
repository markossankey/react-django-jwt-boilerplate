import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";

let baseURL = process.env.REACT_APP_API_URL

const useAuthAxios = () => {
  const authInfo = useContext(AuthContext)
  const instance = axios.create({
    baseURL,
    withCredentials: true
  })
  // mainly for logging a user in, prior to receiving tokens
  if (!authInfo) {
    return instance
  }
  // if user already logged in, check expiration of access_token and refresh if needed
  else {
    instance.interceptors.request.use(async (config) => {
      // if access_token is expired, get new access token via refresh route
      if (authInfo.user.exp < Math.floor(Date.now() / 1000)) {
        let response = await axios.post(`${baseURL}token/refresh/`, {}, { withCredentials: true })
        let newToken = response.data.access
        config.headers = { Authorization: `Bearer ${newToken}` }
        authInfo.handleTokenRefresh(newToken)
      }
      // else add non-expired access_token to request headers
      else {
        config.headers = { Authorization: `Bearer ${authInfo.token}` }
      }
      return config
    })
  }
  return instance
}

export default useAuthAxios