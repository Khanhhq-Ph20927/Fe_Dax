import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../Layout/Sidebar";
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import Customer_Service from "../../../Api/Customer_Service";
import { Modal, Button } from "react-bootstrap";
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Province_Service from "../../../Api/Province_Service";
import Appointment_Service from "../../../Api/Appointment_Service";


function Create_Appointment_Components() {
    const [gioDat, setGioDat] = useState('');
    const [ngayDat, setNgayDat] = useState('');
    const [trangThai, setTrangThai] = useState(1);
    const [loaiLichHen, setLoaiLichHen] = useState(true);
    const [sdt, setSdt] = useState('');
    const [thoiGianDuKien, setThoiGianDuKien] = useState(0);
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [customer, setCustomer] = useState([]);
    const animatedComponents = makeAnimated();
    const [showModal, setShowModal] = useState(false);
    const [hoTen, setHoTen] = useState('');
    const [email, setEmail] = useState('');
    const [sdtCustomer, setSdtCustomer] = useState('');
    const [ttp, setTTP] = useState('');
    const [qh, setQH] = useState('');
    const [gioiTinh, setGioiTinh] = useState(true);
    const [province, setProvince] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [selectedDistricts, setSelectedDistricts] = useState([]);
    const [selectedProvince, setSelectedProvince] = useState(null);

    const myStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    }

    useEffect(() => {
        ListCustomer();
        ListProvince();
        ListDistricts();
    }, [])
    useEffect(() => {
        getDistricts();
    }, [selectedProvince]);
    const ListCustomer = () => {
        Customer_Service.getAllCustomer().then((response) => {
            setCustomer(response.data);
            console.log(customer);
        }).catch((error) => console.log(error));
    }

    const customerOptions = customer.map((customer) => ({
        value: customer.id,
        label: customer.hoTen + " " + customer.maKhachHang
    }))

    const showModalAddCustomer = () => {
        setShowModal(true);
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
    const changeCustomer = (selectedOptions) => {
        setSelectedCustomer(selectedOptions.value);
    }
    const ListProvince = () => new Promise(async (resolve, reject) => {
        try {
            const response = await Province_Service.getProvince();
            setProvince(response);
            resolve(response);
        } catch (error) {
            console.error(error);
        }
    });
    const ListDistricts = () => new Promise(async (resolve, reject) => {
        try {
            const response = await Province_Service.getDistricts();
            setDistricts(response);
            resolve(response);
        } catch (error) {
            console.error(error);
        }
    });

    const Provinces = province.map((pro) => ({
        value: pro.code,
        label: pro.name,

    }));

    const getDistricts = async () => {
        if (selectedProvince === null) {
            setSelectedDistricts(districts);
        } else {
            const response = await Province_Service.getDistrictsByCode(selectedProvince);
            const data = response.districts;
            setSelectedDistricts(data);
        }
    };
    const Districtss = districts.map((dis) => ({
        value: dis.code,
        label: dis.name,

    }));

    const Districtsss = selectedDistricts.map((dis) => ({
        value: dis.code,
        label: dis.name,

    }));


    const changeName = (e) => {
        setHoTen(e.target.value);
    }

    const changeEmail = (e) => {
        setEmail(e.target.value);
    }

    const changeNumberPhone = (e) => {
        setSdtCustomer(e.target.value);
    }

    const changeTTP = (selectedOptions) => {
        setTTP(selectedOptions.label);
        console.log(selectedOptions);
        if (selectedOptions) {
            setSelectedProvince(selectedOptions.value);
        }
    }

    const changeQH = (selectedOptions) => {
        setQH(selectedOptions.label);
    }

    const saveCustomer = (e) => {
        e.preventDefault();
        let tinhThanhPho = ttp;
        let quanHuyen = qh;
        let newCustomer = {
            hoTen,
            email,
            sdt,
            tinhThanhPho,
            quanHuyen,
            gioiTinh,
            matKhau: "12345",
        }
        console.log('customer =>' + JSON.stringify(newCustomer));
        Customer_Service.validate(newCustomer).then((response) => {
            if (response.data === "ok")
                Customer_Service.saveCustomer(newCustomer).then(() => {
                    toast.success('🦄Thêm thành công!', {
                        position: "top-right",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });
                    setShowModal(false);
                    ListCustomer();
                });
            else
                toast.error(response.data, {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
        })
    }
    const saveAppointment = (e) => {
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
        if (ngayDat === '' || gioDat === '') {
            toast.error('Hãy Chọn Thời Gian Đặt Lịch Hẹn!', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        } else if (selectedCustomer === null) {
            toast.error('Hãy Chọn Khách Hàng Đặt Lịch Hẹn!', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
        else if (thoiGianDuKien === "0") {
            toast.error('Hãy Chọn Thời Gian Dự Kiến!', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
        else {
            Appointment_Service.validate(appointment).then((respose) => {
                if (respose.data === "ok") {
                    Swal.fire({
                        title: 'Bạn có Thêm?',
                        icon: 'info',
                        showCancelButton: true,
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33',
                        confirmButtonText: 'Có, Tôi Đồng Ý!',
                        cancelButtonText: 'Không!'
                    }).then((result) => {
                        if (result.isConfirmed) {
                            Appointment_Service.saveAppointment(appointment).then((res) => {
                                if (res.status === 200) {
                                    toast.success('Thêm thành công!', {
                                        position: "top-right",
                                        autoClose: 2000,
                                        hideProgressBar: false,
                                        closeOnClick: true,
                                        pauseOnHover: true,
                                        draggable: true,
                                        progress: undefined,
                                        theme: "light",
                                    });
                                    window.location = "/admin/appointment/index";
                                } else {
                                    console.log(res.error);
                                }
                            })
                        }
                    })
                } else {
                    toast.error(respose.data, {
                        position: "top-right",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });
                }
            })
        }
    }
    return (
        <>
            <Sidebar />
            <section id="content">
                <main>
                    <div className="row">
                        <div className="col-md-2 padd2"><Link className="btn btn-success" to="/Admin/Appointment/index">Back</Link></div>
                    </div>
                    <div className="table-data container" style={{ width: 1000 }}>
                        <div className="order">
                            <div className="container">
                                <h2>Thêm Lịch Hẹn</h2>
                                <span style={{ paddingtop: 20 }}></span>
                                <form className="col-md-12" id="myForm">
                                    <div className="row">
                                        <div className="col-md-6 padd2">
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
                                            </div>
                                            <span style={{ paddingtop: 20 }}></span>
                                            <div className="row">
                                                <label className="form-label">
                                                    Ngày Đặt
                                                </label>
                                                <input type="date" value={ngayDat}
                                                    onChange={changeDay} className='form-control' />
                                            </div>
                                        </div>
                                        <div className="col-md-6 padd2">
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
                                            <span style={{ paddingtop: 20 }}></span>
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
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6 padd2">
                                            <span style={{ paddingtop: 20 }}></span>
                                            <div className="row">
                                                <label className="form-label">
                                                    Loại Lịch Hẹn
                                                </label>
                                                <div className="form-check" style={{ paddingLeft: 35 }}>
                                                    <input type="radio" className="form-check-input" value="true"
                                                        checked={loaiLichHen} onChange={() => setLoaiLichHen(true)} /> Online
                                                </div>
                                                <div className="form-check" style={{ paddingLeft: 35 }}>
                                                    <input type="radio" className="form-check-input" value="false"
                                                        checked={!loaiLichHen} onChange={() => setLoaiLichHen(false)} /> Offline
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-6 padd2">
                                            <span style={{ paddingtop: 20 }}></span>
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
                                        <div className="col-md-6">
                                            <div className="col-md-12" >
                                                <span style={{ paddingtop: 20 }}></span>
                                                <div className="row">
                                                    <label className="form-label text-center">
                                                        Khách Hàng
                                                    </label>
                                                    <Select
                                                        onChange={changeCustomer}
                                                        closeMenuOnSelect={false}
                                                        components={animatedComponents}
                                                        options={customerOptions}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-2"> <div className="col-md-1" style={{ marginTop: 55 }}>
                                            <div className="btn btn-success" onClick={() => showModalAddCustomer()}><i class='bx bxs-message-square-add'></i></div>
                                        </div></div>
                                    </div>
                                    <div className="row" style={{ paddingTop: 20 }}>
                                        <div className="col-md-12 d-flex justify-content-center mt-3">
                                            <button type="submit" className="btn btn-success" onClick={saveAppointment}>Thêm</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </main>
                <Modal show={showModal} onHide={() => setShowModal(false)} size="lg" aria-labelledby="contained-modal-title-vcenter">
                    <Modal.Header closeButton>
                        <Modal.Title>Tạo Khách Hàng</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form className="col-md-12" id="myForm">
                            <div className="row">
                                <div className="col-md-6 padd2">
                                    <div className="row">
                                        <label className="form-label padd3">
                                            Họ Tên
                                        </label>
                                        <input type="text" value={hoTen}
                                            onChange={changeName} className='form-control' />
                                    </div>
                                </div>
                                <div className="col-md-6 padd2">
                                    <div className="row">
                                        <label className="form-label padd3">
                                            Email
                                        </label>
                                        <input className="form-control" type="email" value={email}
                                            onChange={changeEmail} />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6 padd2">
                                    <div className="row">
                                        <label className="form-label padd3">
                                            Số Điện Thoại
                                        </label>
                                        <input className="form-control" type="text" value={sdt}
                                            onChange={changeSdt} />
                                    </div>
                                </div>
                                <div className="col-md-6 padd2">
                                    <div className="row">
                                        <label className="form-label padd3">
                                            Giới Tính
                                        </label>
                                        <div className="form-check">
                                            <input type="radio" className="form-check-input" value="true"
                                                checked={gioiTinh} onChange={() => setGioiTinh(true)} /> Nam
                                        </div>
                                        <div className="form-check">
                                            <input type="radio" className="form-check-input" value="false"
                                                checked={!gioiTinh} onChange={() => setGioiTinh(false)} /> Nữ
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6 padd2">
                                    <div className="row">
                                        <label className="form-label padd3">
                                            Tỉnh, Thành Phố
                                        </label>
                                        <Select
                                            onChange={changeTTP}
                                            closeMenuOnSelect={false}
                                            components={animatedComponents}
                                            options={Provinces}
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6 padd2">
                                    <div className="row">
                                        <label className="form-label padd3">
                                            Quận Huyện
                                        </label>
                                        <Select
                                            onChange={changeQH}
                                            closeMenuOnSelect={false}
                                            components={animatedComponents}
                                            options={selectedProvince === null ? Districtss : Districtsss}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6 padd2">
                                </div>
                                <div className="col-md-6 padd2">
                                    <div className="row">
                                        <div className="col-md-6 padd2" >
                                            <br />
                                            <div style={{ paddingtop: 27 }}>
                                                <button type="submit" className="btn btn-success" onClick={saveCustomer} >Thêm</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </Modal.Body>
                    <Modal.Footer>
                    </Modal.Footer>
                </Modal>
            </section>
        </>
    );
}

export default Create_Appointment_Components
