import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../Layout/Sidebar";
import Appointment_Service from "../../../Api/Appointment_Service";
import moment from 'moment';
import * as XLSX from 'xlsx/xlsx.mjs';
import Common_Util from "../../../Utils/Common_Util";

function Appointment_List_Components() {
    const [number, setNumber] = useState(0);
    const [nameSearch, setNameSearch] = useState('');
    const [pageData, setPageData] = useState([]);
    const [maxPage, setMaxPage] = useState(0);
    useEffect(() => {
        fetchData();
        totalPage();
    }, [number]);
    const fetchData = async () => {
        const response = await Appointment_Service.getAppointment(number);
        const data = response.data.content;
        setPageData(data);
        console.log(data);
    }
    const totalPage = () => {
        Appointment_Service.getMaxPage().then((response) => {
            setMaxPage(response.data);
        })
    }
    const handlePreviousPage = () => {
        if (number > 0) {
            setNumber((prevPageNumber) => prevPageNumber - 1);
        }
    };

    const handleNextPage = () => {
        setNumber((prevPageNumber) => prevPageNumber + 1);
        if ((number + 1) === maxPage) {
            setNumber(0);
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
                if (res.status === '200') {
                    alert("Xoá Thành Công!");
                } else {
                    console.error(res.eror());
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
                                <i className="bx bx-filter" />
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
                            <div className="col-md-6">
                                <div class="input-group mb-3">
                                    <input type="text" class="form-control" placeholder="Search" aria-label="Search" aria-describedby="button-addon2" value={nameSearch} onChange={changeNameSearch} />
                                    <Link class="btn btn-outline-secondary" type="button" id="button-addon2" onClick={() => searchByName(nameSearch)}
                                        to={nameSearch === '' ? `/admin/appointment/index` : `/admin/appointment/search/${nameSearch}`}><i class="bx bx-search"></i></Link>
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
                                    <li class="page-item"><button class="page-link" disabled>{number + 1}</button></li>
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
