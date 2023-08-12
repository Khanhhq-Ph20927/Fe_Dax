import React, { useEffect, useState } from "react";
import { Link, useParams } from 'react-router-dom';
import NhanVienService from "../../../Api/NhanVienService";
import Sidebar from "../Layout/Sidebar";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import UpdateNhanVien from "./UpdateNhanVien";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/esm/Button";
import moment from 'moment';
import ChucVuService from "../../../Api/ChucVuService";

import { instance } from "../../../Api/instance";
const myStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
}

export default function ListNhanVien() {
    const pageSize = 2; // Kích thước trang
    const [nhanvien, setNhanVien] = useState([]);
    const [pageNumber, setPageNumber] = useState(0);
    const [pageData, setPageData] = useState([]);
    const [searchKeyword, setSearchKeyword] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [selectchucVu, setselectChucVu] = useState("");
    const [searchTT, setSearchTT] = useState("");
    const [searchst, setSearChst] = useState("");
    const [searchen, setSearChen] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [show, setShow] = useState(false);
    const [deleteId, setDeleteId] = useState("");
    const [updateId, setUpdateId] = useState("");
    const [showConfrimUpdate, setConfrimUpdate] = useState(false);
    const [showModalUpdate, setshowModalUpdate] = useState(false);
    const [getid, setid] = useState("");
    const [maNhanVien, setMa] = useState('');
    const [ten, setTen] = useState('');
    const [trangThai, setTrangThai] = useState(0);
    const [diaChi, setDiaChi] = useState('');
    const [ho, setHo] = useState('');
    const [ngayTao, setNgayTao] = useState('');
    const [ngaySua, setNgaySua] = useState('');
    const [email, setEmail] = useState('');
    const [image, setImage] = useState('');
    const [sdt, setSdt] = useState('');
    const [ngaySinh, setNgaySinh] = useState('');
    const [matKhau, setMatKhau] = useState('');
    const [chucVu, setChucVu] = useState([]);
    const preset_key = "du-an1";
    const cloud_name = "dommoqita";
    const folder_name = "anh-nhanvien";


    const handleFile = (event) => {
        const file = event.target.files[0];
        const formData = new FormData();
        formData.append('file', file);
        formData.append("upload_preset", preset_key);
        formData.append("folder", folder_name);
        instance.post(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`, formData)
            .then(res => setImage(res.data.secure_url))
            .catch(err => console.log(err));
    };
    // const [selectchucVu,setselectChucVu]=useState(null);
    const handleClose = () => {
        setShow(false);
        setshowModalUpdate(false);
        setConfrimUpdate(false)
    };

    const handleShow = (id) => {
        console.log(id);
        setid(id);
        setShow(true);
    };
    const handleShowUpdate = (id) => {
        console.log(id);
        setid(id);
        setshowModalUpdate(true);
    };
    const handleShowConfrimUpdate = () => {
        setshowModalUpdate(false);
        setConfrimUpdate(true);
    };
    const fetchData = async () => {
        try {
            const response = await NhanVienService.getAll();

            const data = response.data;
            data.sort((a, b) => (a.ngayTao < b.ngayTao) ? 1 : -1)
            setNhanVien(data);

            //             
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        const currentData = searchResults.length > 0 ? searchResults : nhanvien;
        const startIndex = pageNumber * pageSize;
        const endIndex = startIndex + pageSize;
        const currentPageData = currentData.slice(startIndex, endIndex);

        setPageData(currentPageData);
    }, [pageNumber, pageSize, searchResults, nhanvien]);

    const handleSearch = () => {
        NhanVienService.search(searchKeyword)
            .then((response) => {
                setSearchResults(response.data);
                setPageNumber(0); // Đặt lại số trang về 0
            })
            .catch((error) => {
                toast.error('Nhập Mã Hoặc tên Cần Tìm');
            });
    };
    const handleSearchns = () => {
        NhanVienService.seachns(searchst, searchen)
            .then((response) => {
                setSearchResults(response.data);
                setPageNumber(0); // Đặt lại số trang về 0
            })
            .catch((error) => {
                toast.error('Nhập Ngày bắt Đầu và kết thúc')
            });
    };
    const handleSearchcv = () => {
        NhanVienService.searchcv(selectchucVu)
            .then((response) => {
                setSearchResults(response.data);
                setPageNumber(0); // Đặt lại số trang về 0
                if(response.data.length ===0){
                    toast.error("Không tìm thấy");
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };
    const handleSearchtt = () => {
        NhanVienService.seachtt(searchTT).then((response) => {
            setSearchResults(response.data);
            setPageNumber(0);
        }).catch((error) => {
            console.log(error);
        });
    }
    const handleResetSearch = () => {
        setselectChucVu("");
        setSearchKeyword("");
        setSearchTT("");
        setSearChst("");
        setSearChen("");
        setSearchResults([]);
        setPageNumber(0);
    };

    const handlePreviousPage = () => {
        if (pageNumber > 0) {
            setPageNumber((prevPageNumber) => prevPageNumber - 1);
        }
    };

    const handleNextPage = () => {
        const currentData = searchResults.length > 1 ? searchResults : nhanvien;
        const startIndex = pageNumber * pageSize;
        const endIndex = startIndex + pageSize;
        const currentPageData = currentData.slice(startIndex, endIndex);

        if (currentPageData.length >= pageSize && currentPageData.length > 0) {
            setPageNumber((prevPageNumber) => prevPageNumber + 1);
        }
    };

    const deleteById = () => {
        console.log(getid)
        NhanVienService.deleteById(getid)
            .then((response) => {
                setShow(false);
                toast.success('Delete successfully');
                // window.location.href = "/nhanvien/index";
                fetchData();
            })
            .catch((error) => {
                toast.error("Delete thất bại");
                console.log(error);
            });
    };
    const ListChucVu = () => {
        ChucVuService.getAll().then((response) => {
            setChucVu(response.data);
        }).catch((error) => {
            console.log(error);
        });
    };
    useEffect(() => {

        ListChucVu();
        NhanVienService.getById(getid).then((res) => {
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
        }).catch((error) => {
            console.log("Error", error);
        });
    }, [getid]);
    const updatenhanvien = (e) => {
        e.preventDefault();
        let nhanvien = {

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
            image,
            email,
            chucVu: { maChucVu: selectchucVu }
        };

        console.log(getid);
        console.log('nhanvien =>' + JSON.stringify(nhanvien));
        NhanVienService.update(getid, nhanvien).then(res => {
            setConfrimUpdate(false);
            toast.success("Update thành công");
            fetchData();
        }).catch((error) => {
            toast.error("Update thất bại");
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
    return (
        <>
            <Sidebar />
            <section id="content">
                <main>
                    <div className="table-data ">
                        <div className="order">
                            <div >
                                <h3 style={{ textAlign: 'center' }}>Nhân Viên</h3>
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
                                        <label>BĐ: </label>

                                        <input type="date" class="form-control rounded" placeholder="Ngày Kết Thúc" value={searchst} onChange={(e) => setSearChst(e.target.value)} aria-label="Search" aria-describedby="search-addon" />

                                    </div>
                                </div>
                                <div>
                                    <div class="input-group rounded">
                                        <label>KT: </label>
                                        <input type="date" class="form-control rounded" placeholder="Search" value={searchen} onChange={(e) => setSearChen(e.target.value)} aria-label="Search" aria-describedby="search-addon" />


                                    </div>
                                </div> <span class="input-group-text border-0" id="search-addon" onClick={handleSearchns}>
                                    <i class="fas fa-search"></i>
                                </span>
                                <div>
                                    <div class="input-group rounded">
                                        <select value={selectchucVu} onChange={(e) => setselectChucVu(e.target.value)} aria-label="Search"onClick={handleSearchcv} aria-describedby="search-addon" class="form-control rounded" >
                                            <option value="">Chức Vụ</option>
                                            {chucVu.map((cv) => (
                                                <option key={cv.maChucVu} value={cv.maChucVu}>
                                                    {cv.tenChucVu}
                                                </option>
                                            ))}
                                        </select>
                                        
                                    </div>
                                </div>
                                <div>
                                    <div class="input-group rounded">
                                        <select value={searchTT} onChange={(e) => setSearchTT(e.target.value)} aria-label="Search" onClick={handleSearchtt} aria-describedby="search-addon" class="form-control rounded" >
                                            <option value="">Trạng Thái</option>
                                            <option value="0">Đang Làm</option>
                                            <option value="1">Nghỉ</option>
                                        </select>
                                    </div>
                                </div>
                                <button onClick={handleResetSearch} className="btn btn-sm btn-danger">Reset</button>
                            </div>
                            <div>
                                <div className="head" style={{ paddingLeft: ' 95%' }}>
                                    <Link to="/nhanvien/create" className="btn btn-primary">
                                        Add
                                    </Link>
                                </div>
                            </div>
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th>STT</th>
                                        <th>Ảnh</th>
                                        <th>Mã Nhân Viên</th>
                                        <th>Họ Tên</th>
                                        <th>Email</th>
                                        <th>SDT</th>
                                        <th>Địa Chỉ</th>
                                        <th>Ngày Sinh</th>
                                        <th>Trang Thái</th>
                                        <th>Chức Vụ</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {pageData.map((nhanvien, index) => (
                                        <tr key={nhanvien.id}>
                                            <th scope="row">
                                                <td>{index + 1}</td>
                                            </th>
                                            <td style={{ paddingLeft: ' 35px' }}> <img src={nhanvien.image} /></td>
                                            <td style={{ paddingLeft: ' 5px' }}>{nhanvien.maNhanVien}</td>
                                            <td style={{ paddingLeft: ' 5px' }}>{nhanvien.ho + nhanvien.ten}</td>
                                            <td style={{ paddingLeft: ' 35px' }}>{nhanvien.email}</td>
                                            <td style={{ paddingLeft: ' 3px' }}>{nhanvien.sdt}</td>
                                            <td style={{ paddingLeft: ' 35px' }}>{nhanvien.diaChi}</td>
                                            <td style={{ paddingLeft: ' 35px' }} >{moment(nhanvien.ngaySinh).format('DD-MM-YYYY')}</td>
                                            <td style={{ paddingLeft: ' 35px' }}>{nhanvien.trangThai === 0 ? 'Đang Làm' : 'Nghỉ Phép'}</td>
                                            <td style={{ paddingLeft: ' 35px' }}>{nhanvien.chucVu?.tenChucVu}</td>

                                            <td>


                                                <button className="btn btn-sm btn-danger"
                                                    onClick={() => handleShow(nhanvien.id)}

                                                >
                                                    <box-icon name='trash'><i class='bx bx-trash'></i> </box-icon>
                                                </button>
                                                <span className="padd"></span>
                                                <button className="btn btn-success" onClick={() => handleShowUpdate(nhanvien.id)} >
                                                    <box-icon name='edit-alt' ><i class='bx bx-edit-alt' >

                                                    </i></box-icon>
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <div style={myStyle}>
                                <nav aria-label="Page navigation example" >
                                    <ul className="pagination justify-content-center" >
                                        <li className="page-item">
                                            <button className="page-link" disabled={pageNumber === 0} onClick={handlePreviousPage}>
                                                Previous
                                            </button>
                                        </li>
                                        <li className="page-item">
                                            <button className="page-link" disabled>
                                                {pageNumber + 1}
                                            </button>
                                        </li>
                                        <li className="page-item">
                                            <button className="page-link" onClick={handleNextPage}>
                                                Next
                                            </button>
                                        </li>
                                    </ul>
                                </nav></div>
                        </div>
                    </div>
                </main>
                <>
                    <Modal show={showModalUpdate} onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Cập nhập</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <main className="container">


                                <div className="head">
                                    <h3>Update Nhân Viên</h3>
                                </div>
                                <form onSubmit={updatenhanvien}>
                                    <div className="row">
                                        <div className="row mt-3">
                                            <div className="col-6">
                                                <label>Tên</label>
                                                <input
                                                    type="text"
                                                    className="form-control" name='ten'
                                                    value={ten}
                                                    onChange={changeten}
                                                />
                                            </div>
                                            <div className="col-6">
                                                <label>Mã</label>
                                                <input
                                                    type="text"
                                                    className="form-control" name='maNhanVien'
                                                    value={maNhanVien}
                                                    onChange={changema}
                                                />
                                            </div></div>
                                        {/* <div className="md-3">
                  <label>Ngày Tạo</label>
                  <input
                    type="date"
                    className="form-control"name='ngayTao'
                    value={ngayTao}
                    onChange={changengaytao}
                  />
                </div> */}
                                        <div className="row mt-3">
                                            <div className="col-6">
                                                <label>Ngày Sinh</label>
                                                <input
                                                    type="date"
                                                    className="form-control" name='ngaySinh'
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
                                            <div className="col-6">
                                                <label>Họ</label>
                                                <input
                                                    type="text"
                                                    className="form-control" name='ho'
                                                    value={ho}
                                                    onChange={changeho}
                                                />
                                            </div>
                                        </div>
                                        <div className="row mt-3">
                                            <div className="col-6">
                                                <label>Mat Khẩu</label>
                                                <input
                                                    type="password"
                                                    className="form-control" name='matKhau'
                                                    value={matKhau}
                                                    onChange={changematKhau}
                                                />
                                            </div>
                                            <div className="col-6">
                                                <label>Dịa Chỉ</label>
                                                <input
                                                    type="text"
                                                    className="form-control" name='diaChi'
                                                    value={diaChi}
                                                    onChange={changediachi}
                                                />
                                            </div>
                                        </div>
                                        <div className="row mt-3">
                                            <div className="col-6">
                                                <label>Chức Vụ</label>
                                                <select
                                                    class="form-select" name='chucVu'
                                                    value={selectchucVu || ''}
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
                                            <div className="col-6">
                                                <label>Email</label>
                                                <input
                                                    type="email"
                                                    className="form-control" name='email'
                                                    value={email}
                                                    onChange={changeemail}
                                                />
                                            </div></div>
                                        <div className="row mt-3">
                                            <div className="col-6">
                                                <label>SDT</label>
                                                <input
                                                    type="text"
                                                    className="form-control" name='sdt'
                                                    value={sdt}
                                                    onChange={changesdt}
                                                />
                                            </div>

                                            <div className="col-6">
                                                <label>Trang Thái</label>
                                                <select
                                                    class="form-select" name='trangThai'
                                                    value={trangThai}
                                                    onChange={changetrangthai}
                                                >

                                                    <option value="0">Đang Làm</option>
                                                    <option value="1">Nghỉ Phép</option>
                                                </select>
                                            </div></div>
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
                <>
                    <Modal show={showConfrimUpdate} onHide={handleClose} backdrop="static" keyboard={false}>
                        <Modal.Header closeButton>
                            <Modal.Title>Cập nhật dịch vụ</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>Bạn có chắc chắn muốn cập nhật</Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Không
                            </Button>
                            <Button variant="primary" onClick={updatenhanvien}>Co</Button>
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
                            <Modal.Title>Xóa Nhân Viên</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>Bạn có chắc chắn muốn xóa ?</Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Không
                            </Button>
                            <Button variant="primary" onClick={(e) => deleteById(e)}>
                                Có
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </>
            </section>
        </>
    );
}

