import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import AdminLogin from './Components/Admin/AdminLogin'
// import AdminPortal from './Components/Admin/AdminPortal'
import AdminComplaints from './Components/Admin/Complaints'
import FoodItems from './Components/Admin/FoodItems'
import CustomerOrders from './Components/Admin/CustomerOrders'
import CustomerReservations from './Components/Admin/CustomerReservations'
import CustomerDetails from './Components/Admin/CustomerDetails'
import CustomerPayments from './Components/Admin/CustomerPayments'
import CustomerFeedbacks from './Components/Admin/CustomerFeedbacks'
import AdminSettings from './Components/Admin/AdminSettings'
import { DarkModeProvider } from './Components/Hooks/DarkModeContext'
import Navbar from './Components/Admin/NavBar'
import AddAddonForm from './Components/Admin/AddAddonForm'
import ReportsComponent from './Components/Admin/Reports'

function App() {
  return (
    <>
      <BrowserRouter>
        <DarkModeProvider>
          <Routes>


            <Route path={'/adminPortal'} element={<AdminLogin />} />
              <Route path={'Admin-Login'} element={<AdminLogin />} />
            <Route path='/' element={<Navbar />}>
              <Route path={'Customer-Orders'} element={<CustomerOrders />} />
              <Route path={'Customer-Reservations'} element={<CustomerReservations />} />
              <Route path={'Customer-Details'} element={<CustomerDetails />} />
              <Route path={'Customer-Payments'} element={<CustomerPayments />} />
              <Route path={'Customer-Feedbacks'} element={<CustomerFeedbacks />} />
              <Route path={'FoodItems'} element={<FoodItems />} />
              <Route path={'Admin-Settings'} element={<AdminSettings />} />
              <Route path={'Customer-Complaints'} element={<AdminComplaints />} />
              <Route path={'AddOnForm'} element={<AddAddonForm />} />
              <Route path={'Reports'} element={<ReportsComponent />} />
            </Route>

          </Routes>
        </DarkModeProvider>
      </BrowserRouter>
      {//admin side routes 
      }


    </>
  )
}


export default App;

