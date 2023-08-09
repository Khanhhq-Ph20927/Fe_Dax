import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../Layout/Sidebar";
import Customer_Service from "../../../Api/Customer_Service";
import Common_Util from "../../../Utils/Common_Util";
import { Modal, Button } from "react-bootstrap";
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import Province_Service from "../../../Api/Province_Service";
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as XLSX from 'xlsx/xlsx.mjs'
// sửa lại api searchbyName BE And FE

export default function Customer_List_Components() {
    const [number, setNumber] = useState(0);
    const [pageData, setPageData] = useState([]);
    // const [appointment, setAppointment] = useState([]);
    const [nameSearch, setNameSearch] = useState('');
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [maxPage, setMaxPage] = useState(0);
    const [showModal, setShowModal] = useState(false);
    const [maKhachHang, setMaKhachHang] = useState('');
    const [hoTen, setHoTen] = useState('');
    const [email, setEmail] = useState('');
    const [ttp, setTTP] = useState();
    const [qh, setQH] = useState();
    const [sdt, setSdt] = useState('');
    const [gioiTinh, setGioiTinh] = useState(true);
    const [matKhau, setMatKhau] = useState('');
    const [province, setProvince] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [selectedDistricts, setSelectedDistricts] = useState([]);
    const [selectedProvince, setSelectedProvince] = useState(null);
    const [ID, setID] = useState(null);

    useEffect(() => {
        customerDetail();
        ListProvince();
        ListDistricts();
        getDistrictss();
        getProvince();
    }, [ID])

    useEffect(() => {
        getDistrictss();
        getProvince();
    }, [])

    useEffect(() => {
        getDistricts();
    }, [selectedProvince]);

    const animatedComponents = makeAnimated();

    useEffect(() => {
        fetchData();
        // totalPage();
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
    const showCustomerDetailModal = (customer, id) => {
        setSelectedCustomer(customer);
        setShowModal(true);
        setMaKhachHang(customer.maKhachHang);
        setHoTen(customer.hoTen);
        setSdt(customer.sdt);
        setEmail(customer.email);
        setGioiTinh(customer.gioiTinh);
        setMatKhau('');
        setID(id);
    };
    const myStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    }
    // const totalPage = () => {
    //     Customer_Service.getMaxPage().then((response) => {
    //         setMaxPage(response.data);
    //     })
    // }
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
    const customerDetail = async () => {
        if (ID !== null) {
            const response = await Customer_Service.getById(ID);
            let customer = response.data;
            setMaKhachHang(customer.maKhachHang);
            setHoTen(customer.hoTen);
            setTTP(customer.tinhThanhPho);
            setQH(customer.quanHuyen);
            setEmail(customer.email);
            setSdt(customer.sdt);
            setGioiTinh(customer.gioiTinh);
        }
    };

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
        value: dis.name,
        label: dis.name,

    }));

    const getProvince = () => {
        for (let i = 0; i < province.length; i++) {
            if (province[i].name === ttp) {
                return { value: province[i].code, label: province[i].name };
            }
        }
        return null;
    }

    const getDistrictss = () => {
        for (let i = 0; i < districts.length; i++) {
            if (districts[i].name === qh) {
                return { value: districts[i].name, label: districts[i].name };
            }
        }
        return null;
    }

    const Districtsss = selectedDistricts.map((dis) => ({
        value: dis.name,
        label: dis.name,

    }));
    const defaultValueDistricts = getDistrictss();
    const defaultValueProvince = getProvince();

    const changeMa = (e) => {
        setMaKhachHang(e.target.value);
    }
    const changeName = (e) => {
        setHoTen(e.target.value);
    }
    const changeEmail = (e) => {
        setEmail(e.target.value);
    }
    const changeSdt = (e) => {
        setSdt(e.target.value);
    }
    const changeMatKhau = (e) => {
        setMatKhau(e.target.value);
    }
    const changeTTP = (selectedOptions) => {
        setTTP(selectedOptions.label);
        if (selectedOptions) {
            setSelectedProvince(selectedOptions.value);
        }
    }
    const changeQH = (selectedOptions) => {
        setQH(selectedOptions.label);
    }
    const onchangeExport = async () => {
        const response = await Customer_Service.getCustomer(number);
        const customers = response.data.content;
        const data = [
            ['STT', 'Mã Khách Hàng', 'Họ Tên', 'Email', 'Số Điện Thoại', 'Tỉnh, Thành Phố', "Quận, Huyện", 'Giới Tính'],
            ...customers.map((customer, index) => [
                index + 1,
                customer.maKhachHang,
                customer.hoTen,
                customer.email,
                customer.sdt,
                customer.tinhThanhPho,
                customer.quanHuyen,
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
                    const hoTen = jsonData[index] && jsonData[index][2];
                    const email = jsonData[index] && jsonData[index][3];
                    const sdt = jsonData[index] && jsonData[index][4];
                    const tinhThanhPho = jsonData[index] && jsonData[index][5];
                    const quanHuyen = jsonData[index] && jsonData[index][6];
                    const gender = jsonData[index] && jsonData[index][7];
                    var gioiTinh;
                    if (gender === "Nam") {
                        gioiTinh = true;
                    } else {
                        gioiTinh = false;
                    }
                    const customer = {
                        hoTen,
                        email,
                        sdt,
                        tinhThanhPho,
                        quanHuyen,
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
    const updateCustomer = (e) => {
        e.preventDefault();
        let tinhThanhPho = ttp;
        let quanHuyen = qh;
        let customerUpdate = {
            maKhachHang,
            hoTen,
            email,
            sdt,
            tinhThanhPho,
            quanHuyen,
            gioiTinh,
            matKhau,
        }
        console.log('customer =>' + JSON.stringify(customerUpdate));
        if (ID !== null) {
            Customer_Service.validateFU(ID, customerUpdate).then((response) => {
                if (response.data === "ok") {
                    Customer_Service.updateCustomer(customerUpdate, ID).then((response) => {
                        if (response.status === 200) {
                            toast.success('🦄 Sửa thành công!', {
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
                            fetchData();
                        }
                    });
                } else {
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
                                                    <td>{customer.quanHuyen + ", " + customer.tinhThanhPho}</td>
                                                    <td>{customer.gioiTinh === true ? "Nam" : "Nữ"}</td>
                                                    <td><button className='btn btn-danger' onClick={() => deleteById(customer.id)}><i class="bx bxs-trash"></i></button>
                                                        <span className="padd2"></span>
                                                        <Button className='btn btn-success' onClick={() => showCustomerDetailModal(customer, customer.id)}><i class="bx bxs-edit"></i></Button>
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
                <Modal show={showModal} onHide={() => setShowModal(false)} size="lg" aria-labelledby="contained-modal-title-vcenter">
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
                                        <input type="text" value={maKhachHang}
                                            onChange={changeMa} className='form-control' />
                                    </div>
                                </div>
                                <div className="col-md-6 padd2">
                                    <div className="row">
                                        <label className="form-label">
                                            Mật Khẩu
                                        </label>
                                        <input type="text" value={matKhau}
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
                                        <input type="text" value={hoTen}
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
                                        <label className="form-label">
                                            Email
                                        </label>
                                        <input className="form-control" type="email" value={email}
                                            onChange={changeEmail} />
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
                            <div className="row">
                                <div className="col-md-6 padd2">
                                    <div className="row">
                                        <label className="form-label padd3">
                                            Tỉnh, Thành Phố
                                        </label>
                                        <Select
                                            value={defaultValueProvince}
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
                </Modal>
            </section>
        </>
    );
}
