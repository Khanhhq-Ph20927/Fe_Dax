import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Sidebar from "../Layout/Sidebar";
import Customer_Service from "../../../Api/Customer_Service";
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import Province_Service from "../../../Api/Province_Service";

function Customer_Detail_Components() {
    const { id } = useParams();
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


    useEffect(() => {
        customerDetail();
        ListProvince();
        ListDistricts();
        getDistrictss();
        getProvince();
    }, [id])

    useEffect(() => {
        getDistrictss();
        getProvince();
    }, [])

    useEffect(() => {
        getDistricts();
    }, [selectedProvince]);

    const animatedComponents = makeAnimated();

    const myStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    }

    const customerDetail = async () => {
        const response = await Customer_Service.getById(id);
        let customer = response.data;
        setMaKhachHang(customer.maKhachHang);
        setHoTen(customer.hoTen);
        setTTP(customer.tinhThanhPho);
        setQH(customer.quanHuyen);
        setEmail(customer.email);
        setSdt(customer.sdt);
        setGioiTinh(customer.gioiTinh);
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
        Customer_Service.validateFU(id, customerUpdate).then((response) => {
            if (response.data === "ok") {
                Customer_Service.updateCustomer(customerUpdate, id).then((response) => {
                    if (response.status === 200) {
                        alert('Cập Nhật Thành Công!');
                        window.location.href = "/admin/customer/index";
                    }
                });
            } else {
                alert(response.data);
            }
        })
    }
    return (
        <>
            <Sidebar />
            <section id="content">
                {/* MAIN */}
                <main>
                    <div>
                        <div className="container">
                            <h2 className="text-center">Detail Customer</h2>
                            <div className="row">
                                <div className="col-md-2 padd2"><Link className="btn btn-success" to="/Admin/Customer/index">Back</Link></div>
                            </div>
                            <div className="table-data container">
                                <div className="order" style={myStyle}>
                                    <form className="col-md-10" id="myForm" onSubmit={updateCustomer}>
                                        <div className="row">
                                            <div className="col-md-5">
                                                <div className="row">
                                                    <label className="form-label">
                                                        Mã Khách Hàng
                                                    </label>
                                                    <input type="text" value={maKhachHang}
                                                        onChange={changeMa} className='form-control' />
                                                </div>
                                            </div>
                                            <div className="col-md-5">
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
                                            <div className="col-md-5">
                                                <div className="row">
                                                    <label className="form-label">
                                                        Họ Tên
                                                    </label>
                                                    <input type="text" value={hoTen}
                                                        onChange={changeName} className='form-control' />
                                                </div>
                                            </div>
                                            <div className="col-md-5">
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
                                            <div className="col-md-5">
                                                <div className="row">
                                                    <label className="form-label">
                                                        Email
                                                    </label>
                                                    <input className="form-control" type="email" value={email}
                                                        onChange={changeEmail} />
                                                </div>
                                            </div>
                                            <div className="col-md-5">
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
                                            <div className="col-md-5">
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
                                            <div className="col-md-5">
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
                                            <div className="col-md-5">
                                            </div>
                                            <div className="col-md-5">
                                                <div className="row">
                                                    <div className="col-md-5">
                                                        <br />
                                                        <button type="submit" className="btn btn-success" >Update</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </section>
        </>
    );
}

export default Customer_Detail_Components
