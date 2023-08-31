import { useState, useEffect } from 'react'
import './App.css'
import Landing from './Components/Landing'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Home from './Components/Home'
import { auth } from './Components/request'
import axios from 'axios'

function App() {
  const [state,setState] = useState(false)

  useEffect(()=>{
    const authenticate = () => {
      let accessToken = localStorage.getItem("accessToken");
      let refreshToken = localStorage.getItem("refreshToken");
      let id = localStorage.getItem('userId')
      const headers = {
        access: accessToken,
        refresh: refreshToken,
      };
      if (!accessToken && !refreshToken) {
        setState(false);
      }else if(!id){
        setState(false);
      } else {
        axios
          .post(`${auth.authenticate}/${id}`, {}, { headers })
          .then((res) => {
            if (res.data.status === 200) {
              localStorage.setItem("accessToken", res.data.accessToken);
              setState(true);
              console.log(res)
            } else {
              setState(false);
              // dispatch(setMessage(res.data.message))
              console.log(res)
            }
          })
          .catch((err) => {
            console.log(err);
          });
        
      }
    };
    authenticate();
  },[state])


  return (
    <div>
      <Router>
        <Routes>
          <Route exact path = '/' element={<Landing/>}></Route>
          <Route path = '/Home' element={<Home/>}></Route>
        </Routes>
      </Router>
    </div>

  )
}

export default App
