import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import NhanVienService from "../../../Api/NhanVienService";
import Sidebar from "../Layout/Sidebar";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import UpdateNhanVien from "./UpdateNhanVien";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/esm/Button";
import moment from 'moment';
const myStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
}

const ListNhanVien = () => {
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
    const handleClose = () => {
        setShow(false);
    };

    const handleShow = (id) => {
        console.log(id);
        setDeleteId(id);
        setShow(true);
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

        setPageNumber((prevPageNumber) => prevPageNumber + 1);
    };

    const deleteById = () => { 
            NhanVienService.deleteById(deleteId)
                .then((response) => {
                    setShow(false);
                        toast.success('Delete successfully');
                    // window.location.href = "/nhanvien/index";
                    fetchData();
                })
                .catch((error) => {
                    console.log(error);
                });
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
                                        <div></div>

                                        <input type="date" class="form-control rounded" placeholder="Ngày Kết Thúc" value={searchst} onChange={(e) => setSearChst(e.target.value)} aria-label="Search" aria-describedby="search-addon" />

                                    </div>
                                </div>
                                <div>
                                    <div class="input-group rounded">

                                        <input type="date" class="form-control rounded" placeholder="Search" value={searchen} onChange={(e) => setSearChen(e.target.value)} aria-label="Search" aria-describedby="search-addon" />


                                    </div>
                                </div> <span class="input-group-text border-0" id="search-addon" onClick={handleSearchns}>
                                    <i class="fas fa-search"></i>
                                </span>
                                <div>
                                    <div class="input-group rounded">
                                        <select value={selectchucVu} onChange={(e) => setselectChucVu(e.target.value)} aria-label="Search" onClick={handleSearchcv} aria-describedby="search-addon" class="form-control rounded" >
                                            <option value="">Chức Vụ</option>
                                            {nhanvien.map((cv) => (
                                                <option key={cv.chucVu?.maChucVu} value={cv.chucVu?.maChucVu}>
                                                    {cv.chucVu?.tenChucVu}
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
                                            <td style={{ paddingLeft: ' 35px' }}> <img src={nhanvien.image}/></td>
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
                                                <Link className="btn btn-success" to={'/nhanvien/update/' + nhanvien.id} >
                                                    <box-icon name='edit-alt' ><i class='bx bx-edit-alt' >

                                                    </i></box-icon>
                                                </Link>
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
              <Button variant="primary" onClick={(e) => deleteById (e)}>
                Có
              </Button>
            </Modal.Footer>
          </Modal>
        </>
            </section>
        </>
    );
};

export default ListNhanVien;