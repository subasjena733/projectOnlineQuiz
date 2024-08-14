import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Navbar from './components/Navbar.jsx'
import AboutUs from './components/AboutUs.jsx'
import LoginUser from './components/LoginUser.jsx'
import LoginAdmin from './components/LoginAdmin.jsx'
import Signup from './components/Signup.jsx'
import Logout from './components/Logout.jsx'
import Profile from './components/Profile.jsx'
import ProtectedRoute1 from './components/ProtectedRoute1.jsx'
import ProtectedRoute2 from './components/ProtectedRoute2.jsx'
import ProtectedRoute3 from './components/ProtectedRoute3.jsx'
import AddQns from './components/AddQns.jsx'
import ProtectedRoute4 from './components/protectedRoute4.jsx'
import Frame from './components/Frame.jsx'
import SubmitButton from './components/SubmitButton.jsx'
import QuestionDashboard from './components/QuestionDashboard.jsx'
import SetExam from './components/SetExam.jsx'
import QnSetDashboard from './components/QnSetDashboard.jsx'
import ExamSet from './components/ExamSet.jsx'
import Result from './components/Result.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path='/' element={<AboutUs/>}/>
        <Route element={<ProtectedRoute2/>}>
        <Route path='/userlogin' element={<LoginUser/>}/>
        <Route path='/adminlogin' element={<LoginAdmin/>}/>
        <Route path='/signup' element={<Signup/>}/>
        </Route>
        <Route element={<ProtectedRoute1/>}>
          <Route path='/profile' element={<Profile/>}/>
          <Route element={<ProtectedRoute3/>}>
            <Route path='/addqns' element={<AddQns/>}/>
            <Route path='/setexam' element={<SetExam/>}/>
            <Route path='/questiondashboard' element={<QuestionDashboard/>}/>
            <Route path='/questionsetdashboard' element={<QnSetDashboard/>}/>
          </Route>
          <Route element={<ProtectedRoute4/>}>
            <Route path='/takeExam' element={<ExamSet/>}/>
            <Route path='/examqns' element={<Frame/>}/>
            <Route path='/submit' element={<SubmitButton/>}/>
            <Route path='/result' element={<Result/>}/>
          </Route>
          <Route path='/logout' element={<Logout/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
