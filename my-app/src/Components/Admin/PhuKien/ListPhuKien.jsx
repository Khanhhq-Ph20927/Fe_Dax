import React, { useEffect, useState } from "react";

import { Link } from 'react-router-dom';
import PhuKienService from "../../../Api/PhuKienService";
import Sidebar from "../Layout/Sidebar";
import { toast } from "react-toastify";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/esm/Button";
import NhaCungCapService from "../../../Api/NhaCungCapService";
import axios from "axios";
import { instance } from "../../../Api/instance";
const myStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
}
export default function ListPhuKien(){
    const pageSize = 2;
    const [phukien, setPhuKien] = useState([])
    const [pageNumber, setPageNumber] = useState(0);
    const [pageData, setPageData] = useState([]);
    const [searchKeyword, setSearchKeyword] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [searchNhacc, setSearchNhacc] = useState("");
    const [searchtt, setSearchtt] = useState("");
    const [searchgia, setSearchgia] = useState("");
    const [show, setShow] = useState(false);
    const [deleteId, setDeleteId] = useState("");
     const [maPhuKien, setMaPhuKien] = useState('');
    const [tenPhuKien, setTenPhuKien] = useState('');
    const [gia, setGia] = useState('');
    const [soLuongTon, setSoLuongTon] = useState('');
    const [ngayTao, setNgayTao] = useState('');
    const [ngaySua, setNgaySua] = useState('');
    const [trangThai, setTrangThai] = useState('');
    const [nhaCungCap, setNhaCC] = useState([]);
     const [getid,setid]=useState("");
     const [showConfrimUpdate,setConfrimUpdate]=useState(false);
    const [showModalUpdate,setshowModalUpdate]=useState(false);
    const [selectnhacc, setselectNhaCC] = useState(null);
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
        instance.post(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,formData)
        .then(res =>setImage(res.data.secure_url))
        .catch(err=>console.log(err));
       
    }
    const handleClose = () => {
        setShow(false);
        setshowModalUpdate(false);
        setConfrimUpdate(false);
    };

    const handleShow = (id) => {
        console.log(id);
        setid(id);
        setShow(true);
    };
     const handleShowUpdate =(id)=>{
       console.log(id);
       setid(id);
       setshowModalUpdate(true);
    };
    const handleShowConfrimUpdate =()=>{
        setshowModalUpdate(false);
        setConfrimUpdate(true);
    };
    const fetchData = async () => {
        try {    
          const response = await PhuKienService.getAll();
          
          const data = response.data;
          data.sort((a, b) => (a.ngayTao < b.ngayTao) ? 1 : -1)
          setPhuKien(data);
      
    //             
        } catch (error) {
          console.log(error);
        }
      };
    useEffect(() => {
        fetchData();
    }, [])
    useEffect(() => {
        const currentData = searchResults.length > 0 ? searchResults : phukien;
        const startIndex = pageNumber * pageSize;
        const endIndex = startIndex + pageSize;
        const currentPageData = currentData.slice(startIndex, endIndex);

        setPageData(currentPageData);
    }, [pageNumber, pageSize, searchResults, phukien]);

    const handleSearch = () => {
        PhuKienService.search(searchKeyword)
            .then((response) => {
                setSearchResults(response.data);
                setPageNumber(0); // Đặt lại số trang về 0
            })
            .catch((error) => {
                toast('Nhập Mã Phụ Kiện Cần Tìm');
            });
    };
    const handleSearchgia = () => {
        PhuKienService.searchgia(searchgia)
            .then((response) => {
                setSearchResults(response.data);
                setPageNumber(0); // Đặt lại số trang về 0
            })
            .catch((error) => {
                toast('Nhập Mã Phụ Kiện Cần Tìm');
            });
    };
    const handleSearchncc = () => {
        PhuKienService.searchncc(searchNhacc)
            .then((response) => {
                setSearchResults(response.data);
                setPageNumber(0); // Đặt lại số trang về 0
                if(response.data.length === 0){
                    toast.error("Không tìm thấy kết quả");
                }
            })
            .catch((error) => {
                
                console.log(error);
            });
    };
    const handleSearchtt = () => {
        PhuKienService.searchtt(searchtt)
            .then((response) => {
                setSearchResults(response.data);
                setPageNumber(0); // Đặt lại số trang về 0
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const handleResetSearch = () => {
        setSearchKeyword("");
        setSearchNhacc("");
        setSearchgia("");
        setSearchtt("");
        setSearchResults([]);
        setPageNumber(0);
    };

    const handlePreviousPage = () => {
        if (pageNumber > 0) {
            setPageNumber((prevPageNumber) => prevPageNumber - 1);
        }
    };
const handleNextPage = () => {
  const currentData = searchResults.length > 1 ? searchResults : phukien;
  const startIndex = pageNumber * pageSize;
  const endIndex = startIndex + pageSize;
  const currentPageData = currentData.slice(startIndex, endIndex);

  if (currentPageData.length >= pageSize && currentPageData.length > 1) {
    setPageNumber((prevPageNumber) => prevPageNumber + 1);
  }
    };
    const DeleteDV = () => {
            PhuKienService.deleteById(getid)
                .then((res) => {
                    setShow(false);
                    toast.success('Delete Successful');
                    // window.location.href = "/phukien/index";
                    fetchData();
                })
                .catch((error) => {
                    toast.error('Delete Thất bại');
                    console.log(error);
                });
        };
    useEffect(() => {
        ListNhaCC();
        PhuKienService.getById(getid).then((res) => {
            let phukien = res.data;
            setTenPhuKien(phukien.tenPhuKien);
            setMaPhuKien(phukien.maPhuKien);
            setGia(phukien.gia);
            setSoLuongTon(phukien.soLuongTon);
            setNgayTao(phukien.ngayTao);
            setNgaySua(phukien.ngaySua);
            setTrangThai(phukien.trangThai);
            setImage(phukien.image);
            setselectNhaCC(phukien.nhaCungCap.id);
        }).catch((error)=>{
            console.log("Error",error);
        });
    }, [getid]);

    const ListNhaCC = () => {
        NhaCungCapService.getAll().then((response) => {
            setNhaCC(response.data);
        }).catch((error) => {
            console.log(error);
        });
    };

    const changengaytao = (e) => {
        setNgayTao(e.target.value);
    };

    const changengaysua = (e) => {
        setNgaySua(e.target.value);
    };
    const changegia = (e) => {
        setGia(e.target.value);
    };
    const changetrangthai = (e) => {
        setTrangThai(e.target.value);
    };
    const changemaphukien = (e) => {
        setMaPhuKien(e.target.value);
    };
    const changeimage = (e) => {
        setImage(e.target.value);
    };
    const changetenphukien = (e) => {
        setTenPhuKien(e.target.value);
    };
    const changesoluongton = (e) => {
        setSoLuongTon(e.target.value);
    };

    const changenhacc = (e) => {
        setselectNhaCC(e.target.value);
    };
    const updatephukien = (e) => {
        e.preventDefault();
        let phukien = {
        
            maPhuKien,
            tenPhuKien,
            gia,
            soLuongTon,
            ngayTao,
            ngaySua,
            trangThai,
            image,
            nhaCungCap: { id: selectnhacc },


        };
        console.log(getid);
        console.log('phukien =>' + JSON.stringify(phukien));
        PhuKienService.update(getid, phukien).then(res => {
            setConfrimUpdate(false);
            toast.success('Update Successful');
           fetchData();
        }).catch((error)=>{
            toast.error("Update thất bại");
            console.log(error);
        });
    
};
    return (
        <>
            <Sidebar />
            <section id="content">
                {/* MAIN */}
                <main>
                    <div className="table-data">
                        <div className="order">
                            <div >
                                <h3 style={{ textAlign: 'center' }}>Phụ Kiện</h3>
                            </div>
                            <div className="head" style={{ paddingLeft: '20%' }}>
                                <div>
                                    <div class="input-group rounded">
                                        <input type="text" class="form-control rounded" placeholder="Search" value={searchKeyword} onChange={(e) => setSearchKeyword(e.target.value)} aria-label="Search" aria-describedby="search-addon" />
                                        <span class="input-group-text border-0" id="search-addon" onClick={handleSearch}>
                                            <i class="fas fa-search"></i>
                                        </span>
                                    </div>
                                </div>
                                <div>
                                    <div class="input-group rounded">
                                        <input type="text" class="form-control rounded" placeholder="Search gia" value={searchgia} onChange={(e) => setSearchgia(e.target.value)} aria-label="Search" aria-describedby="search-addon" />
                                        <span class="input-group-text border-0" id="search-addon" onClick={handleSearchgia}>
                                            <i class="fas fa-search"></i>
                                        </span>
                                    </div>
                                </div>
                                <div>
                                    <div class="input-group rounded">
                                        <select value={searchNhacc} onChange={(e) => setSearchNhacc(e.target.value)} aria-label="Search" onClick={handleSearchncc} aria-describedby="search-addon" class="form-control rounded" >
                                            <option value="">Nha CC</option>
                                            {nhaCungCap.map((cv) => (
                                                <option key={cv.id} value={cv.id}>
                                                    {cv.ten}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <div>
                                    <div class="input-group rounded">
                                        <select value={searchtt} onChange={(e) => setSearchtt(e.target.value)} aria-label="Search" onClick={handleSearchtt} aria-describedby="search-addon" class="form-control rounded" >
                                            <option value="">Trạng Thái</option>
                                            <option value="0">Còn Hàng</option>
                                            <option value="1">Hết Hàng</option>
                                        </select>
                                    </div>
                                </div>
                                <button onClick={handleResetSearch} className="btn btn-sm btn-danger">Reset</button>
                                </div> 
                                <div className="head" style={{ paddingLeft: ' 95%' }}>
                                <div>
                                    <Link to="/phukien/create" className="btn btn-primary">
                                        Add
                                    </Link>
                                </div>
                            </div>
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th>STT</th>
                                         <th>Ảnh</th>
                                        <th>Mã Phụ Kiện</th>
                                        <th>Tên Phụ Kiện</th>
                                        <th>Giá</th>
                                        <th>Số Lượng Tồn</th>
                                        <th>Nhà cùng Cấp</th>
                                        <th>Trang Thái</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {pageData.map((phukien, index) => (
                                        <tr key={phukien.id}>
                                            <th scope="row" key={index}>
                                                <td>{index + 1}</td>
                                            </th>
                                           <td><img src={phukien.image} style={{height:'60px',width:'60px'}}/></td>
                                            <td>{phukien.maPhuKien}</td>
                                            <td>{phukien.tenPhuKien}</td>
                                            <td>{Intl.NumberFormat("vi-VN", {
                                                style: "currency",
                                                currency: "VND",
                                            }).format(phukien.gia)}</td>
                                            <td>{phukien.soLuongTon}</td>
                                            <td>{phukien.nhaCungCap?.ten}</td>
                                            <td>{phukien.trangThai === 0 ? 'Còn Hàng' : 'Hết Hàng'}</td>
                                            <td>
                                                <button
                                                    onClick={() => handleShow(phukien.id)}
                                                    className="btn btn-sm btn-danger"
                                                >
                                                    <box-icon name='trash'><i class='bx bx-trash'></i> </box-icon>
                                                </button>
                                                <span className="padd"></span>
                                                <Link className="btn btn-success" onClick={() => handleShowUpdate(phukien.id)}>
                                                    <box-icon name='edit-alt' ><i class='bx bx-edit-alt' ></i></box-icon>
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <nav aria-label="Page navigation example" style={myStyle}>
                                <ul class="pagination">
                                    <li class="page-item"><button class="page-link" onClick={handlePreviousPage}>Previous</button></li>
                                    <li class="page-item"><button class="page-link" disabled>{pageNumber + 1}</button></li>
                                    <li class="page-item"><button class="page-link" onClick={handleNextPage}>Next</button></li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                </main>
                
                 <>
          <Modal show={showModalUpdate} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Cập nhật</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <main className="container">
                    
                            <div className="head">
                                <h3>Update Phụ Kiện</h3>
                            </div>
                            <form onSubmit={updatephukien}>
                                <div className="row">
                                <div className=" row mt-3">
                                    <div className="col-6">
                                        <label>Nhà Cung Cấp</label>
                                        <select
                                            className="form-select"
                                            aria-label="Default select example"
                                            name="nhaCungCap"
                                            value={selectnhacc || ''} // Chỉnh sửa ở đây
                                            onChange={changenhacc}
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
                                        <input type="date" value={ngayTao} name="ngayTao"
                                            onChange={changengaytao} className='form-control' />
                                    </div> */}
                                    <div className="col-6">
                                        <label className="form-label">
                                            Mã Phu Kiện
                                        </label>
                                        <input type="text" value={maPhuKien} name="maPhuKien"
                                            onChange={changemaphukien} className='form-control' />
                                    </div></div>
                                    <div className="row mt-3">
                                    <div className="col-6">
                                        <label className="form-label">
                                            Tên Phụ Kiện
                                        </label>
                                        <input className="form-control" type="text" name="tenPhuKien" value={tenPhuKien}
                                            onChange={changetenphukien} />
                                    </div>
                                    <div className="col-6">
                                        <label className="form-label">
                                            Số Lượng Tồn
                                        </label>
                                        <input type="number" className="form-control" name="soLuongTon" value={soLuongTon}
                                            onChange={changesoluongton} />
                                    </div></div>
                                    <div className="row mt-3">
                                    <div className="col-6">
                                        <label className="form-label">
                                            Giá
                                        </label>
                                        <input className="form-control" type="number" name="gia" value={gia}
                                            onChange={changegia} />
                                    </div>
                                    {/* <div className="md-3">
                                        <label className="form-label">
                                            Ngày Sửa
                                        </label>
                                        <input type="date" value={ngaySua} name="ngaySua"
                                            onChange={changengaysua} className='form-control' />
                                    </div> */}
                                    <div className="col-6">
                                        <label>Trang Thái</label>
                                        <select
                                            class="form-select" name='trangThai'
                                            value={trangThai}
                                            onChange={changetrangthai}
                                        >

                                            <option value="0">Còn Hàng</option>
                                            <option value="1">Hết Hàng</option>
                                        </select>
                                    </div>
                                    </div>
                                    <div className="row mt-3">
                                                <div className='col-6'>
                                                    <label>Ảnh</label>
                                                    <input type="file" name="image" onChange={handleFile} className='form-control' />
                                                    <br />
                                                    <img src={image} onChange={changeimage} />
                                                </div>
                                            </div>
                                </div>
                            </form>
                     
                </main>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Cancel
              </Button>
              <Button variant="primary" onClick={handleShowConfrimUpdate}>
                Update
              </Button>
            </Modal.Footer>
          </Modal>
        </>
        {/* modalConfrimUpdate */}
        <>
          <Modal
            show={showConfrimUpdate}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
          >
            <Modal.Header closeButton>
              <Modal.Title>Cập nhật Dịch vụ</Modal.Title>
            </Modal.Header>
            <Modal.Body>Bạn có chắc chắn muốn cập nhật?</Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Không
              </Button>
              <Button variant="primary" onClick={updatephukien}>
                Có
              </Button>
            </Modal.Footer>
          </Modal>
        </>
        <>
          <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
          >
            <Modal.Header closeButton>
              <Modal.Title>Xóa Phụ Kiện</Modal.Title>
            </Modal.Header>
            <Modal.Body>Bạn có chắc chắn muốn xóa ?</Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Không
              </Button>
              <Button variant="primary" onClick={(e) => DeleteDV(e) }>
                Có
              </Button>
            </Modal.Footer>
          </Modal>
        </>
                {/* MAIN */}
            </section>
        </>
    );
}

