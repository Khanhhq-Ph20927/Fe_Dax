import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../Layout/Sidebar";
import Customer_Service from "../../../Api/Customer_Service";
import Province_Service from "../../../Api/Province_Service";
import Select from 'react-select';
import makeAnimated from 'react-select/animated';

export default function Create_Customer_Components() {

    const [hoTen, setHoTen] = useState('');
    const [email, setEmail] = useState('');
    const [sdt, setSdt] = useState('');
    const [ttp, setTTP] = useState('');
    const [qh, setQH] = useState('');
    const [gioiTinh, setGioiTinh] = useState(true);
    const [province, setProvince] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [selectedDistricts, setSelectedDistricts] = useState([]);
    const [selectedProvince, setSelectedProvince] = useState(null);

    useEffect(() => {
        ListProvince();
        ListDistricts();
    }, []);

    useEffect(() => {
        getDistricts();
    }, [selectedProvince]);

    const animatedComponents = makeAnimated();

    const style = {
        paddingTop: '27px',
    }

    const myStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    }

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
        value: dis.code,
        label: dis.name,

    }));

    const Districtsss = selectedDistricts.map((dis) => ({
        value: dis.code,
        label: dis.name,

    }));


    const changeName = (e) => {
        setHoTen(e.target.value);
    }

    const changeEmail = (e) => {
        setEmail(e.target.value);
    }

    const changeSdt = (e) => {
        setSdt(e.target.value);
    }

    const changeTTP = (selectedOptions) => {
        setTTP(selectedOptions.label);
        console.log(selectedOptions);
        if (selectedOptions) {
            setSelectedProvince(selectedOptions.value);
        }
    }

    const changeQH = (selectedOptions) => {
        setQH(selectedOptions.label);
    }

    const saveCustomer = (e) => {
        e.preventDefault();
        let tinhThanhPho = ttp;
        let quanHuyen = qh;
        let newCustomer = {
            hoTen,
            email,
            sdt,
            tinhThanhPho,
            quanHuyen,
            gioiTinh,
            matKhau: "12345",
        }
        console.log('customer =>' + JSON.stringify(newCustomer));
        Customer_Service.validate(newCustomer).then((response) => {
            if (response.data === "ok")
                Customer_Service.saveCustomer(newCustomer).then(() => {
                    alert('Thêm Mới Khách Hàng Thành Công!');
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
                            <div className="table-data container">
                                <div className="order" style={myStyle}>
                                    <form className="col-md-10" id="myForm">
                                        <div className="row">
                                            <div className="col-md-5">
                                                <div className="row">
                                                    <label className="form-label padd3">
                                                        Họ Tên
                                                    </label>
                                                    <input type="text" value={hoTen}
                                                        onChange={changeName} className='form-control' />
                                                </div>
                                            </div>
                                            <div className="col-md-5">
                                                <div className="row">
                                                    <label className="form-label padd3">
                                                        Email
                                                    </label>
                                                    <input className="form-control" type="email" value={email}
                                                        onChange={changeEmail} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-5">
                                                <div className="row">
                                                    <label className="form-label padd3">
                                                        Số Điện Thoại
                                                    </label>
                                                    <input className="form-control" type="text" value={sdt}
                                                        onChange={changeSdt} />
                                                </div>
                                            </div>
                                            <div className="col-md-5">
                                                <div className="row">
                                                    <label className="form-label padd3">
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
                                                    <label className="form-label padd3">
                                                        Tỉnh, Thành Phố
                                                    </label>
                                                    <Select
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
                                                    <div className="col-md-5" >
                                                        <br />
                                                        <div style={style}>
                                                            <button type="submit" className="btn btn-success" onClick={saveCustomer} >Save</button>
                                                        </div>
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
