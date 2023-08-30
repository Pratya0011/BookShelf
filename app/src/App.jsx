import { useState } from 'react'
import './App.css'
import Landing from './Components/Landing'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Home from './Components/Home'

function App() {

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
