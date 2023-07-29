import { Routes, Route } from "react-router-dom";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Home_Page from "./Components/Home/Home_Page";
import Service from "./Components/Home/Service";
import About from "./Components/Home/About";
import Booking from "./Components/Home/Booking";
import Contact from "./Components/Home/Contact";
import Login from "./Components/Account/Login";
import Register from "./Components/Account/Register";
import Sidebar from "./Components/Admin/Layout/Sidebar";
import { APP_ROUTERS } from "./constants";
import IndexDV from "./Components/Admin/DichVu/IndexDV";
import AddDV from "./Components/Admin/DichVu/AddDV";
import UpdateLDV from "./Components/Admin/LoaiDV/UpdateLDV";
import IndexLDV from "./Components/Admin/LoaiDV/IndexLDV";
import AddLDV from "./Components/Admin/LoaiDV/AddLDV";

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
        <Route path="/Admin" element={<Sidebar />}></Route>
        <Route
          path={APP_ROUTERS.DichVu.INDEX.VALUE}
          element={<IndexDV />}
        ></Route>
        <Route path={APP_ROUTERS.DichVu.ADD.VALUE} element={<AddDV />}></Route>
        <Route
          path={APP_ROUTERS.DichVu.SEARCH_TEN.VALUE}
          element={<IndexDV />}
        ></Route>
        <Route
          path={APP_ROUTERS.DichVu.DETAIL.VALUE}
          element={<IndexDV />}
        ></Route>
        <Route
          path={APP_ROUTERS.DichVu.DELETE.VALUE}
          element={<IndexDV />}
        ></Route>
        <Route
          path={APP_ROUTERS.LoaiDichVu.INDEX.VALUE}
          element={<IndexLDV />}
        ></Route>
        <Route
          path={APP_ROUTERS.LoaiDichVu.ADD.VALUE}
          element={<AddLDV />}
        ></Route>
        <Route
          path={APP_ROUTERS.LoaiDichVu.DETAIL.VALUE}
          element={<IndexLDV />}
        ></Route>
        <Route
          path={APP_ROUTERS.LoaiDichVu.DELETE.VALUE}
          element={<IndexLDV />}
        ></Route>
      </Routes>
    </div>
  );
}
export default App;
