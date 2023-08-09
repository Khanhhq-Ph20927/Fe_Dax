import React,{useEffect,useState} from "react";
import { Link } from "react-router-dom";
import MauXeService from "../../../Api/MauXeService";
import MauSacService from "../../../Api/MauSacService";
import HangXeService from "../../../Api/HangXeService";
import { toast } from "react-toastify";
import Sidebar from "../Layout/Sidebar";

const AddMauXe=()=>{
    const [ten,setTen]=useState('');
    const [namSanXuat,setNamSanXuat]=useState('');
    const [hopSo,setHopSo]=useState('');
    const [dungTichXiLanh,setDungTichXiLanh]=useState('');
    const [kichThuocTongThe,setKichThuocTongTen]=useState('');
    const [mauSac,setMauSac]=useState([]);
    const [selectedMauSac,setSelectedMauSac]=useState(null);
    const [hangXe,setHangXe]=useState([]);
    const [selectedHangXe,setSelectedHangXe]=useState(null);
    const saveMauXe=(event)=>{
        event.preventDefault();
        let mauxe={
            ten:ten,
            namSanXuat:namSanXuat,
            hopSo:hopSo,
            dungTichXiLanh:dungTichXiLanh,
            kichThuocTongThe,kichThuocTongThe,
            mauSac:{id:selectedMauSac},
            hangXe:{id:selectedHangXe},
        };
        const confix =window.confirm("Bạn có chăn thêm")
        if(confix){
            console.log('mauxe =>'+JSON.stringify(mauxe));
            MauXeService.createmauxe(mauxe).then((res)=>{
                alert('Save Successful');
                window.location.href='/mauxe/index';
            }).catch((error)=>{
                if(error && error.response && error.response.data){
                    toast(error.response.data);
                }
            });
        };
    }
    useEffect(() => {
        MauSacService.getAll()
            .then((response) => {
                setMauSac(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);
    useEffect(() => {
        HangXeService.getAll()
            .then((response) => {
                setHangXe(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);
    const changeMauSac =(event)=>{
        setSelectedMauSac(event.target.value);
    };
    const changeHangXe =(event)=>{
        setSelectedHangXe(event.target.value);
    };
    const changeTen =(event)=>{
        setTen(event.target.value);
    };
    const changeNamSanXuat=(event)=>{
        setNamSanXuat(event.target.value);
    };
    const changeHopSo=(event)=>{
        setHopSo(event.target.value);
    };
    const changeDungTichXiLanh=(event)=>{
        setDungTichXiLanh(event.target.value);
    };
    const changeKichThuocTongThe=(event)=>{
        setKichThuocTongTen(event.target.value);
    };

    return (
        <>
            <Sidebar />
            <section id="content">
                <main className="container">
                    <div className="table-data">
                        <div className="order">
                            <div className="head" >
                                <h3 >Thêm Mẫu Xe</h3>
                            </div>
                            <form onSubmit={saveMauXe}>
                                <div className=" row col-md-6 offset-md-3">
                                    <div className="md-3">
                                        <label>Hãng Xe</label>
                                        <select
                                            className="form-select"
                                            aria-label="Default select example"
                                            name="hangXe"
                                            value={selectedHangXe || ''}
                                            onChange={changeHangXe}
                                        >
                                            <option value="">Select Hãng Xe</option>
                                            {hangXe.map((hx) => (
                                                <option key={hx.id} value={hx.id}>
                                                    {hx.ten}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="md-3">
                                        <label>Màu Sắc</label>
                                        <select
                                            className="form-select"
                                            aria-label="Default select example"
                                            name="mauSac"
                                            value={selectedMauSac || ''}
                                            onChange={changeMauSac}
                                        >
                                            <option value="">Select Màu Sắc</option>
                                            {mauSac.map((ms) => (
                                                <option key={ms.id} value={ms.id}>
                                                    {ms.ten}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                   

                                    <div className="md-3">
                                        <label className="form-label">Tên </label>
                                        <input
                                            className="form-control"
                                            type="text"
                                            name="ten"
                                            value={ten}
                                            onChange={changeTen}
                                        />
                                    </div>
                                    <div className="md-3">
                                        <label className="form-label">Năm Sản Xuất</label>
                                        <input
                                            type="tel"
                                            className="form-control"
                                            name="namSanXuat"
                                            value={namSanXuat}
                                            onChange={changeNamSanXuat}
                                        />
                                    </div>
                                    <div className="md-3">
                                        <label className="form-label">Dung Tích Xi Lanh</label>
                                        <input
                                            className="form-control"
                                            type="text"
                                            name="dungTichXiLanh"
                                            value={dungTichXiLanh}
                                            onChange={changeDungTichXiLanh}
                                        />
                                    </div>
                                    <div className="md-3">
                                        <label className="form-label">Hộp Số</label>
                                        <input
                                            className="form-control"
                                            type="text"
                                            name="hopSo"
                                            value={hopSo}
                                            onChange={changeHopSo}
                                        />
                                    </div>
                                    <div className="md-3">
                                        <label className="form-label">Kích Thước Tổng Thể</label>
                                        <input
                                            className="form-control"
                                            type="text"
                                            name="kichThuocTongThe"
                                            value={kichThuocTongThe}
                                            onChange={changeKichThuocTongThe}
                                        />
                                    </div>
                                    {/* <div className="md-3">
                                            <label className="form-label">
                                                Ngày Sửa
                                            </label>
                                            <input type="date" value={this.state.ngaySua} name="ngaySua"
                                                onChange={this.changeNgaySua} className='form-control' />
                                        </div> */}
                                   
                                    <div className=" row mt-3 form-outline form-white mb-2">
                                        <div className="col-6">
                                            <button
                                                type="submit"
                                                onClick={saveMauXe}
                                                className="btn btn-secondary form-control"
                                            >
                                                ADD
                                            </button>
                                        </div>
                                        <div className="col-6">
                                            <Link
                                                to="/mauxe/index"
                                                className="btn btn-danger form-control"
                                            >
                                                Cancel
                                            </Link>
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
export default AddMauXe;