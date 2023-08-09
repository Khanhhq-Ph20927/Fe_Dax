import Sidebar from "../Layout/Sidebar";
import "../../../css/admin.css";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import LoaiDichVu_Api from "../../../Api/LoaiDichVu_Api";
import { toast } from "react-toastify";
import { Button, Modal } from "react-bootstrap";

export default function AddLDV() {
  const [ten, setTen] = useState("");
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
  };

  const handleShow = () => {
    console.log();
    setShow(true);
  };

  const changeTen = (e) => {
    setTen(e.target.value);
  };
  const saveDV = (e) => {
    e.preventDefault();
    let loaidichvu = {
      ten,
    };
    console.log("Dich Vu =>" + JSON.stringify(loaidichvu));
    LoaiDichVu_Api.save(loaidichvu)
      .then((res) => {
        setShow(false);
        toast.success("Add thành Công");
        // window.location.href = "/admin/dichvu/index";
      })
      .catch((error) => {
        console.log(error);
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
                <h3>Thêm Loại Dịch vụ</h3>
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
                        to="/admin/loaidichvu/index"
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
              <Modal.Title>Thêm loại dịch vụ</Modal.Title>
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
