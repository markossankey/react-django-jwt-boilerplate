import { useContext, useState } from "react";
import { AuthContext } from "../Context/AuthContext";

function LoginForm(props) {


  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { doLogin } = useContext(AuthContext)

  const handleLogin = async (e) => {
    e.preventDefault()
    doLogin(username, password)
  }

  return (
    <form onSubmit={handleLogin}>
      <input
        type='text'
        placeholder='username'
        defaultValue={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type='password'
        placeholder='password'
        defaultValue={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type='submit'>Submit</button>
    </form>
  )
}

export default LoginForm