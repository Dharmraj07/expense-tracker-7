import { Route, Routes } from "react-router-dom"
import LoginPage from "./pages/LoginPage"
import SignupPage from "./pages/SignupPage"
import VerifyEmailPage from "./pages/VerifyEmailPage"
import Home from "./pages/Home"
import ForgotPasswordPage from "./pages/ForgotPasswordPage"



function App() {

  return (
    <>
    <Routes>
      <Route  path="/" element={<LoginPage/>}/>
      <Route path="/signup" element={<SignupPage/>} />
      <Route  path="/verifyemail" element={<VerifyEmailPage/>}  />
      <Route path="/home" element={<Home/>} />
      <Route path="/forget-password" element={<ForgotPasswordPage/>} />
    </Routes>
     
     
    </>
  )
}

export default App
