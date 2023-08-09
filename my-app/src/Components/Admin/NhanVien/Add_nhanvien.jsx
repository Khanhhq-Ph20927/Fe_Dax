import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom'
import NhanVienService, { apiGetPublicDistrict, apiGetPublicProvinces } from '../../../Api/NhanVienService';
import ChucVuService from '../../../Api/ChucVuService';
import Sidebar from '../Layout/Sidebar';
import AddChucVu from '../ChucVu/Add_ChucVu';
import SelectAddress from './SelectAddress';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PhoneInput from 'react-phone-number-input/input'
import Swal from 'sweetalert2'
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/esm/Button";
import Scanner from './Scanner';
import axios from 'axios';
const Add_nhanvien = () => {
  const [maNhanVien, setMaNhanVien] = useState('');
  const [ho, setHo] = useState('');
  const [ten, setTen] = useState('');
  const [email, setEmail] = useState('');
  const [diaChi, setDiaChi] = useState('');
  const [sdt, setSdt] = useState('');
  const [trangThai, setTrangThai] = useState(0);
  const [ngaySinh, setNgaySinh] = useState('');
  const [ngayTao, setNgayTao] = useState('');
  const [ngaySua, setNgaySua] = useState('');
  const [chucVu, setChucVu] = useState([]);
  const [selectedChucVu, setSelectedChucVu] = useState(null);
  const [matKhau, setMatKhau] = useState('123');
  const [isOpen, setIsOpen] = useState(false);
  const [cmnd, setcmnd] = useState('');
  const [provinces, setProvinces] = useState([])
  const [province, setProvince] = useState()
  const [district, setDistrict] = useState()
  const [districts, setDistricts] = useState([])
  const [reset, setReset] = useState(false)
  const [show, setShow] = useState(false);
  const preset_key="du-an1";
  const cloud_name="dommoqita";
  const folder_name="anh-nhanvien";
  const [image,setImage]=useState("");
  const [onpenModal,setOpenModal]=useState(false);

  
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
  const handleScan =(result)=>{
    setcmnd(result);
  };
  const fetchData = async () => {
    try {
      const response = await ChucVuService.getAll();
      const data = response.data;
      setChucVu(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  // const [text,setText]=useState("");
  const saveNhanVien = (event) => {
    event.preventDefault();
    let newnhanvien = {
      maNhanVien: maNhanVien,
      ho: ho,
      ten: ten,
      email: email,
      diaChi: `${district ? `${districts?.find(item => item.district_id === district)?.district_name},` : ''}${province ? provinces?.find(item => item.province_id === province)?.province_name : ''}`,

      sdt: sdt,
      trangThai: trangThai,
      ngayTao: ngayTao,
      ngaySua: ngaySua,
      ngaySinh: ngaySinh,
      cmnd: cmnd,
      matKhau: matKhau,
      image:image,
      chucVu: { maChucVu: selectedChucVu }
    };
    const confix =window.confirm("Bạn có chắn muốn thêm không?")
    if(confix){
    console.log('nhanvien =>' + JSON.stringify(newnhanvien));
    NhanVienService.create(newnhanvien).then(res => {

      toast.success('Save Successful');
      
    }).catch(error => {
      if (error && error.response && error.response.data) {
        toast.error(error.response.data);
      }
    });
  }
  }


  //   const generateQR=(e)=>{
  // setText()
  //   }
  //   const handleChange=(e)=>{
  //     setText(e.target.value)
  //   }
  useEffect(() => {
    const fetchPublicProvince = async () => {
      const response = await apiGetPublicProvinces();
      if (response.status === 200) {
        setProvinces(response?.data.results)
      }
    }
    fetchPublicProvince();
  }, [])
  useEffect(() => {
    setDistrict(null)
    const fetchPublicDistrict = async () => {
      const response = await apiGetPublicDistrict(province)
      if (response.status === 200) {
        setDistricts(response.data?.results)
      }
    }
    province && fetchPublicDistrict()
    !province ? setReset(true) : setReset(false)
    !province && setDistricts([])
  }, [province])


  const changeChucVu = (event) => {
    setSelectedChucVu(event.target.value);
  }
  const changeCmnd = (event) => {
    setcmnd(event.target.value);
  }
  const changeMa = (event) => {
    setMaNhanVien(event.target.value);
  }
  const changeMatKhau = (event) => {
    setMatKhau(event.target.value);
  }
  const changeNgaySinh = (event) => {
    setNgaySinh(event.target.value);
  }
  const changeHo = (event) => {
    setHo(event.target.value);
  }
  const changeTen = (event) => {
    setTen(event.target.value);
  }


  const changeEmail = (event) => {
    setEmail(event.target.value);
  }
  const changeSDT = (event) => {

    setSdt(event.target.value);
  }
  const changeDiaChi = (event) => {
    setDiaChi(event.target.value);
  }
  const changeTrangThai = (event) => {
    setTrangThai(event.target.value);
  }
  const changeNgayTao = (event) => {
    setNgayTao(event.target.value);
  }

  const changeNgaySua = (event) => {
    setNgaySua(event.target.value);
  }


  return (
    <>
      <Sidebar />
      <section id="content">
        <main className="container">
          <div className="table-data">
            <div className="order">
              <div className="head">
                <h3>Thêm Nhân Viên</h3>
              </div>
              {/* <div>
                <button onClick={() => setIsOpen(true)}>
                  Open
                  <AddChucVu open={isOpen} onClose={() => setIsOpen(false)}>
                    facy model
                  </AddChucVu>
                </button>
              </div> */}
              <form onSubmit={saveNhanVien}>
                <div className=" row col-md-6 offset-md-3">
                  <div className="md-3">
                    <label>Họ</label>
                    <input
                      type="text"
                      className="form-control" name='ho'
                      value={ho}
                      onChange={changeHo}
                    />
                  </div>
                  <div className="md-3">
                    <label>Tên</label>
                    <input
                      type="text"
                      className="form-control" name='ten'
                      value={ten}
                      onChange={changeTen}
                    />
                  </div>
                  <div className="md-3">
                    <label>Ngày Sinh</label>
                    <input
                      type="date"
                      className="form-control" name='ngaySinh'
                      value={ngaySinh}
                      onChange={changeNgaySinh}
                      max={new Date().toISOString().split('T')[0]}
                    />
                  </div>
                  {/* <div className="md-3">
                      <label>Ngày Sửa</label>
                      <input
                        type="date"
                        className="form-control"name='ngaySua'
                        value={this.state.ngaySua}
                        onChange={this.changeNgaySua}
                      />
                    </div> */}

                  {/* <div className="md-3">
                      <label>Mat Khẩu</label>
                      <input
                        type="password"
                        className="form-control"name='matKhau'
                        value={this.state.matKhau}
                        onChange={this.changeMatKhau}
                      />
                    </div> */}

                  {/* <div className="md-3">
                    <label>Dịa Chỉ</label>
                    <input
                      type="text"
                      className="form-control" readOnly name='diaChi'onChange={changeDiaChi}
                       value={diaChi}
                    />
                  </div> */}
                  <div className="md-3">
                    <label>Chức Vụ</label>
                    <select
                      class="form-select" name='chucVu'
                      value={selectedChucVu || ''}
                      onChange={changeChucVu}
                    >
                      <option value="">Chức Vu</option>
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
                      className="form-control" name='email'
                      value={email}
                      onChange={changeEmail}
                    />
                  </div>
                  <div className="md-3">
                    <label>SDT</label>
                    <input
                      type="tel"
                      className="form-control" name='sdt'
                      value={sdt}
                      onChange={changeSDT}
                    />
                  </div>
                  <div className="md-3">
                    <label>CMND</label>
                    <input
                      type="tel"
                      className="form-control" name='cmnd'
                      value={cmnd}
                      onChange={(event)=>setcmnd(event.target.value)}
                    />
                  </div>
                  <div>
                    <Link className="btn btn-secondary " onClick={()=>{setOpenModal(true)}}>+</Link>
                   {onpenModal && <Scanner closeModal={setOpenModal} onScan={handleScan}/>}
                  </div>
                  <div className="md-3">
                    <SelectAddress type='province' value={province} setValue={setProvince} options={provinces} label='Tỉnh/Thành phố'></SelectAddress>
                    <SelectAddress type='district' value={district} setValue={setDistrict} options={districts} label='Quận/Huyện'></SelectAddress>
                  </div>
                  <div className='md-3'>
                    <label>Ảnh</label>
                    <input type="file" name="image" onChange={handleFile} className='form-control'/>
                    <br />
                    <img src={image} className='w-40 h-40' />
                  </div>
                  {/* <div className="md-3">
                    <label>Trang Thái</label>
                    <select
                      class="form-select" name='trangThai'
                      value={trangThai}
                      onChange={changeTrangThai}
                    >
                      {/* <option value={0}>Trạng Thái</option> */}
                  {/* <option value="0">Trong ca</option>
                      <option value="1">Nghỉ</option>
                    </select>

                  </div> */}
                  <div>
                  <div className=" row mt-3 form-outline form-white mb-2">
                    <div className="col-6">
                      <button
                        type="submit"
                        onClick={saveNhanVien}
                        className="btn btn-secondary form-control"
                      >
                        ADD
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
                </div></div>
              </form>
            </div>
          </div>
        </main>
      </section> <ToastContainer />
    </>

  );

}
export default Add_nhanvien;