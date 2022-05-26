import './App.css';
import { AuthProvider, RequireAuth } from './Context/AuthContext';
import Login from './Pages/Login';
import { HashRouter, Routes, Route } from 'react-router-dom'
import Home from './Pages/Home';

function App() {




  // const getTests = async () => {
  //   let config = accessToken == '' ? {} : { headers: { Authorization: `Bearer ${accessToken}` } }
  //   console.log('current config (if {}, should throw err)', config)
  //   axios.get('http://localhost:8000/api/tests', config)
  //     .then(res => console.log('authed config', config, 'authed response', res))
  // }

  return (
    <HashRouter>
      <AuthProvider>
        <div style={{ height: '100vh', width: '100vw', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Routes>
            {/* ROUTES REQUIRING AUTHENTICATION */}
            <Route element={<RequireAuth />}>
              <Route index path='' element={<Home />} />
            </Route>
            {/* PUBLIC ROUTES, NO AUTHENTICATION NEEDED */}
            <Route path='/login' element={<Login />} />
          </Routes>
        </div>
      </AuthProvider>
    </HashRouter>
  );
}

export default App;
