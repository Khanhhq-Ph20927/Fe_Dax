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
// <<<<<<< HEAD
import Sidebarnv from "./Components/Staff/Layout/Sidebarnv";
import { APP_ROUTERS } from "./constants";
import ListChucVu from "./Components/Admin/ChucVu/ListChucVu";
import ListNhaCC from "./Components/Admin/NhaCC/ListNhaCC";
import ListPhuKien from "./Components/Admin/PhuKien/ListPhuKien";
import Add_PhuKien from "./Components/Admin/PhuKien/Add_phukien";
import UpdatePhuKien from "./Components/Admin/PhuKien/UpdatePhuKien";
import ListNhanVien from "./Components/Admin/NhanVien/ListNhanVien";
import Add_nhanvien from "./Components/Admin/NhanVien/Add_nhanvien";
import UpdateNhanVien from "./Components/Admin/NhanVien/UpdateNhanVien";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ListMauXe from "./Components/Admin/MauXe/ListMauXe";
import AddMauXe from "./Components/Admin/MauXe/Add_MauXe";
import ListChiTietPT from "./Components/Admin/ChiTietPhuTung/ListTietPhuTung";
import AddChiTietPT from "./Components/Admin/ChiTietPhuTung/Add_ChiTietPhuTung";
import ListXemLich from "./Components/Staff/XemLich/ListXemLich";

// =======
// import { APP_ROUTERS } from "./constants";
// import IndexDV from "./Components/Admin/DichVu/IndexDV";
// import AddDV from "./Components/Admin/DichVu/AddDV";
// import UpdateLDV from "./Components/Admin/LoaiDV/UpdateLDV";
// import IndexLDV from "./Components/Admin/LoaiDV/IndexLDV";
// import AddLDV from "./Components/Admin/LoaiDV/AddLDV";
// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// >>>>>>> Khanhhq
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
        {/* <<<<<<< HEAD
        <Route path="/Staff" element={<Sidebarnv/>}></Route>   
        <Route path="/Admin" element={<Sidebar />}></Route>
        <Route path={APP_ROUTERS.CHUCVU.INDEX.VALUE} element={<ListChucVu />}></Route>
        <Route path={APP_ROUTERS.NHANVIEN.INDEX.VALUE} element={<ListNhanVien />}></Route>
        <Route path={APP_ROUTERS.NHANVIEN.ADD.VALUE} element={<Add_nhanvien />}></Route>
        <Route path={APP_ROUTERS.NHANVIEN.UPDATE.VALUE} element={<UpdateNhanVien />}></Route>
        <Route path={APP_ROUTERS.NHANVIEN.INDEX.VALUE} element={<ListNhaCC />}></Route>
        <Route path={APP_ROUTERS.PHUKIEN.INDEX.VALUE} element={<ListPhuKien />}></Route>
        <Route path={APP_ROUTERS.PHUKIEN.ADD.VALUE} element={<Add_PhuKien />}></Route>
        <Route path={APP_ROUTERS.PHUKIEN.UPDATE.VALUE} element={<UpdatePhuKien />}></Route>
        <Route path={APP_ROUTERS.MAUXE.INDEX.VALUE} element={<ListMauXe />}></Route>
        <Route path={APP_ROUTERS.MAUXE.ADD.VALUE} element={<AddMauXe />}></Route>
        <Route path={APP_ROUTERS.CHITIETPT.INDEX.VALUE} element={<ListChiTietPT />}></Route>
        <Route path={APP_ROUTERS.CHITIETPT.ADD.VALUE} element={<AddChiTietPT />}></Route>
        <Route path={APP_ROUTERS.XEMLICH.INDEX.VALUE} element={<ListXemLich />}></Route>
======= */}
        {/* <Route
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
          path={APP_ROUTERS.LoaiDichVu.SEARCH_TEN2.VALUE}
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
>>>>>>> Khanhhq */}
      </Routes>
      <ToastContainer />
    </div>
  );
}
export default App;
