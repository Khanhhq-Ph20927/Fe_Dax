import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../Layout/Sidebar";
import Appointment_Service from "../../../Api/Appointment_Service";
import moment from 'moment';
import * as XLSX from 'xlsx/xlsx.mjs';
import Common_Util from "../../../Utils/Common_Util";

function Appointment_List_Components() {
    const [number, setNumber] = useState(0);
    const [numberStatus, setNumberStatus] = useState(0);
    const [numberType, setNumberType] = useState(0);
    const [numberDouble, setNumberDouble] = useState(0);
    const [nameSearch, setNameSearch] = useState('');
    const [pageData, setPageData] = useState([]);
    const [maxPage, setMaxPage] = useState(0);
    const [trangThai, setTrangThai] = useState(5);
    const [loaiLichHen, setLoaiLichHen] = useState(0);
    const [statusQuery, setStatusQuery] = useState(0);

    useEffect(() => {
        fetchData();
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

    // useEffect(() => {
    //     if (trangThai == 5)
    //         fetchData();
    //     else
    //         fetchDataFilterByStatus();
    // }, [trangThai]);

    // useEffect(() => {
    //     if (loaiLichHen == 0) {
    //         fetchData();
    //     } else {
    //         fetchDataFilterByType();
    //     }
    // }, [loaiLichHen]);

    useEffect(() => {
        if (loaiLichHen == 0 && trangThai == 5) {
            fetchData();
        }
        else if (loaiLichHen != 0 && trangThai == 5) {
            fetchDataFilterByType();
        }
        else if (loaiLichHen == 0 && trangThai != 5) {
            fetchDataFilterByStatus();
        }
        else if (loaiLichHen != 0 && trangThai != 5) {
            console.log(loaiLichHen, trangThai);
            fetchDataFilterByStatusAndType();
        }
    }, [loaiLichHen, trangThai]);

    const fetchData = async () => {
        const response = await Appointment_Service.getAppointment(number);
        const data = response.data.content;
        setPageData(data);
        setStatusQuery(0);
        setMaxPage(response.data.totalPages);
    }

    const fetchDataFilterByStatus = async () => {
        const response = await Appointment_Service.findByStatus(trangThai, numberStatus);
        const data = response.data.content;
        setPageData(data);
        setStatusQuery(1);
        setMaxPage(response.data.totalPages);
    }

    const fetchDataFilterByType = async () => {
        const response = await Appointment_Service.findByType(loaiLichHen, numberType);
        const data = response.data.content;
        setPageData(data);
        setStatusQuery(2);
        setMaxPage(response.data.totalPages);
    }

    const fetchDataFilterByStatusAndType = async () => {
        const response = await Appointment_Service.findByStatusAndType(trangThai, loaiLichHen, numberDouble);
        const data = response.data.content;
        setPageData(data);
        console.log(pageData);
        setStatusQuery(3);
        setMaxPage(response.data.totalPages);
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
    };

    const changeStatus = (e) => {
        setTrangThai(e.target.value);
    }

    const changeType = (e) => {
        setLoaiLichHen(e.target.value);
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
    };

    const changeNameSearch = (e) => {
        setNameSearch(e.target.value);

    }

    const searchByName = (e) => {

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
        if (window.confirm("Bạn Có Muốn Xoá! Nếu Đồng Ý , 1 Vài Dữ Liệu Liên Quan Sẽ Bị Xoá Theo!")) {
            Appointment_Service.deleteAppointment(id).then((res) => {
                if (res.data === true) {
                    alert("Xoá Thành Công!");
                    fetchData();
                } else {
                    console.error(res.data);
                }
            })
        }
    }
    return (
        <>
            <Sidebar />
            <section id="content">
                {/* MAIN */}
                <main>
                    <div className="table-data container">
                        <div className="order">
                            <div className="head">
                                <h3>Lịch Hẹn</h3>
                                <div>
                                    <Link to="/Admin/Appointment/add" className="btn btn-primary">
                                        Add
                                    </Link>
                                </div>
                                <div>
                                    <button onClick={() => onchangeExport()} className="btn btn-success">
                                        Export
                                    </button>
                                </div>
                                <div>
                                    <input className="form-control form-control-sm" id="formFileSm" accept=".xlsx" type="file" onChange={(e) => onchangeImport(e)} />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <div class="input-group mb-3">
                                        <input type="text" class="form-control" placeholder="Search" aria-label="Search" aria-describedby="button-addon2" value={nameSearch} onChange={changeNameSearch} />
                                        <Link class="btn btn-outline-secondary" type="button" id="button-addon2" onClick={() => searchByName(nameSearch)}
                                            to={nameSearch === '' ? `/admin/appointment/index` : `/admin/appointment/search/${nameSearch}`}><i class="bx bx-search"></i></Link>
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
                                                <select class="form-select" aria-label="Default select example" value={loaiLichHen} onChange={changeType}>
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
                                            <select class="form-select" aria-label="Default select example" value={trangThai} onChange={changeStatus}>
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
                                                    <td>{appoint.kh.ho + " " + appoint.kh.ten}</td>
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
                                                    <td><button className='btn btn-danger' onClick={() => deleteById(appoint.id)}>Delete</button>
                                                        <span className="padd2"></span>
                                                        <Link className='btn btn-success' to={``}>Detail</Link>
                                                    </td>
                                                </tr>
                                        )}
                                </tbody>
                            </table>
                            <nav aria-label="Page navigation example">
                                <ul class="pagination">
                                    <li class="page-item"><button class="page-link" onClick={handlePreviousPage}>Previous</button></li>
                                    <li class="page-item"><button class="page-link" disabled>{(() => {
                                        switch (statusQuery) {
                                            case 0:
                                                return number + 1
                                            case 1:
                                                return numberStatus + 1
                                            case 2:
                                                return numberType + 1
                                            case 3:
                                                return numberDouble + 1
                                            default:
                                                return number + 1
                                        }
                                    })()}</button></li>
                                    <li class="page-item"><button class="page-link" onClick={handleNextPage}>Next</button></li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                </main>
                {/* MAIN */}
            </section>
        </>
    );
}

export default Appointment_List_Components
