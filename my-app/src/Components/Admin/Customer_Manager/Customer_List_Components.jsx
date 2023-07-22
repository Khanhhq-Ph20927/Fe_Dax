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
    const [maxPage, setMaxPage] = useState(0);

    useEffect(() => {
        fetchData();
        totalPage();
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
    const totalPage = () => {
        Customer_Service.getMaxPage().then((response) => {
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
    const searchByName = (nameSearch) => {
        if (nameSearch.length === 0) {
            alert("Hãy Nhập Keyword!");
            return;
        }
    }
    const onchangeExport = async () => {
        const response = await Customer_Service.getCustomer(number);
        const customers = response.data.content;
        const data = [
            ['STT', 'Mã Khách Hàng', 'Họ', 'Tên', 'Email', 'Số Điện Thoại', 'Địa Chỉ', 'Giới Tính'],
            ...customers.map((customer, index) => [
                index + 1,
                customer.maKhachHang,
                customer.ho,
                customer.ten,
                customer.email,
                customer.sdt,
                customer.diaChi,
                customer.gioiTinh ? "Nam" : "Nữ"
            ]),
        ];
        await Common_Util.exportExcel(data, "Danh Sách Khách Hàng Trang " + (Number(number) + 1), "ListCustomer" + (Number(number) + 1));
    }
    const onchangeImport = async (e) => {
        const selectedFile = e.target.files[0];
        const fileReader = new FileReader();
        let i = 0;
        let y = 0;
        fileReader.onload = async (e) => {
            const data = new Uint8Array(e.target.result);
            const workbook = XLSX.read(data, { type: 'array' });
            const worksheet = workbook.Sheets[workbook.SheetNames[0]];
            const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
            console.log(jsonData);
            if (window.confirm('Bạn Có Muốn Thêm Dữ Liệu Vào Hệ Thống!')) {
                for (let index = 2; index < jsonData.length; index++) {
                    const ho = jsonData[index] && jsonData[index][2];
                    const ten = jsonData[index] && jsonData[index][3];
                    const email = jsonData[index] && jsonData[index][4];
                    const sdt = jsonData[index] && jsonData[index][5];
                    const diaChi = jsonData[index] && jsonData[index][6];
                    const gender = jsonData[index] && jsonData[index][7];
                    var gioiTinh;
                    if (gender === "Nam") {
                        gioiTinh = true;
                    } else {
                        gioiTinh = false;
                    }
                    const customer = {
                        ho,
                        ten,
                        email,
                        sdt,
                        diaChi,
                        gioiTinh
                    }
                    console.log(customer);
                    const response = await Customer_Service.validate(customer);
                    if (response.data === 'ok') {
                        i++;
                    } else {
                        console.error(response.data);
                        y++;
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
            if (y === 0)
                alert("Có " + i + " Bản Ghi Được Thêm Thành Công!");
            else
                alert("Có " + i + " Bản Ghi Được Thêm Thành Công Và " + y + " Bản Ghi Chưa Được Thêm!");
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
                                                        <span className="padd2"></span>
                                                        <Link className='btn btn-success' to={`/admin/customer/detail/${customer.id}`}>Detail</Link>
                                                    </td>
                                                </tr>

                                        )}
                                </tbody>
                            </table>
                            <nav aria-label="Page navigation example">
                                <ul class="pagination">
                                    <li className="page-item"><button className="page-link" onClick={handlePreviousPage}>Previous</button></li>
                                    <li className="page-item"><button className="page-link" disabled>{number + 1}</button></li>
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
