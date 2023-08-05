import Sidebar from "../Layout/Sidebar";
import "../../../css/admin.css";
import DichVu_Api from "../../../Api/DichVu_Api";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import LoaiDichVu_Api from "../../../Api/LoaiDichVu_Api";
import { toast } from "react-toastify";
import { Button, Modal } from "react-bootstrap";

export default function AddDV() {
  const [ten, setTen] = useState("");
  const [donGia, setDonGia] = useState("");
  const [phuKien, setPhuKien] = useState([]);
  const [loaiDV, setLoaiDV] = useState([]);
  const [selectedPhuKien, setSelectedPhuKien] = useState(null);
  const [selectedLoai, setSelectedLoai] = useState(null);
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
  };

  const handleShow = () => {
    console.log();
    setShow(true);
  };

  useEffect(() => {
    ListLoaiDV();
  }, []);
  // useEffect(() => {}, [selectedPhuKien]);
  // useEffect(() => {
  //   ListLoaiDV();
  // }, [selectedLoai]);
  const ListLoaiDV = () => {
    LoaiDichVu_Api.getAll()
      .then((res) => {
        setLoaiDV(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const changeTen = (e) => {
    setTen(e.target.value);
  };
  const changeDonGia = (e) => {
    setDonGia(e.target.value);
  };
  // const changePhuKien = (e) => {
  //   setSelectedPhuKien(e.target.value);
  // };
  const changeLoaiDV = (e) => {
    setSelectedLoai(e.target.value);
  };
  const saveDV = (e) => {
    e.preventDefault();
    let dichvu = {
      ten,
      donGia,
      // phuKien: { id: selectedPhuKien },
      loaiDV: { id: selectedLoai },
    };
    console.log("Dich Vu =>" + JSON.stringify(dichvu));
    DichVu_Api.save(dichvu)
      .then((res) => {
        setShow(false);
        toast.success("Add thành Công");
        // window.location.href = "/admin/dichvu/index";
      })
      .catch((err) => {
        console.log(err);
        toast.error("Add không thành Công");
      });
  };
  return (
    <>
      <Sidebar />
      <section id="content">
        <main>
          <div className="table-data">
            <div className="order">
              <div className="head">
                <h3>Thêm Dịch vụ</h3>
              </div>
              <form>
                <div className=" row col-md-6 offset-md-3">
                  <div className="md-3">
                    <label>Tên</label>
                    <input
                      type="text"
                      className="form-control"
                      value={ten}
                      onChange={changeTen}
                    />
                  </div>
                  <div className="md-3">
                    <label>Đơn giá</label>
                    <input
                      type="text"
                      className="form-control"
                      value={donGia}
                      onChange={changeDonGia}
                    />
                  </div>
                  {/* <div className="md-3">
                      <label>Phụ kiện</label>
                      <select class="form-select" value={phukien}>
                        <option value=""></option>
                      </select>
                    </div> */}
                  <div className="md-3">
                    <label>Loại dịch vụ</label>
                    <select
                      class="form-select"
                      value={selectedLoai || ""}
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
                  <div className=" row mt-3 form-outline form-white mb-2">
                    <div className="col-6">
                      <a
                        type="submit"
                        onClick={handleShow}
                        className="btn btn-secondary form-control"
                      >
                        ADD
                      </a>
                    </div>
                    <div className="col-6">
                      <Link
                        to="/admin/dichvu/index"
                        className="btn btn-danger form-control"
                      >
                        Cancel
                      </Link>
                    </div>
                  </div>
                </div>
              </form>
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
              <Modal.Title>Thêm dịch vụ</Modal.Title>
            </Modal.Header>
            <Modal.Body>Bạn có chắc chắn muốn thêm ?</Modal.Body>
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
      </section>
    </>
  );
}
