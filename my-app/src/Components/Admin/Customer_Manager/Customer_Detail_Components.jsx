import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Sidebar from "../Layout/Sidebar";
import Customer_Service from "../../../Api/Customer_Service";

function Customer_Detail_Components() {
    const { id } = useParams();
    const [maKhachHang, setMaKhachHang] = useState('');
    const [ho, setHo] = useState('');
    const [ten, setTen] = useState('');
    const [email, setEmail] = useState('');
    const [sdt, setSdt] = useState('');
    const [diaChi, setDiaChi] = useState('');
    const [gioiTinh, setGioiTinh] = useState(true);
    const [matKhau, setMatKhau] = useState('');
    const [customerList, setCustomerList] = useState([]);
    useEffect(() => {
        Customer_Service.getById(id).then((response) => {
            let customer = response.data;
            setMaKhachHang(customer.maKhachHang);
            setHo(customer.ho);
            setTen(customer.ten);
            setEmail(customer.email);
            setDiaChi(customer.diaChi);
            setSdt(customer.sdt);
            setGioiTinh(customer.gioiTinh);
        });
        ListCustomer();
    }, [id])
    const ListCustomer = () => {
        Customer_Service.getById(id).then((response) => {
            let customer = response.data;
            let ma_KH = customer.maKhachHang;
            Customer_Service.getAllCustomer().then((response) => {
                const tempList = response.data.filter((item) => item.maKhachHang !== ma_KH);
                setCustomerList(tempList);
            }).catch((error) => { console.log(error); });
        });
    }
    const changeMa = (e) => {
        setMaKhachHang(e.target.value);
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
    const changeMatKhau = (e) => {
        setMatKhau(e.target.value);
    }
    const updateCustomer = (e) => {
        e.preventDefault();
        let customerUpdate = {
            maKhachHang,
            ho,
            ten,
            email,
            sdt,
            diaChi,
            gioiTinh,
            matKhau,
        }
        console.log('customer =>' + JSON.stringify(customerUpdate));
        ListCustomer();
        for (let index = 0; index < customerList.length; index++) {
            if (customerList[index].maKhachHang === maKhachHang) {
                return alert('Mã Khách Hàng Này Đã Tồn Tại!');
            }
        }
        Customer_Service.updateCustomer(customerUpdate, id).then((response) => {
            if (response.status === 200) {
                alert('Cập Nhật Thành Công!');
                window.location.href = "/admin/customer/index";
            }
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
                            <h2 className="text-center">Detail Customer</h2>
                            <div className="row">
                                <div className="col-md-2 padd2"><Link className="btn btn-success" to="/Admin/Customer/index">Back</Link></div>
                            </div>
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
                                                <button type="submit" className="btn btn-success" >Update</button>
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

export default Customer_Detail_Components
