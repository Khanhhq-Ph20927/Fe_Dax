import React, { useEffect, useState } from "react";

import { Link } from 'react-router-dom';
import PhuKienService from "../../../Api/PhuKienService";
import Sidebar from "../Layout/Sidebar";
import { toast } from "react-toastify";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/esm/Button";
const myStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
}
const ListPhuKien = () => {
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

    // const fetchData = useCallback(async () => {
    //     try {
    //       const response = await PhuKienService.paging(pageNumber);
    //       const data = response.data.content;
    //       setPageData(data);
    //       console.log(data);
    //     } catch (error) {
    //       console.log(error);
    //     }
    //   }, [pageNumber]);
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

        setPageNumber((prevPageNumber) => prevPageNumber + 1);
    }
    const DeleteDV = () => {
            PhuKienService.deleteById(deleteId)
                .then((res) => {
                    setShow(false);
                    toast.success('Delete Successful');
                    // window.location.href = "/phukien/index";
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
                                            {phukien.map((cv) => (
                                                <option key={cv.nhaCungCap?.id} value={cv.nhaCungCap?.id}>
                                                    {cv.nhaCungCap?.ten}
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
                                                <Link className="btn btn-success" to={'/phukien/update/' + phukien.id}>
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


export default ListPhuKien;