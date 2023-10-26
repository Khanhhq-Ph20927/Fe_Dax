import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../Layout/Sidebar";
import Appointment_Service from "../../../Api/Appointment_Service";
import moment from 'moment';
import * as XLSX from 'xlsx/xlsx.mjs';
import { Modal, Button } from "react-bootstrap";
import Common_Util from "../../../Utils/Common_Util";
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import Customer_Service from "../../../Api/Customer_Service";
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Appointment_List_Components() {

    const [number, setNumber] = useState(0);
    const [numberStatus, setNumberStatus] = useState(0);
    const [numberType, setNumberType] = useState(0);
    const [numberDouble, setNumberDouble] = useState(0);
    const [numberName, setNumberName] = useState(0);
    const [nameSearch, setNameSearch] = useState('');
    const [pageData, setPageData] = useState([]);
    const [maxPage, setMaxPage] = useState(0);
    const [trangThaiFilter, setTrangThaiFilter] = useState(5);
    const [loaiLichHenFilter, setLoaiLichHenFilter] = useState(0);
    const [statusQuery, setStatusQuery] = useState(0);
    const [showModal, setShowModal] = useState(false);
    const [IdAppointment, setIdAppointment] = useState(null);
    const [gioDat, setGioDat] = useState('');
    const [ngayDat, setNgayDat] = useState('');
    const [trangThaiDetail, setTrangThaiDetail] = useState(1);
    const [loaiLichHenDetail, setLoaiLichHenDetail] = useState(true);
    const [sdt, setSdt] = useState('');
    const [thoiGianDuKien, setThoiGianDuKien] = useState('');
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [customer, setCustomer] = useState([]);
    const [customerDetail, setCustomerDetail] = useState(null);
    const [customerValue, setCustomerValue] = useState({});

    const animatedComponents = makeAnimated();

    const myStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    }

    useEffect(() => {
        fetchData();
        ListCustomer();
    }, [number]);

    useEffect(() => {
        fetchDataFilterByStatus();
    }, [numberStatus]);

    useEffect(() => {
        fetchDataFilterByType();
    }, [numberType]);

    useEffect(() => {
        fetchDataFilterByStatusAndType();
    }, [numberDouble]);

    useEffect(() => {
        if (nameSearch != '')
            fetchDataFilterByName();
        else if (nameSearch === '')
            fetchData();
    }, [numberName]);

    useEffect(() => {
        if (nameSearch != '')
            fetchDataFilterByName();
        else if (nameSearch === '')
            fetchData();
    }, [nameSearch]);

    useEffect(() => {
        if (loaiLichHenFilter == 0 && trangThaiFilter == 5) {
            fetchData();
        }
        else if (loaiLichHenFilter != 0 && trangThaiFilter == 5) {
            fetchDataFilterByType();
        }
        else if (loaiLichHenFilter == 0 && trangThaiFilter != 5) {
            fetchDataFilterByStatus();
        }
        else if (loaiLichHenFilter != 0 && trangThaiFilter != 5) {
            fetchDataFilterByStatusAndType();
        }
    }, [loaiLichHenFilter, trangThaiFilter]);

    const fetchData = async () => {
        const response = await Appointment_Service.getAppointment(number);
        const data = response.data.content;
        setPageData(data);
        setStatusQuery(0);
        setMaxPage(response.data.totalPages);
    }

    const fetchDataFilterByStatus = async () => {
        const response = await Appointment_Service.findByStatus(trangThaiFilter, numberStatus);
        const data = response.data.content;
        setPageData(data);
        setStatusQuery(1);
        setMaxPage(response.data.totalPages);
    }

    const fetchDataFilterByType = async () => {
        const response = await Appointment_Service.findByType(loaiLichHenFilter, numberType);
        const data = response.data.content;
        setPageData(data);
        setStatusQuery(2);
        setMaxPage(response.data.totalPages);
    }

    const fetchDataFilterByStatusAndType = async () => {
        const response = await Appointment_Service.findByStatusAndType(trangThaiFilter, loaiLichHenFilter, numberDouble);
        const data = response.data.content;
        setPageData(data);
        console.log(pageData);
        setStatusQuery(3);
        setMaxPage(response.data.totalPages);
    }

    const fetchDataFilterByName = async () => {
        const response = await Appointment_Service.findByName(nameSearch, numberName);
        const data = response.data.content;
        setPageData(data);
        console.log(pageData);
        setStatusQuery(4);
        setMaxPage(response.data.totalPages);
    }

    const ListCustomer = () => {
        Customer_Service.getAllCustomer().then((response) => {
            setCustomer(response.data);
        }).catch((error) => console.log(error));
    }

    const customerOptions = customer.map((customer) => ({
        value: customer.id,
        label: customer.hoTen + " " + customer.maKhachHang
    }))

    const showAppointmentDetailModal = (appointment, id, idA) => {
        fetchData();
        getCustomer(id);
        setIdAppointment(idA);
        setShowModal(true);
        setGioDat(moment(appointment.thoiGianDat).format('HH:mm:ss'));
        setNgayDat(moment(appointment.thoiGianDat).format('YYYY-MM-DD'));
        setTrangThaiDetail(appointment.trangThai);
        setLoaiLichHenDetail(appointment.loaiLichHen);
        setSdt(appointment.sdt);
        setThoiGianDuKien(appointment.thoiGianDuKien);
        setSelectedCustomer(appointment.kh.id);
    }

    const getCustomer = (Id) => {
        if (Id !== null) {
            Customer_Service.getById(Id).then((response) => {
                const data = response.data;
                setCustomerValue({ value: data.id, label: data.hoTen + " " + data.maKhachHang });
            })
        }
    }

    const handlePreviousPage = () => {
        if (statusQuery === 0) {
            if (number > 0) {
                setNumber((prevPageNumber) => prevPageNumber - 1);
            }
        }
        if (statusQuery === 1) {
            if (numberStatus > 0) {
                setNumberStatus((prevPageNumber) => prevPageNumber - 1);
            }
        }
        if (statusQuery === 2) {
            if (numberType > 0) {
                setNumberType((prevPageNumber) => prevPageNumber - 1);
            }
        }
        if (statusQuery === 3) {
            if (numberDouble > 0) {
                setNumberDouble((prevPageNumber) => prevPageNumber - 1);
            }
        }
        if (statusQuery === 4) {
            if (numberName > 0) {
                setNumberName((prevPageNumber) => prevPageNumber - 1);
            }
        }
    };

    const changeStatus = (e) => {
        setTrangThaiFilter(e.target.value);
    }

    const changeType = (e) => {
        setLoaiLichHenFilter(e.target.value);
    }

    const handleNextPage = () => {
        if (statusQuery === 0) {
            setNumber((prevPageNumber) => prevPageNumber + 1);
            if ((number + 1) === maxPage) {
                setNumber(0);
            }
        }
        if (statusQuery === 1) {
            setNumberStatus((prevPageNumber) => prevPageNumber + 1);
            if ((numberStatus + 1) === maxPage) {
                setNumberStatus(0);
            }
        }
        if (statusQuery === 2) {
            setNumberType((prevPageNumber) => prevPageNumber + 1);
            if ((numberType + 1) === maxPage) {
                setNumberType(0);
            }
        }
        if (statusQuery === 3) {
            setNumberDouble((prevPageNumber) => prevPageNumber + 1);
            if ((numberDouble + 1) === maxPage) {
                setNumberDouble(0);
            }
        }
        if (statusQuery === 4) {
            setNumberName((prevPageNumber) => prevPageNumber + 1);
            if ((numberName + 1) === maxPage) {
                setNumberName(0);
            }
        }
    };

    const changeNameSearch = (e) => {
        setNameSearch(e.target.value);
    }

    const searchByName = () => {
        if (nameSearch === '')
            fetchData();
        else
            fetchDataFilterByName();
    }
    const changeHour = (e) => {
        setGioDat(e.target.value);
    }
    const changeDay = (e) => {
        setNgayDat(e.target.value);
    }
    const changeTT = (e) => {
        setTrangThaiDetail(e.target.value);
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
    const updateAppointment = (e) => {
        e.preventDefault();
        let trangThai = trangThaiDetail;
        let loaiLichHen = loaiLichHenDetail;
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
            alert("Hãy Chọn Thời Gian Đặt Lịch Hẹn!");
        } else if (selectedCustomer === null) {
            alert("Hãy Chọn Khách Hàng Đặt Lịch Hẹn!");
        }
        else if (thoiGianDuKien === "0") {
            alert("Hãy Chọn Thời Gian Dự Kiến!");
        } else {
            Appointment_Service.validateFU(appointment, IdAppointment).then((respose) => {
                if (respose.data === "ok") {
                    Appointment_Service.update(IdAppointment, appointment).then((res) => {
                        if (res.status === 200) {
                            toast.success('🦄 Cập Nhật thành công!', {
                                position: "top-right",
                                autoClose: 2000,
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: true,
                                progress: undefined,
                                theme: "light",
                            });
                            fetchData();
                            setShowModal(false);
                        } else {
                            console.log(res.error);
                        }
                    })
                } else {
                    toast.success(respose.data, {
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
    const onchangeExport = async () => {
        const response = await Appointment_Service.getAppointment(number);
        const appointments = response.data.content;
        const data = [
            ['STT', 'Mã Khách Hàng', 'Tên khách hàng', 'Ngày đặt', 'Thời gian đặt', 'Trạng thái', 'Loại'],
            ...appointments.map((appointment, index) => [
                index + 1,
                appointment.kh.maKhachHang,
                appointment.kh.ho + " " + appointment.kh.ten,
                moment(appointment.thoiGianDat).format('YYYY-MM-DD'),
                moment(appointment.thoiGianDat).format('HH:mm'),
                (() => {
                    switch (appointment.trangThai) {
                        case 0:
                            return "Chờ Xác Nhận"
                        case 1:
                            return "Đã Xác Nhận"
                        case 2:
                            return "Đã Hoàn Thành"
                        case 3:
                            return "Quá Hẹn"
                        case 4:
                            return "Đã Huỷ"
                        default:
                            return "Chưa Cập Nhật"
                    }
                })(),
                appointment.loaiLichHen ? "Online" : "Offline"
            ]),
        ];
        await Common_Util.exportExcel(data, "Danh Sách Lịch Hẹn Trang " + (Number(number) + 1), "ListAppointmentPage" + (Number(number) + 1));
    }

    const onchangeImport = async (e) => {
        const selectedFile = e.target.files[0];
        const fileReader = new FileReader();
        fileReader.onload = (e) => {
            const data = new Uint8Array(e.target.result);
            const workbook = XLSX.read(data, { type: 'array' });
            const worksheet = workbook.Sheets[workbook.SheetNames[0]];
            const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
            console.log(jsonData);
        };
        fileReader.readAsArrayBuffer(selectedFile);
    }
    const deleteById = (id) => {
        Swal.fire({
            title: 'Bạn có muốn xoá?',
            text: "Dữ Liệu Liên Quan Đến Lịch Hẹn Sẽ Bị Xoá!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Có, Tôi Đồng Ý!',
            cancelButtonText: 'Không!'
        }).then((result) => {
            if (result.isConfirmed) {
                Appointment_Service.deleteAppointment(id).then((response) => {
                    if (response.data === true) {
                        Swal.fire(
                            'Xoá Thành Công!',
                            '',
                            'success'
                        )
                        fetchData()
                    }
                    else {
                        console.error(response.data);
                    }
                }).catch(error => {
                    console.log(error);
                })
            }
        })
    }
    return (
        <>
            <Sidebar />
            <section id="content">
                <main>
                    <div className="table-data container">
                        <div className="order">
                            <div className="head">
                                <h3>Filter</h3>
                            </div>
                            <div className="row">
                                <div className="col-md-2"> <div>
                                    <Link to="/Admin/Appointment/add" className="btn btn-primary">
                                        Thêm Mới
                                    </Link>
                                </div></div>
                                <div className="col-md-2">  <div>
                                    <button onClick={() => onchangeExport()} className="btn btn-success">
                                        Xuất File Excel
                                    </button>
                                </div></div>
                            </div>
                            <span style={{ paddingtop: 20 }}></span>
                            <div className="row" >
                                <div className="col-md-4"> <div>
                                    <input className="form-control form-control-sm" id="formFileSm" accept=".xlsx" type="file" onChange={(e) => onchangeImport(e)} />
                                </div></div>
                            </div>
                            <div className="row">
                                <div className="col-md-6" style={{ paddingTop: 35 }}>
                                    <div className="input-group mb-3">
                                        <input type="text" class="form-control" placeholder="Search" aria-label="Search" aria-describedby="button-addon2" value={nameSearch} onChange={changeNameSearch} />
                                        <div className="btn btn-outline-secondary" type="button" onClick={() => searchByName()}><i className="bx bx-search"></i></div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="row">
                                        <div className="col-md-1">
                                            <i class="bi bi-filter-left"></i>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="row">
                                                <label className="form-label">
                                                    Loại Lịch Hẹn
                                                </label>
                                                <select className="form-select" aria-label="Default select example" value={loaiLichHenFilter} onChange={changeType} >
                                                    <option selected value="0">Tất Cả</option>
                                                    <option value="true">Online</option>
                                                    <option value="false">Offline</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <label className="form-label">
                                                Trạng Thái
                                            </label>
                                            <select className="form-select" aria-label="Default select example" value={trangThaiFilter} onChange={changeStatus}>
                                                <option selected value="5">Tất Cả</option>
                                                <option value="0">Chờ Xác Nhận</option>
                                                <option value="1">Đã Xác Nhận</option>
                                                <option value="2">Đã Hoàn Thành</option>
                                                <option value="3">Quá Hẹn</option>
                                                <option value="4">Đã Huỷ</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
                <main>
                    <div className="table-data container">
                        <div className="order">
                            <div className="head">
                                <h3>Lịch Hẹn</h3>
                            </div>
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th>STT</th>
                                        <th>Mã Lịch Hẹn</th>
                                        <th>Khách Hàng</th>
                                        <th>Thời Gian Đặt</th>
                                        <th>Thời Gian Dự Kiến</th>
                                        <th>Trạng Thái</th>
                                        <th>Loại Lịch Hẹn</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        pageData.map(
                                            (appoint, index) =>
                                                <tr key={appoint.id}>
                                                    <td>{index + 1}</td>
                                                    <td>{appoint.maLichHen}</td>
                                                    <td>{appoint.kh.hoTen}</td>
                                                    <td>{moment(appoint.thoiGianDat).format('YYYY-MM-DD HH:mm')}</td>
                                                    <td>{appoint.thoiGianDuKien}</td>
                                                    <td>{(() => {
                                                        switch (appoint.trangThai) {
                                                            case 0:
                                                                return "Chờ Xác Nhận"
                                                            case 1:
                                                                return "Đã Xác Nhận"
                                                            case 2:
                                                                return "Đã Hoàn Thành"
                                                            case 3:
                                                                return "Quá Hẹn"
                                                            case 4:
                                                                return "Đã Huỷ"
                                                            default:
                                                                return "Chưa Cập Nhật"
                                                        }
                                                    })()}</td>
                                                    <td>{appoint.loaiLichHen ? "Online" : "Offline"}</td>
                                                    <td><button className='btn btn-danger' onClick={() => deleteById(appoint.id)}><i class="bx bxs-trash"></i></button>
                                                        <span className="padd2"></span>
                                                        <button className='btn btn-success'
                                                            onClick={() => showAppointmentDetailModal(appoint, appoint.kh.id, appoint.id)}
                                                        ><i class="bx bxs-edit"></i></button>
                                                    </td>
                                                </tr>
                                        )}
                                </tbody>
                            </table>
                            <nav aria-label="Page navigation example" style={myStyle}>
                                <ul className="pagination">
                                    <li className="page-item"><button class="page-link" onClick={handlePreviousPage}>Previous</button></li>
                                    <li className="page-item"><button class="page-link" disabled>{(() => {
                                        switch (statusQuery) {
                                            case 0:
                                                return number + 1
                                            case 1:
                                                return numberStatus + 1
                                            case 2:
                                                return numberType + 1
                                            case 3:
                                                return numberDouble + 1
                                            case 4:
                                                return numberName + 1
                                            default:
                                                return number + 1
                                        }
                                    })()}</button></li>
                                    <li className="page-item"><button class="page-link" onClick={handleNextPage}>Next</button></li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                </main>
                {/* MAIN */}
                <Modal show={showModal} onHide={() => setShowModal(false)} size="lg" aria-labelledby="contained-modal-title-vcenter">
                    <Modal.Header closeButton>
                        <Modal.Title>Chi tiết lịch hẹn</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form className="col-md-12" id="myForm" onSubmit={updateAppointment}>
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
                                        <select class="form-select" aria-label="Default select example" value={trangThaiDetail} onChange={changeTT}>
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
                            <span style={{ paddingtop: 20 }}></span>
                            <div className="row">
                                <div className="col-md-6 padd2">
                                    <div className="row">
                                        <label className="form-label">
                                            Loại Lịch Hẹn
                                        </label>
                                        <div className="form-check">
                                            <input type="radio" className="form-check-input" value="true"
                                                checked={loaiLichHenDetail} onChange={() => setLoaiLichHenDetail(true)} /> Online
                                        </div>
                                        <div className="form-check">
                                            <input type="radio" className="form-check-input" value="false"
                                                checked={!loaiLichHenDetail} onChange={() => setLoaiLichHenDetail(false)} /> Offline
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6 padd2">
                                    <div className="row">
                                        <label className="form-label">
                                            Số Điện Thoại
                                        </label>
                                        <input className="form-control" type="text" value={sdt}
                                            onChange={changeSdt} />
                                    </div>
                                </div>
                            </div>
                            <span style={{ paddingtop: 20 }}></span>
                            <div className="row" style={myStyle}>
                                <div className="col-md-6 padd2">
                                    <div className="row">
                                        <label className="form-label text-center">
                                            Khách Hàng
                                        </label>
                                        <Select
                                            value={customerValue}
                                            onChange={changeCustomer}
                                            closeMenuOnSelect={false}
                                            components={animatedComponents}
                                            options={customerOptions}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12 d-flex justify-content-center mt-3">
                                    <button type="submit" className="btn btn-success">Cập Nhật</button>
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

export default Appointment_List_Components
