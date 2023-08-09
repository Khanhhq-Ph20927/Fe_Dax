import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PhuKienService from '../../../Api/PhuKienService';
import NhaCungCapService from '../../../Api/NhaCungCapService';
import Sidebar from '../Layout/Sidebar';
import AddNhaCC from '../NhaCC/Add_NhaCC';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const AddPhuKien = () => {
    const [maPhuKien, setMaPhuKien] = useState('');
    const [tenPhuKien, setTenPhuKien] = useState('');
    const [gia, setGia] = useState('');
    const [soLuongTon, setSoLuongTon] = useState('');
    const [ngayTao, setNgayTao] = useState('');
    const [ngaySua, setNgaySua] = useState('');
    const [trangThai, setTrangThai] = useState(0);
    const [nhaCungCap, setNhaCungCap] = useState([]);
    const [selectedNhaCungCap, setSelectedNhaCungCap] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const preset_key="du-an1";
    const folder_name="anh-phukien";
    const cloud_name="dommoqita";
    const [image,setImage]=useState("");
    const handleFile=(event)=>{
        const file=event.target.files[0];
        const formData=new FormData();
        formData.append('file',file);
         formData.append("folder",folder_name);
        formData.append("upload_preset",preset_key);
        axios.post(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,formData)
        .then(res =>setImage(res.data.secure_url))
        .catch(err=>console.log(err));
       
    }
    const savePhuKien = (event) => {
        event.preventDefault();

        let phukien = {
            maPhuKien: maPhuKien,
            tenPhuKien: tenPhuKien,
            gia: gia,
            soLuongTon: soLuongTon,
            ngayTao: ngayTao,
            ngaySua: ngaySua,
            trangThai: trangThai,
            image:image,
            nhaCungCap: { id: selectedNhaCungCap },
        };
        const confix =window.confirm("Bạn có chắn muốn thêm không?")
        if(confix){
        console.log('phukien =>' + JSON.stringify(phukien));

        PhuKienService.createnphukien(phukien)
            .then((res) => {
                toast.success('Save Successful');
             
            })
            .catch((error) => {
                if (error && error.response && error.response.data) {
                    toast(error.response.data);
                }
            });
    };
}
    useEffect(() => {
        NhaCungCapService.getAll()
            .then((response) => {
                setNhaCungCap(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const changeNhaCungCap = (event) => {
        setSelectedNhaCungCap(event.target.value);
    };

    const changeMaPhuKien = (event) => {
        setMaPhuKien(event.target.value);
    };

    const changeTrangThai = (event) => {
        setTrangThai(event.target.value);
    };

    const changeTenPhuKien = (event) => {
        setTenPhuKien(event.target.value);
    };

    const changeGiaPhuKien = (event) => {
        setGia(event.target.value);
    };

    const changeSoLuongTon = (event) => {
        setSoLuongTon(event.target.value);
    };

    const changeNgayTao = (event) => {
        setNgayTao(event.target.value);
    };

    const changeNgaySua = (event) => {
        setNgaySua(event.target.value);
    };

    return (
        <>
            <Sidebar />
            <section id="content">
                <main className="container">
                    <div className="table-data">
                        <div className="order">
                            <div className="head" >
                                <h3 >Thêm Phụ Kiện</h3>
                            </div>
                            <div>
                                        <button onClick={() => setIsOpen(true)}>
                                            Open
                                            <AddNhaCC open={isOpen} onClose={() => setIsOpen(false)}>
                                                
                                            </AddNhaCC>
                                        </button>
                                    </div>
                            <form onSubmit={savePhuKien}>
                                <div className=" row col-md-6 offset-md-3">
                                    <div className="md-3">
                                        <label>Nhà Cung Cấp</label>
                                        <select
                                            className="form-select"
                                            aria-label="Default select example"
                                            name="nhaCungCap"
                                            value={selectedNhaCungCap || ''}
                                            onChange={changeNhaCungCap}
                                        >
                                            <option value="">Select NhàCC</option>
                                            {nhaCungCap.map((ncc) => (
                                                <option key={ncc.id} value={ncc.id}>
                                                    {ncc.ten}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    

                                    {/* <div className="md-3">
                                            <label className="form-label">
                                                Ngày Tạo                                     </label>
                                            <input type="date" value={this.state.ngayTao} name="ngayTao"
                                                onChange={this.changeNgayTao} className='form-control' />
                                        </div> */}

                                    <div className="md-3">
                                        <label className="form-label">Tên Phụ Kiện</label>
                                        <input
                                            className="form-control"
                                            type="text"
                                            name="tenPhuKien"
                                            value={tenPhuKien}
                                            onChange={changeTenPhuKien}
                                        />
                                    </div>
                                    <div className="md-3">
                                        <label className="form-label">Số Lượng Tồn</label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            name="soLuongTon"
                                            value={soLuongTon}
                                            onChange={changeSoLuongTon}
                                        />
                                    </div>
                                    <div className="md-3">
                                        <label className="form-label">Giá</label>
                                        <input
                                            className="form-control"
                                            type="number"
                                            name="gia"
                                            value={gia}
                                            onChange={changeGiaPhuKien}
                                        />
                                    </div>
                                    {/* <div className="md-3">
                                            <label className="form-label">
                                                Ngày Sửa
                                            </label>
                                            <input type="date" value={this.state.ngaySua} name="ngaySua"
                                                onChange={this.changeNgaySua} className='form-control' />
                                        </div> */}
                                    {/* <div className="md-3">
                                        <label>Trang Thái</label>
                                        <select
                                            class="form-select"
                                            name="trangThai"
                                            value={trangThai}
                                            onChange={changeTrangThai}
                                        >
                                            {/* <option value={0}>Trạng Thái</option> */}
                                            {/* <option value="0">Còn Hàng</option>
                                            <option value="1">Hết Hàng</option>
                                        </select>
                                    </div> */} 
                                    <div className='md-3'>
                                        <label>Ảnh</label>
                                        <input type="file" name="image" onChange={handleFile} className='form-control' />
                                        <br />
                                        <img src={image} className='w-20 h-20'/>
                                    </div>
                                    <div className=" row mt-3 form-outline form-white mb-2">
                                        <div className="col-6">
                                            <button
                                                type="submit"
                                                onClick={savePhuKien}
                                                className="btn btn-secondary form-control"
                                            >
                                                ADD
                                            </button>
                                        </div>
                                        <div className="col-6">
                                            <Link
                                                to="/phukien/index"
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
            </section><ToastContainer/>
        </>
    );
};

export default AddPhuKien;