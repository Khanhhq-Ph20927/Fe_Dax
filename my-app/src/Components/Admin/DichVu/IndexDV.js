import React, { useEffect, useState } from "react";
import "../../../css/admin.css";
import DichVu_Api from "../../../Api/DichVu_Api";
import { Link } from "react-router-dom";
import Sidebar from "../Layout/Sidebar";
import LoaiDichVu_Api from "../../../Api/LoaiDichVu_Api";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/esm/Button";
import { toast } from "react-toastify";

export default function IndexDV() {
  const [ListDV, setListDichVu] = useState([]);
  const [getId, setId] = useState("");
  const [ten, setTen] = useState("");
  // const [ngayTao, setNgayTao] = useState("");
  const [donGia, setDonGia] = useState(true);
  const [phuKien, setPhuKien] = useState([]);
  const [selectedPhuKien, setSelectedPhuKien] = useState(null);
  const [loaiDV, setLoaiDV] = useState([]);
  const [selectedLoaiDV, setSelectedLoaiDV] = useState(null);
  const [pageNumber, setPageNumber] = useState(0);
  const [SearchTen, setSearchTen] = useState("");
  const [SearchPhuKien, setSearchPhuKien] = useState("");
  const [SearchLoaiDV, setSearchLoaiDV] = useState(0);
  const [SearchMin, setSearchMin] = useState("");
  const [SearchMax, setSearchMax] = useState("");
  const [numberName, setNumberName] = useState(0);
  const [numberLoaiDV, setNumberLoaiDV] = useState(0);
  const [numberMin, setNumberMin] = useState(0);
  const [numberMax, setNumberMax] = useState(0);
  const [numberDouble, setNumberDouble] = useState(0);
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
    ListLoaiDV();
    fetchData();
  }, [pageNumber]);

  useEffect(() => {
    fetchDataFilterByName();
  }, [numberName]);

  useEffect(() => {
    // ListLoaiDV();
    // fetchDataFilterByLoaiDV();
  }, [numberLoaiDV]);

  useEffect(() => {
    // ListLoaiDV();
    // fetchDataFilterByNameAndLoaiDV();
  }, [numberDouble]);
  // useEffect(() => {
  //   fetchData();
  //   ListLoaiDV();
  // }, [pageNumber]);
  useEffect(() => {
    if (SearchTen == "" && SearchLoaiDV == 0) {
      fetchData();
      console.log(SearchTen, SearchLoaiDV);
    } else if (SearchTen != "" && SearchLoaiDV == 0) {
      console.log(SearchTen, SearchLoaiDV);
      fetchDataFilterByName();
    } else if (SearchTen == "" && SearchLoaiDV != 0) {
      console.log(SearchTen, SearchLoaiDV);
      fetchDataFilterByLoaiDV();
    } else if (SearchTen != "" && SearchLoaiDV != 0) {
      console.log(SearchTen, SearchLoaiDV);
      // fetchDataFilterByStatusAndType();
    }
  }, [SearchTen, SearchLoaiDV]);
  const fetchData = async () => {
    try {
      const response = await DichVu_Api.paging(pageNumber);
      const data = response.data.content;
      data.sort((a, b) => (a.ngayTao < b.ngayTao ? 1 : -1));
      setListDichVu(data);
      setStatusQuery(0);
      setMaxPage(response.data.totalPages);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchDataFilterByName = async () => {
    // searchByName(SearchTen);
    try {
      const response = await DichVu_Api.search_ten(SearchTen, pageNumber);
      const data = response.data.content;
      setListDichVu(data);
      setStatusQuery(1);
      setMaxPage(response.data.totalPages);
    } catch (error) {
      console.log(error);
    }
  };
  // const searchByName = async (e) => {
  //   try {
  //     const response = await DichVu_Api.search_ten(SearchTen, pageNumber);
  //     const data = response.data.content;
  //     setListDichVu(data);
  //     setStatusQuery(1);
  //     setMaxPage(response.data.totalPages);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  const fetchDataFilterByLoaiDV = async () => {
    try {
      const response = await DichVu_Api.search_loai(SearchLoaiDV, pageNumber);
      const data = response.data.content;
      setListDichVu(data);
      setStatusQuery(2);
      setMaxPage(response.data.totalPages);
    } catch (error) {
      console.log(error);
    }
  };
  // const fetchDataFilterByNameAndLoaiDV = async () => {
  //   try {
  //     const response = await DichVu_Api.Search(loaiDV, pageNumber);
  //     const data = response.data.content;
  //     setListDichVu(data);
  //     setStatusQuery(3);
  //     setMaxPage(response.data.totalPages);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  const ListLoaiDV = () => {
    LoaiDichVu_Api.getAll()
      .then((res) => {
        setLoaiDV(res.data);
      })
      .catch((error) => {
        console.log("Error: ", error);
      });
  };
  const DeleteDV = () => {
    console.log(getId);
    DichVu_Api.delete(getId)
      .then((res) => {
        setConfrimDeleted(false);
        fetchData();
        toast.success("Delete thành Công");
        // window.location.href = "/admin/dichvu/index";
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
    if (statusQuery === 2) {
      if (numberLoaiDV > 1) {
        setNumberLoaiDV((prevPageNumber) => prevPageNumber - 1);
      }
    }
  };
  const handleNextPage = () => {
    if (statusQuery === 0) {
      setPageNumber((prevPageNumber) => prevPageNumber + 1);
      if (pageNumber + 1 === maxPage) {
        setPageNumber(pageNumber);
      }
    }
    if (statusQuery === 1) {
      setNumberName((prevPageNumber) => prevPageNumber + 1);
      if (numberName + 1 === maxPage) {
        setNumberName(pageNumber);
      }
    }
    if (statusQuery === 2) {
      setNumberLoaiDV((prevPageNumber) => prevPageNumber + 1);
      if (numberLoaiDV + 1 === maxPage) {
        setNumberLoaiDV(pageNumber);
      }
    }
  };
  const changeSearchTen = (e) => {
    setSearchTen(e.target.value);
  };
  const changeSearchLoaiDV = (e) => {
    setSearchLoaiDV(e.target.value);
  };
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  useEffect(() => {
    ListLoaiDV();
    DichVu_Api.detail(getId)
      .then((res) => {
        let dichvu = res.data;
        setTen(dichvu.ten);
        setDonGia(dichvu.donGia);
        // setSelectedPhuKien(voucher.phuKien.id);
        setSelectedLoaiDV(dichvu.loaiDV.id);
      })
      .catch((error) => {
        console.log("Error: ", error);
      });
  }, [getId]);
  const saveDV = (e) => {
    e.preventDefault();
    let dichvu = {
      ten: ten,
      donGia: donGia,
      // phukien: { id: selectedPhuKien },
      loaiDV: { id: selectedLoaiDV },
    };
    console.log(getId);
    console.log("Dich Vu =>" + JSON.stringify(dichvu));
    DichVu_Api.update(getId, dichvu)
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
  const changeDonGia = (e) => {
    setDonGia(e.target.value);
  };
  const changeLoaiDV = (e) => {
    setSelectedLoaiDV(e.target.value);
  };
  return (
    <>
      <Sidebar />
      <section id="content">
        {/* MAIN */}
        <main>
          <div className="table-data ">
            <div className="order">
              <h3 style={{ textAlign: "center" }}>Dịch vụ</h3>
              <div className="head">
                {/* <div className="md-12 d-flex"> */}
                <div className="col-3 d-flex">
                  <div className="col-10 ">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Search"
                      value={SearchTen}
                      onChange={changeSearchTen}
                    />
                  </div>
                  <div className="col-2">
                    <Link
                      className="btn btn-outline-primary"
                      onClick={() => fetchDataFilterByName(SearchTen)}
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
                <div className="col-2">
                  <select class="form-select">
                    <option value={0}>Phụ Kiện</option>
                  </select>
                </div>
                <div className="col-2">
                  <select
                    class="form-select"
                    value={SearchLoaiDV || 0}
                    onChange={changeSearchLoaiDV}
                  >
                    <option value={0}>Loại DV</option>
                    {loaiDV.map((l) => (
                      <option key={l.id} value={l.id}>
                        {l.ten}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-3 d-flex">
                  <div className="col-6">
                    <select class="form-select">
                      <option value={0}>Giá Min</option>
                      {ListDV.map((l) => (
                        <option key={l.donGia} value={l.donGia}>
                          {Intl.NumberFormat("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          }).format(l.donGia)}
                        </option>
                      ))}
                    </select>
                  </div>
                  <span className="padd"></span>
                  <div className="col-6">
                    <select class="form-select">
                      <option value={0}>Giá Max</option>
                      {ListDV.map((l) => (
                        <option key={l.donGia} value={l.donGia}>
                          {Intl.NumberFormat("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          }).format(l.donGia)}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
              <div className="">
                {/* <i className="bx bx-filter" /> */}
                <Link to="/admin/dichvu/add" className="btn btn-primary">
                  Add
                </Link>
              </div>
              {/* </div> */}
              <span className="padd"></span>
              <table className="table table-striped table-bordered table-hover table-condensed">
                <thead>
                  <tr>
                    <th>STT</th>
                    <th>
                      Tên dịch vụ<span className="padd"></span>
                      <Link>
                        <i class="bx bx-sort"></i>
                      </Link>
                    </th>
                    <th>
                      Phụ Kiện <span className="padd"></span>
                      <Link>
                        <i class="bx bx-sort"></i>
                      </Link>
                    </th>
                    <th>
                      Loại dịch vụ <span className="padd"></span>
                      <Link>
                        <i class="bx bx-sort"></i>
                      </Link>
                    </th>
                    <th>
                      Đơn Giá <span className="padd"></span>
                      <Link>
                        <i class="bx bx-sort"></i>
                      </Link>
                    </th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {ListDV.map((dv, index) => (
                    <tr>
                      <td>{index + 1}</td>
                      <td>{dv.ten}</td>
                      <td>Phụ Kiện</td>
                      <td>{dv.loaiDV.ten}</td>
                      <td>
                        {Intl.NumberFormat("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        }).format(dv.donGia)}
                      </td>
                      <td>
                        <button
                          onClick={() => handleShowUpdate(dv.id)}
                          className="btn btn-sm btn-secondary "
                        >
                          <i class="bx bxs-edit"></i>
                        </button>
                        <span className="padd"></span>
                        <button
                          onClick={() => handleShowConfrim(dv.id)}
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
                          case 2:
                            return numberLoaiDV + 1;
                          // case 3:
                          //   return numberDouble + 1;
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
                        <div className="md-3">
                          <label>Đơn giá</label>
                          <input
                            name="donGia"
                            type="text"
                            className="form-control"
                            value={donGia}
                            onChange={changeDonGia}
                          />
                        </div>
                        {/* <div className="md-3">
                      <label>Phụ kiện</label>
                      <select class="form-select" value={this.state.phukien}>
                        <option value=""></option>
                      </select>
                    </div> */}
                        <div className="md-3">
                          <label>Loại dịch vụ</label>
                          <select
                            class="form-select"
                            name="selectedLoaiDV"
                            value={selectedLoaiDV || ""}
                            onChange={changeLoaiDV}
                          >
                            <option value={0}>Loại DV</option>
                            {loaiDV.map((l) => (
                              <option key={l.id} value={l.id}>
                                {l.ten}
                              </option>
                            ))}
                          </select>
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
              <Button variant="primary" onClick={(e) => DeleteDV(e)}>
                Có
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      </section>
    </>
  );
}
