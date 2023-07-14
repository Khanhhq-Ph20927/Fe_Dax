import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../Layout/Sidebar";
import Customer_Service from "../../../Api/Customer_Service";

export default function Create_Customer_Components() {
    const [customer, setCustomer] = useState([]);
    const [ho, setHo] = useState('');
    const [ten, setTen] = useState('');
    const [email, setEmail] = useState('');
    const [sdt, setSdt] = useState('');
    const [diaChi, setDiaChi] = useState('');
    const [gioiTinh, setGioiTinh] = useState(true);
    useEffect(() => {
        ListCustomer();
    }, [])
    const ListCustomer = () => {
        Customer_Service.getAllCustomer().then((response) => {
            setCustomer(response.data);
        }).catch((error) => { console.log(error); })
            ;
    }
    const changeHo = (e) => {
        setHo(e.target.value);
    }
    const changeTen = (e) => {
        setTen(e.target.value);
    }
    const changeEmail = (e) => {
        setEmail(e.target.value);
    }
    const changeSdt = (e) => {
        setSdt(e.target.value);
    }
    const changeDiaChi = (e) => {
        setDiaChi(e.target.value);
    }
    const saveCustomer = (e) => {
        e.preventDefault();
        let newCustomer = {
            ho,
            ten,
            email,
            sdt,
            diaChi,
            gioiTinh,
            matKhau: "12345",
        }
        console.log('customer =>' + JSON.stringify(newCustomer));
        Customer_Service.saveCustomer(newCustomer).then(() => {
            alert('Thêm Mới Khách Hàng Thành Công!');
            window.location.href = "/admin/customer/add";
        });
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
                                <div className="col-md-2 padd2"><Link className="btn btn-success" to="/customer/index">Back</Link></div>
                            </div>
                            <form className="col-md-10" id="myForm">
                                <div className="row">
                                    <div className="col-md-5">
                                        <div className="row">
                                            <label className="form-label">
                                                Họ
                                            </label>
                                            <input type="text" value={ho}
                                                onChange={changeHo} className='form-control' />
                                        </div>
                                    </div>
                                    <div className="col-md-5">
                                        <div className="row">
                                            <label className="form-label">
                                                Tên
                                            </label>
                                            <input className="form-control" type="text" value={ten}
                                                onChange={changeTen} />
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
                                    <div className="col-md-5">
                                        <div className="row">
                                            <label className="form-label">
                                                Địa Chỉ
                                            </label>
                                            <input type="text" className="form-control" value={diaChi}
                                                onChange={changeDiaChi} />
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-5">
                                        <div className="row">
                                        </div>
                                    </div>
                                    <div className="col-md-5">
                                        <div className="row">
                                            <div className="col-md-5">
                                                <br />
                                                <button type="submit" className="btn btn-success" onClick={saveCustomer}>Save</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </main>
            </section>
        </>
    );
}
