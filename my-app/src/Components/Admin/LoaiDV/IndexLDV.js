import React, { useEffect, useState } from "react";
import "../../../css/admin.css";
import { Link } from "react-router-dom";
import Sidebar from "../Layout/Sidebar";
import LoaiDichVu_Api from "../../../Api/LoaiDichVu_Api";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/esm/Button";
import { toast } from "react-toastify";

export default function IndexLDV() {
  const [ListLDV, setListLoaiDichVu] = useState([]);
  const [getId, setId] = useState("");
  const [ten, setTen] = useState("");
  const [pageNumber, setPageNumber] = useState(0);
  const [SearchTen, setSearchTen] = useState("");
  const [numberName, setNumberName] = useState(0);
  const [maxPage, setMaxPage] = useState(0);
  const [statusQuery, setStatusQuery] = useState(0);
  const [showConfrimDeleted, setConfrimDeleted] = useState(false);
  const [showConfrimUpdate, setConfrimUpdate] = useState(false);
  const [showModalUpdate, setshowModalUpdate] = useState(false);

  const handleClose = () => {
    setConfrimDeleted(false);
    setConfrimUpdate(false);
    setshowModalUpdate(false);
  };

  const handleShowConfrim = (id) => {
    console.log(id);
    setId(id);
    setConfrimDeleted(true);
  };
  const handleShowUpdate = (id) => {
    console.log(id);
    setId(id);
    setshowModalUpdate(true);
  };
  const handleShowConfrimUpdate = () => {
    setshowModalUpdate(false);
    setConfrimUpdate(true);
  };
  useEffect(() => {
    fetchData();
  }, [pageNumber]);

  useEffect(() => {
    fetchDataFilterByName();
  }, [numberName]);

  useEffect(() => {
    if (SearchTen == "") {
      fetchData();
      console.log(SearchTen);
    } else if (SearchTen != "") {
      console.log(SearchTen);
      fetchDataFilterByName();
    }
  }, [SearchTen]);
  const fetchData = async () => {
    try {
      const response = await LoaiDichVu_Api.paging(pageNumber);
      const data = response.data.content;
      data.sort((a, b) => (a.ngayTao < b.ngayTao ? 1 : -1));
      console.log(data);
      setListLoaiDichVu(data);
      setStatusQuery(0);
      setMaxPage(response.data.totalPages);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchDataFilterByName = async () => {
    // try {
    //   const response = await DichVu_Api.search_ten(SearchTen, pageNumber);
    //   const data = response.data.content;
    //   setListDichVu(data);
    //   setStatusQuery(1);
    //   setMaxPage(response.data.totalPages);
    // } catch (error) {
    //   console.log(error);
    // }
    searchByName();
  };
  const DeleteLDV = () => {
    console.log(getId);
    LoaiDichVu_Api.delete(getId)
      .then((res) => {
        setConfrimDeleted(false);
        toast.success("Delete thành Công");
        fetchData();
      })
      .catch((error) => {
        toast.error("Delete thất bại");
        console.log(error);
      });
  };
  const handlePreviousPage = () => {
    if (statusQuery === 0) {
      if (pageNumber > 0) {
        setPageNumber((prevPageNumber) => prevPageNumber - 1);
      }
    }
    if (statusQuery === 1) {
      if (numberName > 1) {
        setNumberName((prevPageNumber) => prevPageNumber - 1);
      }
    }
  };
  const handleNextPage = () => {
    if (statusQuery === 0) {
      setPageNumber((prevPageNumber) => prevPageNumber + 1);
      if (pageNumber + 1 === maxPage) {
        setPageNumber(0);
      }
    }
    if (statusQuery === 1) {
      setNumberName((prevPageNumber) => prevPageNumber + 1);
      if (numberName + 1 === maxPage) {
        setNumberName(0);
      }
    }
  };
  const changeSearchTen = (e) => {
    setSearchTen(e.target.value);
  };
  const searchByName = async (e) => {
    try {
      const response = await LoaiDichVu_Api.search_ten(SearchTen, pageNumber);
      const data = response.data.content;
      setListLoaiDichVu(data);
      setStatusQuery(1);
      setMaxPage(response.data.totalPages);
    } catch (error) {
      console.log(error);
    }
  };
  ///////////////////////////////////////////
  useEffect(() => {
    LoaiDichVu_Api.detail(getId).then((res) => {
      let loaidichvu = res.data;
      setTen(loaidichvu.ten);
    });
  }, [getId]);
  const saveDV = (e) => {
    e.preventDefault();
    let loaidichvu = {
      ten: ten,
    };
    console.log(getId);
    console.log("Dich Vu =>" + JSON.stringify(loaidichvu));
    LoaiDichVu_Api.update(getId, loaidichvu)
      .then((res) => {
        setConfrimUpdate(false);
        toast.success("Update thành Công");
        fetchData();
      })
      .catch((error) => {
        toast.error("Update thất bại");
        console.log(error);
      });
  };
  const changeTen = (e) => {
    setTen(e.target.value);
  };
  return (
    <>
      <Sidebar />
      <section id="content">
        {/* MAIN */}
        <main>
          <div className="table-data ">
            <div className="order">
              <h3 style={{ textAlign: "center" }}>Loại dịch vụ</h3>
              <div className="head">
                {/* <div className="md-12 d-flex"> */}
                <div className="col-3 d-flex">
                  <div className="col-10 ">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Search"
                      s
                      value={SearchTen}
                      onChange={changeSearchTen}
                    />
                  </div>
                  <div className="col-2">
                    <Link
                      className="btn btn-outline-primary"
                      onClick={() => searchByName(SearchTen)}
                      to={
                        SearchTen === ""
                          ? `/admin/dichvu/index`
                          : `/admin/dichvu/index/search_ten/${SearchTen}`
                      }
                    >
                      <i class="bx bx-search"></i>
                    </Link>
                  </div>
                </div>
              </div>
              <div className="">
                {/* <i className="bx bx-filter" /> */}
                <Link to="/admin/loaidichvu/add" className="btn btn-primary">
                  Add
                </Link>
              </div>
              {/* </div> */}
              <span className="padd"></span>
              <table className="table table-striped table-bordered table-hover table-condensed">
                <thead>
                  <tr>
                    <th>STT</th>
                    <th>Tên</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {ListLDV.map((ldv, index) => (
                    <tr>
                      {/* <th scope="row" key={index}> */}
                      <td>{index + 1}</td>
                      {/* </th> */}
                      <td>{ldv.ten}</td>
                      <td>
                        <button
                          onClick={() => handleShowUpdate(ldv.id)}
                          className="btn btn-sm btn-secondary "
                        >
                          <i class="bx bxs-edit"></i>
                        </button>
                        <span className="padd"></span>
                        <button
                          onClick={() => handleShowConfrim(ldv.id)}
                          className="btn btn-sm btn-danger "
                        >
                          <i class="bx bxs-trash"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className=" row col-md-6 offset-md-3">
                <div className="col-4"></div>
                <div className="col-8 d-flex">
                  <div className="">
                    <button
                      className="btn btn-sm btn-outline-secondary"
                      onClick={handlePreviousPage}
                    >
                      Prev
                    </button>
                  </div>
                  <div className="">
                    <button
                      className=" btn btn-sm btn-outline-secondary"
                      disabled
                    >
                      {(() => {
                        switch (statusQuery) {
                          case 0:
                            return pageNumber + 1;
                          case 1:
                            return numberName + 1;
                          default:
                            return pageNumber + 1;
                        }
                      })()}
                    </button>
                  </div>
                  <div className="">
                    <button
                      className="btn btn-sm btn-outline-secondary"
                      onClick={handleNextPage}
                    >
                      Next
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
        {/* MAIN */}
        {/* modalUpdate */}
        <>
          <Modal show={showModalUpdate} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Cập nhật</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <main>
                <div className="table-data">
                  <div className="order">
                    <form>
                      <div className="">
                        <div className="md-3">
                          <label>Tên</label>
                          <input
                            type="text"
                            className="form-control"
                            name="ten"
                            value={ten}
                            onChange={changeTen}
                          />
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
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
              <Button variant="primary" onClick={saveDV}>
                Có
              </Button>
            </Modal.Footer>
          </Modal>
        </>
        {/* modalConfrimDeleted */}
        <>
          <Modal
            show={showConfrimDeleted}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
          >
            <Modal.Header closeButton>
              <Modal.Title>Xóa Dịch vụ</Modal.Title>
            </Modal.Header>
            <Modal.Body>Bạn có chắc chắn muốn xóa ?</Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Không
              </Button>
              <Button variant="primary" onClick={(e) => DeleteLDV(e)}>
                Có
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      </section>
    </>
  );
}
