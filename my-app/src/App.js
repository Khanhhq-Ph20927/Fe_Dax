import { Routes, Route } from "react-router-dom";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Home_Page from "./Components/Home/Home_Page";
import Service from "./Components/Home/Service";
import About from "./Components/Home/About";
import Booking from "./Components/Home/Booking";
import Contact from "./Components/Home/Contact";
import Login from "./Components/Account/Login";
import Register from "./Components/Account/Register";
import Create_Customer_Components from "./Components/Admin/Customer_Manager/Create_Customer_Component";
import Customer_List_Components from "./Components/Admin/Customer_Manager/Customer_List_Components";
import Customer_Detail_Components from "./Components/Admin/Customer_Manager/Customer_Detail_Components";
import { APP_ROUTERS } from "./Contants";
import Customer_List_Search_Components from "./Components/Admin/Customer_Manager/Customer_List_Search_Components";
import Appointment_List_Components from "./Components/Admin/Appointment_Manager/Appointment_List_Components";
import Create_Appointment_Components from "./Components/Admin/Appointment_Manager/Create_Appointment_Components";
import Appointment_Detail_Components from "./Components/Admin/Appointment_Manager/Appointmet_Detail_Components";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/" excact element={<Home_Page />}></Route>
        <Route path="/home" element={<Home_Page />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/service" element={<Service />}></Route>
        <Route path="/booking" element={<Booking />}></Route>
        <Route path="/contact" element={<Contact />}></Route>
        <Route path={APP_ROUTERS.CUSTOMER.ADD.VALUE} element={<Create_Customer_Components />}></Route>
        <Route path={APP_ROUTERS.CUSTOMER.INDEX.VALUE} element={<Customer_List_Components />}></Route>
        <Route path={APP_ROUTERS.CUSTOMER.DETAIL.VALUE} element={<Customer_Detail_Components />}></Route>
        <Route path={APP_ROUTERS.CUSTOMER.SEARCH.VALUE} element={<Customer_List_Search_Components />}></Route>
        <Route path={APP_ROUTERS.APPOINTMENT.INDEX.VALUE} element={<Appointment_List_Components />}></Route>
        <Route path={APP_ROUTERS.APPOINTMENT.ADD.VALUE} element={<Create_Appointment_Components />}></Route>
        <Route path={APP_ROUTERS.APPOINTMENT.DETAIL.VALUE} element={<Appointment_Detail_Components />}></Route>
      </Routes>
    </div>
  );
}
export default App;
