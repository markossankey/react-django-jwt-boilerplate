import { createContext, useContext, useEffect, useState } from "react"
import { useNavigate, useLocation, Outlet } from "react-router-dom";
import axios from 'axios'
import jwt_decode from 'jwt-decode'
import useAuthAxios from "../Axios/useAxios";

let AuthContext = createContext(null);

function AuthProvider({ children }) {

  const backend = useAuthAxios()
  const navigate = useNavigate()
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const test = 'this is a test'

  const handleTokenRefresh = (token) => {
    let userObj = jwt_decode(token)
    setToken(token)
    setUser(userObj)
  }

  const doLogin = async (username, password) => {
    backend.post('token/', { username: username, password: password })
      .then(res => {
        handleTokenRefresh(res.data.access)
        navigate('')
      })
  }

  const doLogout = () => {
    setToken(null)
    setUser(null)
    backend.delete('token/refresh/')
    navigate('/login')
  }

  return (
    <AuthContext.Provider
      value={{ token, setToken, user, setUser, test, doLogin, doLogout, handleTokenRefresh }}
    >
      {children}
    </AuthContext.Provider>
  )
}


function RequireAuth() {
  const auth = useContext(AuthContext)
  const navigate = useNavigate()

  useEffect(() => {
    // try to obtain a new access token when page is refreshed, or client navigates to home page if refresh token is in httponly cookie
    try {
      axios.post(`${process.env.REACT_APP_API_URL}token/refresh/`, {}, { withCredentials: true })
        .then(res => {
          console.log('new access token', res)
          auth.handleTokenRefresh(res.data.access)
        })
    }
    // navigates user to log in if no refresh token is found
    catch {
      console.log('no refresh token')
      !auth.user && navigate('/login')
    }
  }, [])

  return <Outlet />
}


export { AuthContext, AuthProvider, RequireAuth }