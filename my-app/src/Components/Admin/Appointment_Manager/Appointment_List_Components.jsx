import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../Layout/Sidebar";
import Appointment_Service from "../../../Api/Appointment_Service";

function Appointment_List_Components() {
    const [number, setNumber] = useState(0);
    const [nameSearch, setNameSearch] = useState('');
    const [pageData, setPageData] = useState([]);
    useEffect(() => {

    }, [number]);
    const fetchData = async () => {
        const response = await Appointment_Service.getAppointment(number);
        const data = response.data.content;
        setPageData(data);
    }
    const handlePreviousPage = () => {
        if (number > 0) {
            setNumber((prevPageNumber) => prevPageNumber - 1);
        }
    };

    const handleNextPage = () => {
        setNumber((prevPageNumber) => prevPageNumber + 1);
    };
    const changeNameSearch = (e) => {
        setNameSearch(e.target.value);
    }
    const searchByName = (e) => {

    }
    const deleteById = (e) => {

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
                                <h3>Khách Hàng</h3>
                                <i className="bx bx-filter" />
                                <div>
                                    <Link to="/Admin/Customer/add" className="btn btn-primary">
                                        Add
                                    </Link>
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
                                            (customer, index) =>
                                                <tr key={customer.id}>
                                                    <td>{index + 1}</td>
                                                    <td>{customer.maKhachHang}</td>
                                                    <td>{customer.ho}</td>
                                                    <td>{customer.ten}</td>
                                                    <td>{customer.email}</td>
                                                    <td>{customer.sdt}</td>
                                                    <td>{customer.diaChi}</td>
                                                    <td>{customer.gioiTinh === true ? "Nam" : "Nữ"}</td>
                                                    <td><button className='btn btn-danger' onClick={() => deleteById()}>Delete</button>
                                                        <span className="padd"></span>
                                                        <Link className='btn btn-success' to={``}>Detail</Link>
                                                    </td>
                                                </tr>
                                        )}
                                </tbody>
                            </table>
                            <nav aria-label="Page navigation example">
                                <ul class="pagination">
                                    <li class="page-item"><button class="page-link" onClick={handlePreviousPage}>Previous</button></li>
                                    <li class="page-item"><button class="page-link" disabled>{number}</button></li>
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
