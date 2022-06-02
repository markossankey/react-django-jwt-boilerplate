import axios from "axios"
import { useContext, useState } from "react"
import { AuthContext } from "../Context/AuthContext"
import useAuthAxios from "../Axios/useAxios"

function Home(props) {

  const backend = useAuthAxios()
  const { doLogout, token } = useContext(AuthContext)
  const [isTestDone, setIsTestDone] = useState(false);

  const doTest = async () => {
    let response = await backend.get('tests')
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