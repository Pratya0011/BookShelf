import { useState, useEffect } from 'react'
import './App.css'
import Landing from './Components/Landing'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import { auth } from './Components/request'
import axios from 'axios'
import Library from './Components/Library'
import Activity from './Components/Activity'
import MyLibrary from './Components/MyLibrary'
import Premium from './Components/Premium'

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
              localStorage.setItem("accessToken", res.data.accessToken);
              setState(true);
          })
          .catch((err) => {
            console.log(err.response.data.message);
            setState(false)
          });
        
      }
    };
    authenticate();
  },[state])


  return (
    <div>
      <Router>
        <Routes>
          <Route exact path = '/' element={state?<Library/>:<Landing/>}></Route>
          <Route path = '/activity' element={state?<Activity/>:<Landing/>}></Route>
          <Route path = '/mylibrary' element={state?<MyLibrary/>:<Landing/>}></Route>
          <Route path='/premium' element={state?<Premium/>:<Landing/>}></Route>
        </Routes>
      </Router>
    </div>

  )
}

export default App
