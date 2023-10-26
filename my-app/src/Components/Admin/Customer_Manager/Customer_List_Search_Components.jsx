import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Sidebar from "../Layout/Sidebar";
import Customer_Service from "../../../Api/Customer_Service";

function Customer_List_Search_Components() {
    const { name } = useParams();
    const [number, setNumber] = useState(0);
    const [pageData, setPageData] = useState([]);
    const [appointment, setAppointment] = useState([]);
    const [maxPage, setMaxPage] = useState(0);
    useEffect(() => {
        Customer_Service.searchByName(name, number).then((response) => {
            setPageData(response.data.content);
            console.log(response.data.totalPages);
            console.log(response.data);
            setMaxPage(response.data.totalPages);
        });
    }, [number])
    const fetchData = async () => {
        try {
            const response = await Customer_Service.getCustomer(number);
            const data = response.data.content;
            setPageData(data);
        } catch (error) { console.log(error); }
    };
    const ListAppoiment = (id) => {
        console.log(id);
        Customer_Service.getAppointmentByCustomer(id).then((response) => {
            setAppointment(response.data);
            console.log(response.data);
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
    const deleteById = (id) => {
        ListAppoiment(id);
        if (window.confirm('Bạn Có Chắc Chắn Muốn Xoá!')) {
            if (appointment.length === 0) {
                Customer_Service.deleteCustomer(id).then((response) => {
                    if (response.status === 200) {
                        alert('Delete successfully');
                    }
                    fetchData();
                }).catch(error => {
                    console.log(error);
                })
            } else {
                if (window.confirm('Nếu đồng ý , tất cả dữ liệu lên quan đến khách hàng này sẽ bị xoá!')) {
                    Customer_Service.deleteCustomer(id).then((response) => {
                        if (response.status === 200) {
                            alert('Delete successfully');
                        }
                        fetchData();
                    }).catch(error => {
                        console.log(error);
                    })
                }
            }
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
                                <h3>Khách Hàng</h3>
                                <i className="bx bx-filter" />
                                <div>
                                    <Link to="/Admin/Customer/index" className="btn btn-primary">
                                        Back
                                    </Link>
                                </div>
                            </div>
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th>STT</th>
                                        <th>Mã Khách Hàng</th>
                                        <th>Họ Tên</th>
                                        <th>Email</th>
                                        <th>Số Điện Thoại</th>
                                        <th>Địa Chỉ</th>
                                        <th>Giới Tính</th>
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
                                                    <td>{customer.hoTen}</td>
                                                    <td>{customer.email}</td>
                                                    <td>{customer.sdt}</td>
                                                    <td>{customer.tinhThanh + ", " + customer.quanHuyen}</td>
                                                    <td>{customer.gioiTinh === true ? "Nam" : "Nữ"}</td>
                                                    <td><button className='btn btn-danger' onClick={() => deleteById(customer.id)}>Delete</button>
                                                        <span className="padd2"></span>
                                                        <Link className='btn btn-success' to={`/admin/customer/detail/${customer.id}`}>Detail</Link>
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

export default Customer_List_Search_Components
