import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../Layout/Sidebar";
import Customer_Service from "../../../Api/Customer_Service";
import Province_Service from "../../../Api/Province_Service";
import Swal from 'sweetalert2';
import { Input } from 'antd';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';

export default function Create_Customer_Components() {

    const [khachHang, setKhachHang] = useState({
        hoTen: '',
        ttp: '',
        qh: '',
        sdt: '',
        xp: '',
        sn: '',
        gioiTinh: true,
        email: '',
        matKhau: ''
    });
    const [province, setProvince] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [selectedDistricts, setSelectedDistricts] = useState(null);
    const [selectedProvince, setSelectedProvince] = useState(null);
    const [ward, setWard] = useState([]);
    const animatedComponents = makeAnimated();

    let Districts = null;

    let Ward = null;

    const myStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    }

    useEffect(() => {
        ListProvince();
    }, [])

    useEffect(() => {
        getDistricts();
    }, [selectedProvince])

    useEffect(() => {
        ListWard();
    }, [selectedDistricts])

    const ListProvince = async () => {
        try {
            const response = await Province_Service.getProvince();
            setProvince(response);
        } catch (error) {
            console.error(error);
        }
    };

    const ListWard = async () => {
        try {
            if (selectedDistricts > 0) {
                const response = await Province_Service.getWardByCodeDistricts(selectedDistricts);
                setWard(response.wards);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const Provinces = province.map((pro) => ({
        value: pro.code,
        label: pro.name,
    }));

    const getDistricts = async () => {
        if (selectedProvince !== null) {
            const response = await Province_Service.getDistrictsByCode(selectedProvince);
            const data = response.districts;
            setDistricts(data);
        }
    };

    Districts = districts.map((dis) => ({
        value: dis.code,
        label: dis.name,

    }));

    Ward = ward.map((dis) => ({
        value: dis.code,
        label: dis.name,

    }));

    const changeProvince = (selectedOptions) => {
        setKhachHang((preCustomer) => ({ ...preCustomer, ttp: selectedOptions.name }));
        if (selectedOptions) {
            setSelectedProvince(selectedOptions.value);
        }
    }

    const changeDistrict = (selectedOptions) => {
        setKhachHang((preCustomer) => ({ ...preCustomer, qh: selectedOptions.label }));
        if (selectedOptions) {
            setSelectedDistricts(selectedOptions.value);
        }
    }

    const changeName = (e) => {
        setKhachHang((preCustomer) => ({ ...preCustomer, hoTen: e.target.value }));
    }

    const changeEmail = (e) => {
        setKhachHang((preCustomer) => ({ ...preCustomer, email: e.target.value }));
    }

    const changeSdt = (e) => {
        setKhachHang((preCustomer) => ({ ...preCustomer, sdt: e.target.value }));
    }

    const changeWard = (selectedOptions) => {
        setKhachHang((preCustomer) => ({ ...preCustomer, xp: selectedOptions.label }));
    }

    const changeHN = (e) => {
        setKhachHang((preCustomer) => ({ ...preCustomer, sn: e.target.value }));
    }

    const customStyles = {
        control: (provided, state) => ({
            ...provided,
            border: 'none',
            boxShadow: state.isFocused ? '0 0 5px rgba(0, 0, 0, 0.3)' : null,
        }),
    };


    const saveCustomer = (e) => {
        e.preventDefault();
        let hoTen = khachHang.hoTen;
        let email = khachHang.email;
        let sdt = khachHang.sdt;
        let tinhThanh = khachHang.ttp;
        let quanHuyen = khachHang.qh;
        let xaPhuong = khachHang.xp;
        let soNha = khachHang.sn;
        let gioiTinh = khachHang.gioiTinh;
        let newCustomer = {
            hoTen,
            email,
            sdt,
            tinhThanh,
            quanHuyen,
            xaPhuong,
            soNha,
            gioiTinh,
            matKhau: "12345",
        }
        console.log('customer =>' + JSON.stringify(newCustomer));
        Customer_Service.validate(newCustomer).then((response) => {
            if (response.data === "ok")
                Customer_Service.saveCustomer(newCustomer).then(() => {
                    Swal.fire(
                        'good job!',
                        'Save Customer Success',
                        'success'
                    )
                    window.location.href = "/admin/customer/index";
                });
            else
                alert(response.data);
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
                            <h2 className="text-center">Add Customer</h2>
                            <div className="row">
                                <div className="col-md-2 padd2"><Link className="btn btn-success" to="/Admin/Customer/index">Back</Link></div>
                            </div>
                            <div className="table-data container" >
                                <div className="order" style={myStyle}>
                                    <form className="col-md-12" id="myForm">
                                        <div className="row">
                                            <div className="col-md-6 padd5">
                                                <div className="row">
                                                    <label className="form-label padd3">
                                                        Họ Tên
                                                    </label>
                                                    <input type="text" value={khachHang.hoTen} onChange={changeName} className="form-control" />
                                                </div>
                                            </div>
                                            <div className="col-md-6 padd5">
                                                <div className="row">
                                                    <label className="form-label padd3">
                                                        Email
                                                    </label>
                                                    <input type="email" value={khachHang.email} onChange={changeEmail} className="form-control" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6 padd5">
                                                <div className="row">
                                                    <label className="form-label padd3">
                                                        Số Điện Thoại
                                                    </label>
                                                    <input type="tel" value={khachHang.sdt} onChange={changeSdt} className="form-control" />
                                                </div>
                                            </div>
                                            <div className="col-md-6 padd5">
                                                <div className="row">
                                                    <label className="form-label padd3">
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
                                            <div className="col-md-6 padd5">
                                                <div className="row">
                                                    <label className="form-label padd3">
                                                        Tỉnh, Thành Phố
                                                    </label>
                                                    <Select
                                                        styles={customStyles}
                                                        className="form-control"
                                                        onChange={changeProvince}
                                                        closeMenuOnSelect={false}
                                                        components={animatedComponents}
                                                        options={Provinces}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-6 padd5">
                                                <div className="row">
                                                    <label className="form-label padd3">
                                                        Quận Huyện
                                                    </label>
                                                    <Select
                                                        styles={customStyles}
                                                        className="form-control"
                                                        onChange={changeDistrict}
                                                        closeMenuOnSelect={false}
                                                        components={animatedComponents}
                                                        options={Districts !== null ? Districts : []}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6 padd5">
                                                <div className="row">
                                                    <label className="form-label padd3">
                                                        Xã Phường
                                                    </label>
                                                    <Select
                                                        styles={customStyles}
                                                        className="form-control"
                                                        onChange={changeWard}
                                                        closeMenuOnSelect={false}
                                                        components={animatedComponents}
                                                        options={Ward !== null ? Ward : []}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-6 padd5">
                                                <div className="row">
                                                    <label className="form-label padd3">
                                                        Số Nhà
                                                    </label>
                                                    <input type="text" value={khachHang.soNha} onChange={changeHN} className="form-control"
                                                        style={{ height: '51.6px', width: '493px' }} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-2">
                                            </div>
                                            <div className="col-md-2">
                                            </div>
                                            <div className="col-md-4" style={myStyle}>
                                                <br />
                                                <div style={{ paddingTop: '27px' }}>
                                                    <button type="submit" className="btn btn-success" onClick={saveCustomer}>Save</button>
                                                </div>
                                            </div>
                                            <div className="col-md-2">
                                            </div>
                                            <div className="col-md-2">
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
