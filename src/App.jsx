import { BrowserRouter, Route, Routes } from "react-router-dom"
import Login from "./components/Login/Login"
import Signup from "./components/UserCreation/Signup"
import SideBar from "./components/SideBar/SideBar"
import Dashboard from "./components/LandingPage/Dashboard"
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute"
import Addproduct from "./components/AddProduct/Addproduct"
import TableContext from "./components/CustomHook/TableDataContext"
import Sales from "./components/SalesChart/Sales"
import EditProduct from "./components/EditProduct/EditProduct"
import Forget from "./components/Forget/Forget"
import ResetPassword from "./components/Forget/ResetPassword"
import UserDetails from "./components/Forget/UserDetailContext"
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
              <TableContext>
                <div className="dash">
                  <ProtectedRoute>
                    <SideBar /><Dashboard />
                  </ProtectedRoute>
                </div>
              </TableContext>
            } />
          <Route path="/addproduct" element={
            <div className="dash">
              <ProtectedRoute>
                <SideBar /><Addproduct />
              </ProtectedRoute>
            </div>
          } />
          <Route path="/saleschart" element={
            <div className="dash">
              <ProtectedRoute>
                <SideBar />
                <Sales />
              </ProtectedRoute>
            </div>

          } />
          <Route path="/editproduct/:id" element={
            <ProtectedRoute>
              <EditProduct />
            </ProtectedRoute>
          } />
          <Route path="/forget" element={
            <UserDetails>
              <Forget />
            </UserDetails>
          }></Route>

          <Route path='/resetpassword/*' element={
            <UserDetails>
              <ResetPassword />
            </UserDetails>

          } />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
