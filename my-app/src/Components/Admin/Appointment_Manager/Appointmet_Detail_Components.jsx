import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Sidebar from "../Layout/Sidebar";
import Customer_Service from "../../../Api/Customer_Service";
import Appointment_Service from "../../../Api/Appointment_Service";
import moment from 'moment';

function Appointment_Detail_Components() {
    const { id } = useParams();
    const [gioDat, setGioDat] = useState('');
    const [ngayDat, setNgayDat] = useState('');
    const [trangThai, setTrangThai] = useState(1);
    const [loaiLichHen, setLoaiLichHen] = useState(true);
    const [sdt, setSdt] = useState('');
    const [thoiGianDuKien, setThoiGianDuKien] = useState('');
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [customer, setCustomer] = useState([]);
    useEffect(() => {
        Appointment_Service.getById(id).then((response) => {
            let appointment = response.data;
            setGioDat(moment(appointment.thoiGianDat).format('HH:mm:ss'));
            setNgayDat(moment(appointment.thoiGianDat).format('YYYY-MM-DD'));
            setTrangThai(appointment.trangThai);
            setLoaiLichHen(appointment.loaiLichHen);
            setSdt(appointment.sdt);
            setThoiGianDuKien(appointment.thoiGianDuKien);
            setSelectedCustomer(appointment.kh.id);
            console.log(appointment);
        });
        ListCustomer();
    }, [id])
    const ListCustomer = () => {
        Customer_Service.getAllCustomer().then((response) => {
            setCustomer(response.data);
            console.log(customer);
        }).catch((error) => console.log(error));
    }
    const changeHour = (e) => {
        setGioDat(e.target.value);
    }
    const changeDay = (e) => {
        setNgayDat(e.target.value);
    }
    const changeStatus = (e) => {
        setTrangThai(e.target.value);
    }
    const changeSdt = (e) => {
        setSdt(e.target.value);
    }
    const changeTime = (e) => {
        setThoiGianDuKien(e.target.value);
    }
    const changeCustomer = (e) => {
        setSelectedCustomer(e.target.value);
    }
    const updateCustomer = (e) => {
        e.preventDefault();
        var thoiGianDat = ngayDat + "T" + gioDat;
        let appointment = {
            thoiGianDat,
            sdt,
            trangThai,
            loaiLichHen,
            thoiGianDuKien,
            kh: { id: selectedCustomer }
        }
        console.log('appointment =>' + JSON.stringify(appointment));
        Appointment_Service.validateFU(appointment).then((respose) => {
            if (respose.data === "ok") {
                Appointment_Service.update(id, appointment).then((res) => {
                    if (res.status === 200) {
                        alert("Sửa Thành Công!");
                        window.location = "/admin/appointment/index";
                    } else {
                        console.log(res.error);
                    }
                })
            } else {
                alert(respose.data);
            }
        })
    }
    return (
        <>
            <Sidebar />
            <section id="content">
                {/* MAIN */}
                <main>
                    <div>
                        <div className="container">
                            <h2 className="text-center">Add Appointment</h2>
                            <div className="row">
                                <div className="col-md-2 padd2"><Link className="btn btn-success" to="/Admin/Appointment/index">Back</Link></div>
                            </div>
                            <form className="col-md-10" id="myForm">
                                <div className="row">
                                    <div className="col-md-5">
                                        <div className="row">
                                            <label className="form-label">
                                                Thời Gian Đặt
                                            </label>
                                            <select class="form-select" aria-label="Default select example" value={gioDat}
                                                onChange={changeHour}>
                                                <option selected>Open this select menu</option>
                                                <option value="07:30:00">7:30</option>
                                                <option value="08:30:00">8:30</option>
                                                <option value="09:30:00">9:30</option>
                                                <option value="10:30:00">10:30</option>
                                                <option value="11:30:00">11:30</option>
                                                <option value="13:30:00">13:30</option>
                                                <option value="14:30:00">14:30</option>
                                                <option value="15:30:00">15:30</option>
                                                <option value="16:30:00">16:30</option>
                                            </select>
                                            <span className="padd"></span>
                                            <input type="date" value={ngayDat}
                                                onChange={changeDay} className='form-control' />
                                            <span className="padd"></span>
                                        </div>
                                    </div>
                                    <div className="col-md-5">
                                        <div className="row">
                                            <label className="form-label">
                                                Trạng Thái
                                            </label>
                                            <select class="form-select" aria-label="Default select example" value={trangThai} onChange={changeStatus}>
                                                <option value="0" selected>Chờ Xác Nhận</option>
                                                <option value="1">Đã Xác Nhận</option>
                                                <option value="2">Đã Hoàn Thành</option>
                                                <option value="3">Quá Hẹn</option>
                                                <option value="4">Đã Huỷ</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-5">
                                        <div className="row">
                                            <label className="form-label">
                                                Loại Lịch Hẹn
                                            </label>
                                            <div className="form-check">
                                                <input type="radio" className="form-check-input" value="true"
                                                    checked={loaiLichHen} onChange={() => setLoaiLichHen(true)} /> Online
                                            </div>
                                            <div className="form-check">
                                                <input type="radio" className="form-check-input" value="false"
                                                    checked={!loaiLichHen} onChange={() => setLoaiLichHen(false)} /> Offline
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-5">
                                        <div className="row">
                                            <label className="form-label">
                                                Số Điện Thoại
                                            </label>
                                            <input className="form-control" type="text" value={sdt}
                                                onChange={changeSdt} />
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-5">
                                        <div className="row">
                                            <label className="form-label">
                                                Thời Gian Dự Kiến
                                            </label>
                                            <select class="form-select" aria-label="Default select example" value={thoiGianDuKien} onChange={changeTime}>
                                                <option value="0" selected>Open this select menu</option>
                                                <option value="15 Phút">15 Phút</option>
                                                <option value="30 Phút">30 Phút</option>
                                                <option value="1 Giờ">1 Giờ</option>
                                                <option value="2 Giờ">2 Giờ</option>
                                                <option value="4 Giờ">4 Giờ</option>
                                                <option value="null">Chưa Xác Định</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-md-5">
                                        <div className="row">
                                            <label className="form-label">
                                                Khách Hàng
                                            </label>
                                            <select class="form-select" aria-label="Default select example" value={selectedCustomer || ''} onChange={changeCustomer}>
                                                <option value={0}>Select Customer</option>
                                                {customer.map((cus) => (
                                                    <option key={cus.id} value={cus.id}>
                                                        {cus.ho + " " + cus.ten + " " + cus.maKhachHang}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-5">
                                        <div className="row">
                                        </div>
                                    </div>
                                    <div className="col-md-5">
                                        <div className="row">
                                            <div className="col-md-5">
                                                <br />
                                                <button type="submit" className="btn btn-success" onClick={updateCustomer}>Update</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </main>
            </section>
        </>
    );
}

export default Appointment_Detail_Components
