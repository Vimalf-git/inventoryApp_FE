import { BrowserRouter, Route, Routes } from "react-router-dom"
import Login from "./components/Login/Login"
import Signup from "./components/UserCreation/Signup"
import SideBar from "./components/SideBar/SideBar"
import Dashboard from "./components/LandingPage/Dashboard"
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute"
import Addproduct from "./components/AddProduct/Addproduct"
function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard"
            element={
              <ProtectedRoute>
                <div className="dash">
                  <SideBar /><Dashboard />
                </div>
              </ProtectedRoute>
            } />
            <Route path="/addproduct" element={
             <ProtectedRoute>
             <div className="dash">
               <SideBar /><Addproduct/>
             </div>
           </ProtectedRoute>
            }/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
