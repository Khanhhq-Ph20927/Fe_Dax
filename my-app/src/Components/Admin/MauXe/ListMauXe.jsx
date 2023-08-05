import React,{useEffect,useState} from "react";
import { Link } from "react-router-dom";
import Sidebar from "../Layout/Sidebar";
import MauXeService from "../../../Api/MauXeService";
import { toast } from "react-toastify";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/esm/Button";
const myStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
}
const ListMauXe =()=>{
    const pageSize =2;
    const [mauxe,setMauXe]=useState([]);
    const [hangxe,setHangXe]=useState([]);
    const [pageNumber,setPageNumber]=useState(0);
    const [pageData,setPageData]=useState([]);
    const [show, setShow] = useState(false);
    const [deleteId, setDeleteId] = useState("");
    const handleClose=()=>{
        setShow(false);
    };
    const handleShow=(id)=>{
        console.log(id);
        setDeleteId(id);
        setShow(true);
    };
    const fetchData =async ()=>{
    try{
        const response =await MauXeService.getAll();
        const data=response.data;
        setMauXe(data);
    } catch(error){
        console.log(error);
    }
   };
   useEffect(()=>{
    fetchData();
   },[])
   const DeleteDV=()=>{
    MauXeService.deleteById(deleteId)
    .then((res)=>{
        setShow(false);
        toast.success('Delete Successful')
        fetchData();
    }).catch((error)=>{
        console.log(error);
    });
   };
   return(
    <>
            <Sidebar />
            <section id="content">
                {/* MAIN */}
                <main>
                    <div className="table-data">
                        <div className="order">
                            <div >
                                <h3 style={{ textAlign: 'center' }}>Mẫu Xe</h3>
                            </div>
                           
                                <div className="head" style={{ paddingLeft: ' 95%' }}>
                                <div>
                                    <Link to="/mauxe/create" className="btn btn-primary">
                                        Add
                                    </Link>
                                </div>
                            </div>
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th>STT</th>
                                        <th>Tên</th>
                                        <th>Năm Sản Xuất</th>
                                        <th>Hộp Số</th>
                                        <th>Dung Tích Xi Lanh</th>
                                        <th>Kích Thước Tổng Thể</th>
                                        <th>Hãng Xe</th>
                                        <th>Màu Sắc</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {mauxe.map((mauxe, index) => (
                                        <tr key={mauxe.id}>
                                            <th scope="row" key={index}>
                                                <td>{index + 1}</td>
                                            </th>
                                            <td>{mauxe.ten}</td>
                                            <td>{mauxe.namSanXuat}</td>
                                            <td>{mauxe.hopSo}</td>
                                            <td>{mauxe.dungTichXiLanh}</td>
                                            <td>{mauxe.kichThuocTongThe}</td>
                                            <td>{mauxe.hangXe?.ten}</td>
                                            <td>{mauxe.mauSac?.ten}</td>
                                            <td>
                                                <button
                                                    onClick={() => handleShow(mauxe.id)}
                                                    className="btn btn-sm btn-danger"
                                                >
                                                    <box-icon name='trash'><i class='bx bx-trash'></i> </box-icon>
                                                </button>
                                                <span className="padd"></span>
                                                <Link className="btn btn-success" to={'/mauxe/update/' + mauxe.id}>
                                                    <box-icon name='edit-alt' ><i class='bx bx-edit-alt' ></i></box-icon>
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <nav aria-label="Page navigation example" style={myStyle}>
                                <ul class="pagination">
                                    {/* <li class="page-item"><button class="page-link" onClick={handlePreviousPage}>Previous</button></li>
                                    <li class="page-item"><button class="page-link" disabled>{pageNumber + 1}</button></li>
                                    <li class="page-item"><button class="page-link" onClick={handleNextPage}>Next</button></li> */}
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
   )
}
export default ListMauXe;