import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../Layout/Sidebar";
import Customer_Service from "../../../Api/Customer_Service";
import Common_Util from "../../../Utils/Common_Util";
import * as XLSX from 'xlsx/xlsx.mjs'

export default function Customer_List_Components() {
    const [number, setNumber] = useState(0);
    const [pageData, setPageData] = useState([]);
    const [appointment, setAppointment] = useState([]);
    const [nameSearch, setNameSearch] = useState('');
    useEffect(() => {
        fetchData();
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
    };
    const changeNameSearch = (e) => {
        setNameSearch(e.target.value);
    }
    const searchByName = (nameSearch) => {
        if (nameSearch.length === 0) {
            alert("Hãy Nhập Keyword!");
            return;
        }
    }
    const onchangeExport = async () => {
        const response = await Customer_Service.getCustomer(number);
        const data = response.data.content;
        await Common_Util.exportExcel(data, "Danh Sách Khách Hàng Trang " + (Number(number) + 1), "ListCustomer");
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
            if (window.confirm('Bạn Có Muốn Thêm Dữ Liệu Vào Hệ Thống!')) {
                for (let index = 1; index < jsonData.length; index++) {
                    const ho = jsonData[index][2];
                    const ten = jsonData[index][3];
                    const email = jsonData[index][4];
                    const sdt = jsonData[index][5];
                    const diaChi = jsonData[index][6];
                    const gioiTinh = jsonData[index][7];
                    const customer = {
                        ho,
                        ten,
                        email,
                        sdt,
                        diaChi,
                        gioiTinh
                    }
                    Customer_Service.saveCustomer(customer).then((response) => {
                        if (response.status === 200) {
                            console.log("success");
                            fetchData();
                        } else {
                            console.log("fail");
                        }
                    });
                }
            }
        };
        fileReader.readAsArrayBuffer(selectedFile);
    }
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
                                    <Link to="/Admin/Customer/add" className="btn btn-primary">
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
                                <div className="input-group mb-3">
                                    <input type="text" class="form-control" placeholder="Search" aria-label="Search" aria-describedby="button-addon2" value={nameSearch} onChange={changeNameSearch} />
                                    <Link className="btn btn-outline-secondary" type="button" id="button-addon2" onClick={() => searchByName(nameSearch)}
                                        to={nameSearch === '' ? `/admin/customer/index` : `/admin/customer/search/${nameSearch}`}><i class="bx bx-search"></i></Link>
                                </div>
                            </div>
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th>STT</th>
                                        <th>Mã Khách Hàng</th>
                                        <th>Họ</th>
                                        <th>Tên</th>
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
                                                    <td>{customer.ho}</td>
                                                    <td>{customer.ten}</td>
                                                    <td>{customer.email}</td>
                                                    <td>{customer.sdt}</td>
                                                    <td>{customer.diaChi}</td>
                                                    <td>{customer.gioiTinh === true ? "Nam" : "Nữ"}</td>
                                                    <td><button className='btn btn-danger' onClick={() => deleteById(customer.id)}>Delete</button>
                                                        <span className="padd"></span>
                                                        <Link className='btn btn-success' to={`/admin/customer/detail/${customer.id}`}>Detail</Link>
                                                    </td>
                                                </tr>

                                        )}
                                </tbody>
                            </table>
                            <nav aria-label="Page navigation example">
                                <ul class="pagination">
                                    <li className="page-item"><button className="page-link" onClick={handlePreviousPage}>Previous</button></li>
                                    <li className="page-item"><button className="page-link" disabled>{number}</button></li>
                                    <li className="page-item"><button className="page-link" onClick={handleNextPage}>Next</button></li>
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
