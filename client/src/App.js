import logo from "./logo.svg";
import "./App.css";
import GuestLayout from "./components/GuestLAyout/GuestLayout";
import { Route, Routes } from "react-router-dom";
import Login from "./components/GuestLAyout/Login";
import Register from "./components/GuestLAyout/Register";
import UserLayout from "./components/UserLayout/UserLayout";
import Profile from "./components/UserLayout/Profile";
import ChangePassword from "./components/UserLayout/ChangePassword";
import ForgotPassword from "./components/UserLayout/ForgotPassword";
import DonorRegister from "./components/GuestLAyout/DonorRegister";
import DonorLogin from "./components/GuestLAyout/DonorLogin";
import RecipientRegister from "./components/GuestLAyout/RecipientRegister";
import RecipientLogin from "./components/GuestLAyout/RecipientLogin";
import AdminLogin from "./components/GuestLAyout/AdminLogin";
import DonorLayout from "./components/DonorLayout/DonorLayout";
import AllRecipients from "./components/DonorLayout/AllRecipients";
import DonorProfile from "./components/DonorLayout/DonorProfile";
import AllDonors from "./components/RecipientLayout/AllDonors";
import RecipientProfile from "./components/RecipientLayout/RecipientProfile";
import RecipientLayout from "./components/RecipientLayout/RecipientLayout";
import CreateRequest from "./components/RecipientLayout/CreateRequest";
import AllRequests from "./components/DonorLayout/AllRequests";
import Home from "./components/GuestLAyout/Home";
import About from "./components/GuestLAyout/About";
import Services from "./components/GuestLAyout/Services";
import Contact from "./components/GuestLAyout/Contact";
import AdminLayout from "./components/AdminLayout/AdminLayout";
import AdminDashboard from "./components/AdminLayout/AdminDashboard";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<GuestLayout />}>
        <Route index element={<Home/>}/>
         <Route path="/home" element={<Home />}></Route>
          <Route path="/about" element={<About />}></Route>
          <Route path="/contact" element={<Contact />}></Route>
          <Route path="/services" element={<Services />}></Route>

          <Route path="/register" element={<Register />} />
           <Route path="/doonerregister" element={<DonorRegister />} />
          <Route path="/doonerlogin" element={<DonorLogin />} />
          <Route path="/adminlogin" element={<AdminLogin />} />
          <Route path="/Recipientregister" element={<RecipientRegister />} />
          <Route path="/Recipientlogin" element={<RecipientLogin />} />
          <Route path="/ForgotPassword" element={<ForgotPassword />} />
        </Route>

        <Route path="/admin" element={<AdminLayout />}>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />

          
        </Route>

         <Route path="/donor" element={<DonorLayout/>}>
          <Route index element={<AllRecipients />} />
          <Route path="/donor/allrecipient" element={<AllRecipients />} />
          <Route path="/donor/profile" element={<DonorProfile />} />
          <Route path="/donor/allreq" element={<AllRequests />} />
          
        </Route>



        <Route path="/recipient" element={<RecipientLayout/>}>
          <Route index element={<AllDonors />} />
          <Route path="/recipient/profile" element={<RecipientProfile />} />
          <Route path="/recipient/CreateRequest" element={<CreateRequest />} />
          <Route path="/recipient/AllDonors" element={<AllDonors />} />
          <Route path="/recipient/changepassword" element={<ChangePassword />} />
          
        </Route>
      </Routes>
    </div>
  );
}

export default App;
