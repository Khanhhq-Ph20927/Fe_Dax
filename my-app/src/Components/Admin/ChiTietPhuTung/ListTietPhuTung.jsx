import React,{useEffect,useState} from "react";
import { Link } from "react-router-dom";
import Sidebar from "../Layout/Sidebar";
import { toast } from "react-toastify";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/esm/Button";
import ChiTietPTService from "../../../Api/ChiTietPTService";
const myStyle={
    display:'flex',
    jstifyContent:'center',
    alignItems:'center',
}
const ListChiTietPT =()=>{
    const pageSize =2;
    const [chitietpt,setChiTietPT]=useState([]);
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
    const fetchData =async()=>{
        try{
            const respnse=await ChiTietPTService.getAll();
            const data=respnse.data
            setChiTietPT(data);
        }catch(error){
            console.log(error);
        }
    };
    useEffect(()=>{
        fetchData();
    },[])
    const DeleteDV=()=>{
        ChiTietPTService.deleteById(deleteId).then((ers)=>{
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
                            <h3 style={{ textAlign: 'center' }}>ChiTietPT</h3>
                        </div>
                       
                            <div className="head" style={{ paddingLeft: ' 95%' }}>
                            <div>
                                <Link to="/chitietpt/create" className="btn btn-primary">
                                    Add
                                </Link>
                            </div>
                        </div>
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th>STT</th>
                                    <th>Số Lượng</th>
                                    <th>Phụ Kiện</th>
                                    <th>Mẫu Xe</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {chitietpt.map((chitietpt, index) => (
                                    <tr key={chitietpt.id}>
                                        <th scope="row" key={index}>
                                            <td>{index + 1}</td>
                                        </th>
                                        <td>{chitietpt.soLuong}</td>
                                        <td>{chitietpt.phuKien?.tenPhuKien}</td>
                                        <td>{chitietpt.mauXe?.ten}</td>
                                        <td>
                                            <button
                                                onClick={() => handleShow(chitietpt.id)}
                                                className="btn btn-sm btn-danger"
                                            >
                                                <box-icon name='trash'><i class='bx bx-trash'></i> </box-icon>
                                            </button>
                                            <span className="padd"></span>
                                            <Link className="btn btn-success" to={'/chitietpt/update/' + chitietpt.id}>
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
export default ListChiTietPT;