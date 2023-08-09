import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import ChucVuService from "../../../Api/ChucVuService";
import Sidebar from "../Layout/Sidebar";
const ListChucVu = () => {
  const [chucvu, setChucvu] = useState([])
  useEffect(() => {
    ChucVuService.getAll().then((response) => {
      setChucvu(response.data);
    }).catch(error => {
      console.log(error);
    })
  }, [])
  const DeleteDV = (e) => {
    console.log(e);
    ChucVuService.deleteById(e)
      .then((res) => {
        window.location.href = "/chucvu/index";
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
          <div className="table-data container">
            <div className="order">
              <div className="head">
                <h3>Chức Vụ</h3>
                <i className="bx bx-search" />
                <i className="bx bx-filter" />
                <div>
                  <Link to="/api/Admin/dichvu/add" className="btn btn-primary">
                    Add
                  </Link>
                </div>
              </div>
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>STT</th>
                    <th>Mã Chức Vụ</th>
                    <th>Tên Chức Vụ</th>
                    <th>Ngày Sửa</th>
                    <th>Ngày Tạo</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    chucvu.map(
                      (chucvu, index) =>
                        <tr key={chucvu.maChucVu}>
                          <th scope="row" key={index}>
                            <td>{index + 1}</td>
                          </th>
                          <td>{chucvu.maChucVu}</td>
                          <td>{chucvu.tenChucVu}</td>
                          <td>{chucvu.ngaySua}</td>
                          <td>{chucvu.ngayTao}</td>
                          <td><button
                            onClick={(e) => DeleteDV(chucvu.maChucVu)}
                            className="btn btn-sm btn-danger"
                          >
                            Delete
                          </button>
                            <span className="padd"></span>
                            <Link className="btn btn-success" to={'/chucvu/update/' + chucvu.maChucVu}>
                              Detail
                            </Link>
                          </td>
                        </tr>
                    )
                  }
                </tbody>
              </table>
              <div className="px-5 py-2 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between">
                <div className="inline-flex mt-2 mt-0">
                  <button
                    className="btn btn-sm btn-outline-secondary"
                  // onClick={prevPage}
                  >
                    Prev
                  </button>

                  <button
                    className="btn btn-sm btn-outline-secondary"
                  // onClick={nextPage}
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
        {/* MAIN */}
      </section>
    </>
  );
}

export default ListChucVu