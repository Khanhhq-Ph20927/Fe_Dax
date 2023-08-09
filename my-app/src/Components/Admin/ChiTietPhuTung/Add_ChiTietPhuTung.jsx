import React,{useEffect,useState} from "react";
import { Link } from "react-router-dom";
import Sidebar from "../Layout/Sidebar";
import ChiTietPTService from "../../../Api/ChiTietPTService";
import { toast } from "react-toastify";
import MauXeService from "../../../Api/MauXeService";
import PhuKienService from "../../../Api/PhuKienService";

const AddChiTietPT=()=>{
    const [soLuong,setSoLuong]=useState('');
    const [ngayTao,setNgayTao]=useState('');
    const [ngaySua,setNgaySua]=useState('');
    const [mauXe,setMauXe]=useState([]);
    const [selectedMauXe,setSelectedMauXe]=useState(null);
    const [phuKien,setPhuKien]=useState([]);
    const [selectedPhuKien,setSelectedPhuKien]=useState(null);
    const saveChiTietPT=(event)=>{
        event.preventDefault();
        let chitietpt={
            soLuong:soLuong,
            ngayTao:ngayTao,
            ngaySua:ngaySua,
            mauXe:{id:selectedMauXe},
            phuKien:{id:selectedPhuKien},
        };
        const confix =window.confirm("Bạn có các chán muốn thêm");
        if(confix){
            console.log('chitietpt =>'+JSON.stringify(chitietpt));
            ChiTietPTService.createctpt(chitietpt).then((res)=>{
                alert('Save Successful');
                window.location.href='/chitietpt/index';
            }).catch((error)=>{
                if(error && error.response && error.response.data){
                    toast(error.response.data);
                }
            });
        };      
    }
     useEffect(()=>{
       MauXeService.getAll().then((response)=>{
        setMauXe(response.data);
       }).catch((error)=>{
        console.log(error);
       })     
        },[]);
        useEffect(()=>{
        PhuKienService.getAll().then((response)=>{
            setPhuKien(response.data);
        }).catch((error)=>{
           console.log(error);
        })
        },[])
        const changeMauXe=(event)=>{
            setSelectedMauXe(event.target.value);
        };
        const changePhuKien=(event)=>{
            setSelectedPhuKien(event.target.value);
        };
        const changeSoLuong=(event)=>{
            setSoLuong(event.target.value);
        };
        const changeNgayTao=(event)=>{
            setNgayTao(event.target.value);
        };
        const changeNgaySua=(event)=>{
            setNgaySua(event.target.value);
        }
        return(
            <>
            <Sidebar />
            <section id="content">
                <main className="container">
                    <div className="table-data">
                        <div className="order">
                            <div className="head" >
                                <h3 >Thêm ChiTietPT</h3>
                            </div>
                            <form onSubmit={saveChiTietPT}>
                                <div className=" row col-md-6 offset-md-3">
                                    <div className="md-3">
                                        <label>Mẫu Xe</label>
                                        <select
                                            className="form-select"
                                            aria-label="Default select example"
                                            name="mauXe"
                                            value={selectedMauXe || ''}
                                            onChange={changeMauXe}
                                        >
                                            <option value="">Select Mẫu Xe</option>
                                            {mauXe.map((mx) => (
                                                <option key={mx.id} value={mx.id}>
                                                    {mx.ten}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="md-3">
                                        <label>Phụ Kiện</label>
                                        <select
                                            className="form-select"
                                            aria-label="Default select example"
                                            name="phuKien"
                                            value={selectedPhuKien || ''}
                                            onChange={changePhuKien}
                                        >
                                            <option value="">Select Phụ Kiện</option>
                                            {phuKien.map((pk) => (
                                                <option key={pk.id} value={pk.id}>
                                                    {pk.tenPhuKien}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                   

                                    <div className="md-3">
                                        <label className="form-label">Số Lượng </label>
                                        <input
                                            className="form-control"
                                            type="text"
                                            name="soLuong"
                                            value={soLuong}
                                            onChange={changeSoLuong}
                                        />
                                    </div>
                                    
                                   
                                    <div className=" row mt-3 form-outline form-white mb-2">
                                        <div className="col-6">
                                            <button
                                                type="submit"
                                                onClick={saveChiTietPT}
                                                className="btn btn-secondary form-control"
                                            >
                                                ADD
                                            </button>
                                        </div>
                                        <div className="col-6">
                                            <Link
                                                to="/chitietpt/index"
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
        )
}
export default AddChiTietPT;