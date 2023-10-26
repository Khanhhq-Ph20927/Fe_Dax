import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../Layout/Sidebar";
import Customer_Service from "../../../Api/Customer_Service";
// import Common_Util from "../../../Utils/Common_Util";
import { Modal, Button } from "react-bootstrap";
// import Select from 'react-select';
// import makeAnimated from 'react-select/animated';
// import Province_Service from "../../../Api/Province_Service";
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import * as XLSX from 'xlsx/xlsx.mjs';
import Export_Components from './Excel/Export_Components';
import Import_Components from './Excel/Import_Components'
import Modal_Detail_Customer from "./Modal_Detail_Customer";

export default function Customer_List_Components() {

    const [number, setNumber] = useState(0);
    const [pageData, setPageData] = useState([]);
    const [nameSearch, setNameSearch] = useState('');
    const [customer, setCustomer] = useState();
    // const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [maxPage, setMaxPage] = useState(0);
    const [showModal, setShowModal] = useState(false);
    // const [khachHang, setKhachHang] = useState({
    //     maKhachHang: '',
    //     hoTen: '',
    //     ttp: '',
    //     qh: '',
    //     sdt: '',
    //     gioiTinh: true,
    //     email: '',
    //     matKhau: ''
    // });
    // const [province, setProvince] = useState([]);
    // const [districts, setDistricts] = useState([]);
    // const [ward, setWard] = useState([]);
    // const [selectedDistricts, setSelectedDistricts] = useState([]);
    // const [selectedProvince, setSelectedProvince] = useState(null);
    // const [ID, setID] = useState(null);

    // useEffect(() => {
    //     // customerDetail();
    //     // ListProvince();
    //     // ListDistricts();
    //     // getDistrictss();
    //     // getProvince();
    // }, [ID])

    // useEffect(() => {
    //     getDistricts();
    // }, [selectedProvince]);

    useEffect(() => {
        fetchData();
    }, [number])

    const fetchData = async () => {
        try {
            const response = await Customer_Service.getCustomer(number);
            const data = response.data.content;
            setMaxPage(response.data.totalPages);
            setPageData(data);
        }
        catch (error) {
            console.error(error);
        }
    };

    const showCustomerDetailModal = (customer) => {
        // setSelectedCustomer(customer);
        setCustomer(customer);
        setShowModal(true);
    };

    const myStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
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
            toast.error("Hãy Nhập Keyword!");
            return;
        }
    }

    // const customerDetail = async () => {
    //     if (ID !== null) {
    //         const response = await Customer_Service.getById(ID);
    //         let customer = response.data;
    //         setKhachHang(() => ({
    //             maKhachHang: customer.maKhachHang,
    //             hoTen: customer.hoTen,
    //             ttp: customer.tinhThanhPho,
    //             qh: customer.quanHuyen,
    //             email: customer.email,
    //             sdt: customer.sdt,
    //             gioiTinh: customer.gioiTinh
    //         }))
    //     }
    // };

    // const ListProvince = () => new Promise(async (resolve) => {
    //     try {
    //         const response = await Province_Service.getProvince();
    //         setProvince(response);
    //         resolve(response);
    //     } catch (error) {
    //         console.error(error);
    //     }
    // });
    // const ListDistricts = () => new Promise(async (resolve) => {
    //     try {
    //         const response = await Province_Service.getDistricts();
    //         setDistricts(response);
    //         resolve(response);
    //     } catch (error) {
    //         console.error(error);
    //     }
    // });

    // const Provinces = province.map((pro) => ({
    //     value: pro.code,
    //     label: pro.name,

    // }));

    // const getDistricts = async () => {
    //     if (selectedProvince === null) {
    //         setSelectedDistricts(districts);
    //     } else {
    //         const response = await Province_Service.getDistrictsByCode(selectedProvince);
    //         const data = response.districts;
    //         setSelectedDistricts(data);
    //     }
    // };
    // const Districtss = districts.map((dis) => ({
    //     value: dis.name,
    //     label: dis.name,

    // }));

    // const getProvince = () => {
    //     for (let i = 0; i < province.length; i++) {
    //         if (province[i].name === khachHang.ttp) {
    //             return { value: province[i].code, label: province[i].name };
    //         }
    //     }
    //     return null;
    // }

    // const getDistrictss = () => {
    //     for (let i = 0; i < districts.length; i++) {
    //         if (districts[i].name === khachHang.qh) {
    //             return { value: districts[i].name, label: districts[i].name };
    //         }
    //     }
    //     return null;
    // }

    // const Districtsss = selectedDistricts.map((dis) => ({
    //     value: dis.name,
    //     label: dis.name,

    // }));

    // const defaultValueDistricts = getDistrictss();
    // const defaultValueProvince = getProvince();

    // const changeId = (e) => {
    //     setKhachHang((preCustomer) => ({ ...preCustomer, maKhachHang: e.target.value }));
    // }
    // const changeName = (e) => {
    //     setKhachHang((preCustomer) => ({ ...preCustomer, hoTen: e.target.value }));
    // }
    // const changeEmail = (e) => {
    //     setKhachHang((preCustomer) => ({ ...preCustomer, email: e.target.value }));
    // }
    // const changeSdt = (e) => {
    //     setKhachHang((preCustomer) => ({ ...preCustomer, sdt: e.target.value }));
    // }
    // const changeMatKhau = (e) => {
    //     setKhachHang((preCustomer) => ({ ...preCustomer, matKhau: e.target.value }));
    // }
    // const changeProvince = (selectedOptions) => {
    //     setKhachHang((preCustomer) => ({ ...preCustomer, ttp: selectedOptions.label }));
    //     if (selectedOptions) {
    //         setSelectedProvince(selectedOptions.value);
    //     }
    // }
    // const changeDistrict = (selectedOptions) => {
    //     setKhachHang((preCustomer) => ({ ...preCustomer, qh: selectedOptions.label }));
    // }

    const deleteById = (id) => {
        Swal.fire({
            title: 'Bạn có muốn xoá?',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Có, Tôi Đồng Ý!',
            cancelButtonText: 'Không!'
        }).then((result) => {
            if (result.isConfirmed) {

                Customer_Service.deleteCustomer(id).then((response) => {
                    if (response.status === 200) {
                        Swal.fire(
                            'Xoá Thành Công!'
                        )
                    }
                    fetchData();
                }).catch(error => {
                    console.log(error);
                })
            }
        })
    }
    // const updateCustomer = (e) => {
    //     e.preventDefault();
    //     let maKH = khachHang.maKhachHang;
    //     let hoTen = khachHang.hoTen;
    //     let email = khachHang.email;
    //     let sdt = khachHang.sdt;
    //     let gioiTinh = khachHang.gioiTinh;
    //     let matKhau = khachHang.matKhau;
    //     let tinhThanh = khachHang.ttp;
    //     let quanHuyen = khachHang.qh;
    //     const customerUpdate = {
    //         maKH,
    //         hoTen,
    //         email,
    //         sdt,
    //         tinhThanh,
    //         quanHuyen,
    //         gioiTinh,
    //         matKhau,
    //     }
    //     console.log('customer =>' + JSON.stringify(customerUpdate));
    //     if (ID !== null) {
    //         Customer_Service.validateFU(ID, customerUpdate).then((response) => {
    //             if (response.data === "ok") {
    //                 Customer_Service.updateCustomer(customerUpdate, ID).then((response) => {
    //                     if (response.status === 200) {
    //                         toast.success('Sửa thành công!');
    //                         setShowModal(false);
    //                         fetchData();
    //                     }
    //                 });
    //             } else {
    //                 toast.error(response.data);
    //             }
    //         })
    //     }
    // }

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
                                    <Export_Components number={number} />
                                </div>
                                <div>
                                    <Import_Components number={number} />
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
                                                    <td>{customer.quanHuyen + ", " + customer.tinhThanh}</td>
                                                    <td>{customer.gioiTinh === true ? "Nam" : "Nữ"}</td>
                                                    <td><button className='btn btn-danger' onClick={() => deleteById(customer.id)}><i class="bx bxs-trash"></i></button>
                                                        <span className="padd2"></span>
                                                        <Button className='btn btn-success' onClick={() => showCustomerDetailModal(customer)}><i class="bx bxs-edit"></i></Button>
                                                    </td>
                                                </tr>

                                        )}
                                </tbody>
                            </table>
                            <nav aria-label="Page navigation example" style={myStyle}>
                                <ul className="pagination">
                                    <li className="page-item"><button className="page-link" onClick={handlePreviousPage}>Previous</button></li>
                                    <li className="page-item"><button className="page-link" disabled>{number + 1}</button></li>
                                    <li className="page-item"><button className="page-link" onClick={handleNextPage}>Next</button></li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                </main>

                {/* MAIN */}

                {/* <Modal show={showModal} onHide={() => setShowModal(false)} size="lg" aria-labelledby="contained-modal-title-vcenter">
                    <Modal.Header closeButton>
                        <Modal.Title>Chi tiết khách hàng</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form className="col-md-12" id="myForm" onSubmit={updateCustomer}>
                            <div className="row">
                                <div className="col-md-6 padd2">
                                    <div className="row">
                                        <label className="form-label">
                                            Mã Khách Hàng
                                        </label>
                                        <input type="text" value={khachHang.maKhachHang}
                                            onChange={changeId} className='form-control' />
                                    </div>
                                </div>
                                <div className="col-md-6 padd2">
                                    <div className="row">
                                        <label className="form-label">
                                            Mật Khẩu
                                        </label>
                                        <input type="text" value={khachHang.matKhau}
                                            onChange={changeMatKhau} className='form-control' />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6 padd2">
                                    <div className="row">
                                        <label className="form-label">
                                            Họ Tên
                                        </label>
                                        <input type="text" value={khachHang.hoTen}
                                            onChange={changeName} className='form-control' />
                                    </div>
                                </div>
                                <div className="col-md-6 padd2">
                                    <div className="row">
                                        <label className="form-label">
                                            Giới Tính
                                        </label>
                                        <div className="form-check">
                                            <input type="radio" className="form-check-input" value="true"
                                                checked={khachHang.gioiTinh} onChange={() => setKhachHang({ gioiTinh: true })} /> Nam
                                        </div>
                                        <div className="form-check">
                                            <input type="radio" className="form-check-input" value="false"
                                                checked={!khachHang.gioiTinh} onChange={() => setKhachHang({ gioiTinh: false })} /> Nữ
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6 padd2">
                                    <div className="row">
                                        <label className="form-label">
                                            Email
                                        </label>
                                        <input className="form-control" type="email" value={khachHang.email}
                                            onChange={changeEmail} />
                                    </div>
                                </div>
                                <div className="col-md-6 padd2">
                                    <div className="row">
                                        <label className="form-label">
                                            Số Điện Thoại
                                        </label>
                                        <input className="form-control" type="text" value={khachHang.sdt}
                                            onChange={changeSdt} />
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
                                            className="form-control"
                                            value={defaultValueProvince}
                                            onChange={changeProvince}
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
                                            className="form-control"
                                            value={(defaultValueDistricts)}
                                            onChange={changeDistrict}
                                            closeMenuOnSelect={false}
                                            components={animatedComponents}
                                            options={selectedProvince === null ? Districtss : Districtsss}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6 padd2">
                                    <div className="row">
                                        <label className="form-label padd3">
                                            Thị Xã
                                        </label>
                                        <Select
                                            className="form-control"
                                            value={(defaultValueDistricts)}
                                            onChange={changeQH}
                                            closeMenuOnSelect={false}
                                            components={animatedComponents}
                                            options={selectedProvince === null ? Districtss : Districtsss}
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
                </Modal> */}
                {showModal && (<Modal_Detail_Customer showModal={showModal} setShowModal={setShowModal} data={customer} />)}
            </section>
        </>
    );
}
