import { createContext, useContext, useEffect, useState } from "react"
import { useNavigate, useLocation, Outlet } from "react-router-dom";
import axios from 'axios'
import jwt_decode from 'jwt-decode'

let AuthContext = createContext(null);

function AuthProvider({ children }) {

  const navigate = useNavigate()
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const test = 'this is a test'

  const doLogin = async (username, password) => {
    axios.post('http://localhost:8000/api/token/', { username: username, password: password }, { withCredentials: true })
      .then(res => {
        let userObj = jwt_decode(res.data.access)
        setToken(res.data.access)
        setUser(userObj)
        navigate('')
      })
  }

  const doLogout = () => {
    setToken(null)
    setUser(null)
    navigate('/login')
  }

  return (
    <AuthContext.Provider
      value={{ token, setToken, user, setUser, test, doLogin, doLogout }}
    >
      {children}
    </AuthContext.Provider>
  )
}


function RequireAuth() {
  const auth = useContext(AuthContext)
  const navigate = useNavigate()

  useEffect(() => {
    !auth.user && navigate('/login')
  }, [])

  return <Outlet />
}


export { AuthContext, AuthProvider, RequireAuth }