import Sidebar from "../Layout/Sidebar";
import "../../../css/admin.css";
import { Link, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import LoaiDichVu_Api from "../../../Api/LoaiDichVu_Api";
const UpdateLDV = () => {
  const { id } = useParams();
  const [ten, setTen] = useState("");
  useEffect(() => {
    LoaiDichVu_Api.detail(id).then((res) => {
      let loaidichvu = res.data;
      setTen(loaidichvu.ten);
    });
  }, [id]);
  const saveLDV = (e) => {
    e.preventDefault();
    let loaidichvu = {
      ten: ten,
    };
    console.log(id);
    console.log("Loai Dich Vu =>" + JSON.stringify(loaidichvu));
    LoaiDichVu_Api.update(id, loaidichvu).then((res) => {
      window.location.href = "/admin/loaidichvu/index";
    });
  };
  const changeTen = (e) => {
    setTen(e.target.value);
  };

  return (
    <>
      <Sidebar />
      <section id="content">
        <main className="container">
          <div className="table-data">
            <div className="order">
              <div className="head">
                <h3>Update Loại Dịch vụ</h3>
              </div>
              <form
              // onSubmit={submit}
              >
                <div className=" row col-md-6 offset-md-3">
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
                  <div className=" row mt-3 form-outline form-white mb-2">
                    <div className="col-6">
                      <button
                        type="submit"
                        onClick={(e) => saveLDV(e)}
                        className="btn btn-secondary form-control"
                      >
                        Update
                      </button>
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
      </section>
    </>
  );
};

export default UpdateLDV;
