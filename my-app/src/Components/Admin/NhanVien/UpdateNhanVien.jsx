import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import NhanVienService from '../../../Api/NhanVienService';
import ChucVuService from '../../../Api/ChucVuService';
import Sidebar from '../Layout/Sidebar';
import axios from 'axios';
// import ListChucVu from '../Admin/ChucVu/ListChucVu';


const onvrlay_style={
  position:'fixed',
  top:0,
  left:0,
  right:0,
  bottom:0,
  backgroundColor:'rgba(0,0,0,.7)',
  zIndex:1000
}
const UpdateNhanVien = ({ open, children, onClose}) => {
    const { id } = useParams();
    const [maNhanVien,setMa]=useState('');
    const [ten, setTen] = useState('');
    const [trangThai, setTrangThai] = useState(0);
    const [diaChi, setDiaChi] = useState('');
    const [ho, setHo] =useState('');
    const [ngayTao, setNgayTao] = useState('');
    const [ngaySua, setNgaySua] = useState('');
    const [email,setEmail]= useState('');
    const [sdt,setSdt]= useState('');
    const [ngaySinh,setNgaySinh] =useState('');
    const [matKhau,setMatKhau] =useState('');
    const [chucVu,setChucVu]=useState([]);
    
    const [selectchucVu,setselectChucVu]=useState(null);
    const preset_key="du-an1";
    const cloud_name="dommoqita";
    const folder_name="anh-nhanvien";
    const [image,setImage]=useState("");
  
    const handleFile=(event)=>{
     const file =event.target.files[0];
     const formData=new FormData();
     formData.append('file',file);
     formData.append("upload_preset",preset_key);
     formData.append("folder",folder_name);
     axios.post(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,formData)
     .then(res =>setImage(res.data.secure_url))
     .catch(err=>console.log(err));
    }
    
    useEffect(() => {
     
       ListChucVu();
       NhanVienService.getById(id).then((res) => {
            let nhanvien = res.data;
            setTen(nhanvien.ten);
            setMa(nhanvien.maNhanVien);
            setTrangThai(nhanvien.trangThai);
            setSdt(nhanvien.sdt);
            setDiaChi(nhanvien.diaChi);
            setHo(nhanvien.ho);
            setNgayTao(nhanvien.ngayTao);
            setNgaySua(nhanvien.ngaySua);
            setNgaySinh(nhanvien.ngaySinh);
            setMatKhau(nhanvien.matKhau);
            setEmail(nhanvien.email);
            setImage(nhanvien.image);
            setselectChucVu(nhanvien.chucVu.maChucVu);
        });
    }, [id]);
  
    const ListChucVu =()=>{
        ChucVuService.getAll().then((response)=>{
            setChucVu(response.data);
        }).catch((error)=>{
            console.log(error);
        });
    };

    const changengaytao = (e) => {
        setNgayTao(e.target.value);
    };

    const changengaysua = (e) => {
        setNgaySua(e.target.value);
    };
    const changesdt = (e) => {
        setSdt(e.target.value);
    };
    const changema = (e) => {
        setMa(e.target.value);
    };
    const changeimage = (e) => {
      setImage(e.target.value);
  };
    const changeten = (e) => {
        setTen(e.target.value);
    };
    const changeho = (e) => {
        setHo(e.target.value);
    };
    const changetrangthai = (e) => {
        setTrangThai(e.target.value);
    };
    const changediachi = (e) => {
        setDiaChi(e.target.value);
    };
    const changeemail = (e) => {
        setEmail(e.target.value);
    };
    const changematKhau = (e) => {
        setMatKhau(e.target.value);
    };
    const changechucvu = (e) => {
        setselectChucVu(e.target.value);
    };
    const changengaysinh = (e) => {
        setNgaySinh(e.target.value);
    };
    const updatenhanvien = (e) => {
        e.preventDefault();
        let nhanvien = {
            id,
            maNhanVien,
            ten,
            ho,
            diaChi,
            trangThai,
            ngayTao,
            ngaySua,
            sdt,
            ngaySinh,
            matKhau,
            email,
            image,
            chucVu:{maChucVu:selectchucVu }
            
           
        };
        const confix=window.confirm("Bạn Có Muốn Update")
        if(confix){
        console.log('nhanvien =>' + JSON.stringify(nhanvien));
        NhanVienService.update(id,nhanvien).then(res => {
            alert('Update Successful');
            window.location.href = "/nhanvien/index";
        });
    };
  }
    return (
        <>
            <Sidebar />
            
            <div style={onvrlay_style}>
            <section id="content">
      <main className="container">
        <div className="table-data">
          <div className="order">
            <div className="head">
              <h3>Update Nhân Viên</h3>
            </div>
            <form onSubmit={updatenhanvien}>
              <div className=" row col-md-6 offset-md-3">
                <div className="md-3">
                  <label>Tên</label>
                  <input
                    type="text"
                    className="form-control"name='ten'
                    value={ten}
                    onChange={changeten}
                  />
                </div>
                <div className="md-3">
                  <label>Mã</label>
                  <input
                    type="text"
                    className="form-control"name='maNhanVien'
                    value={maNhanVien}
                    onChange={changema}
                  />
                </div>
                {/* <div className="md-3">
                  <label>Ngày Tạo</label>
                  <input
                    type="date"
                    className="form-control"name='ngayTao'
                    value={ngayTao}
                    onChange={changengaytao}
                  />
                </div> */}
                <div className="md-3">
                  <label>Ngày Sinh</label>
                  <input
                    type="date"
                    className="form-control"name='ngaySinh'
                    value={ngaySinh}
                    onChange={changengaysinh}
                  />
                </div>
                {/* <div className="md-3">
                  <label>Ngày Sửa</label>
                  <input
                    type="date"
                    className="form-control"name='ngaySua'
                    value={ngaySua}
                    onChange={changengaysua}
                  />
                </div> */}
                <div className="md-3">
                  <label>Họ</label>
                  <input
                    type="text"
                    className="form-control"name='ho'
                    value={ho}
                    onChange={changeho}
                  />
                </div>
                <div className="md-3">
                  <label>Mat Khẩu</label>
                  <input
                    type="password"
                    className="form-control"name='matKhau'
                    value={matKhau}
                    onChange={changematKhau}
                  />
                </div>
                <div className="md-3">
                  <label>Dịa Chỉ</label>
                  <input
                    type="text"
                    className="form-control"name='diaChi'
                    value={diaChi}
                    onChange={changediachi}
                  />
                </div>
                <div className="md-3">
                  <label>Chức Vụ</label>
                  <select
                    class="form-select"name='chucVu'
                    value={selectchucVu ||''}
                    onChange={changechucvu}
                  >
                   <option value={0}>Chức Vu</option>
                    {chucVu.map((cv) => (

                      <option key={cv.maChucVu} value={cv.maChucVu}>
                        {cv.tenChucVu}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="md-3">
                  <label>Email</label>
                  <input
                    type="email"
                    className="form-control"name='email'
                    value={email}
                    onChange={changeemail}
                  />
                </div>
                <div className="md-3">
                  <label>SDT</label>
                  <input
                    type="text"
                    className="form-control"name='sdt'
                    value={sdt}
                    onChange={changesdt}
                  />
                </div>
                <div className='md-3'>
                  <label>Ảnh</label>
                  <input type="file" name="image" onChange={handleFile}className='form-control'/>
                    <br />
                  <img src={image} onChange={changeimage}/>
                </div>
                <div className="md-3">
                  <label>Trang Thái</label>
                  <select
                    class="form-select"name='trangThai'
                    value={trangThai}
                    onChange={changetrangthai}
                  >
                     
                    <option value="0">Đang Làm</option>
                    <option value="1">Nghỉ Phép</option>
                  </select>
                </div>
                <div className=" row mt-3 form-outline form-white mb-2">
                  <div className="col-6">
                    <button
                      type="submit"
                   
                      className="btn btn-secondary form-control"
                    >
                     Update
                    </button>
                  </div>
                  <div className="col-6">
                    <Link
                      to="/nhanvien/index"
                      className="btn btn-danger form-control"
                    >
                      Cancel
                    </Link>
                  </div>
                </div>
              </div>
            </form>
            <button onClick={onClose}>Close</button>
            {children}
          </div>
        </div>
      </main>
    </section></div>
        </>
    );

};

export default UpdateNhanVien;
