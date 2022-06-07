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

  const getLoginTokens = async (username, password) => {
    const response = await backend.post('token/', { username: username, password: password })
    return response.data.access
  }

  const handleTokenRefresh = (token) => {
    let userObj = jwt_decode(token)
    setToken(token)
    setUser(userObj)
  }

  const doLogin = async (username, password) => {
    let accessToken = await getLoginTokens(username, password)
    handleTokenRefresh(accessToken)
    navigate('')
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

    // defines how axios handle an error repsonse, otherwise it won't have .then if status != 200
    axios.interceptors.response.use(response => response, error => error)

    axios.post(`${process.env.REACT_APP_API_URL}token/refresh/`, {}, { withCredentials: true })
      .then(res => {
        // request has no refresh_token cookie ( user isn't logged in )
        if (res.request.status == 401) navigate('/login')

        // user is logged in, but page was refreshed
        else auth.handleTokenRefresh(res.data.access)
      })
  }, [])

  return <Outlet />
}


export { AuthContext, AuthProvider, RequireAuth }