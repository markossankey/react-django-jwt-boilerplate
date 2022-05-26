import axios from "axios"
import { useContext, useState } from "react"
import { AuthContext } from "../Context/AuthContext"

function Home(props) {

  const { doLogout, token } = useContext(AuthContext)
  const [isTestDone, setIsTestDone] = useState(false);

  const doTest = async () => {
    let response = await axios.get('http://localhost:8000/api/tests', { headers: { Authorization: `Bearer ${token}` } })
    console.log(response)
    setIsTestDone(true)
  }

  return (
    <div>
      This is the Home Page
      <button onClick={() => doLogout()}>Logout</button>
      <button onClick={() => doTest()}>Do Test</button>
      {isTestDone && <p>Check the console to verify test response has been received</p>}
    </div>
  )
}

export default Home