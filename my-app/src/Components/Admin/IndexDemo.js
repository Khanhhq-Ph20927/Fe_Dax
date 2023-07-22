import React, { useEffect, useState } from "react";
import "../../../css/admin.css";
import { Link } from "react-router-dom";
import Sidebar from "/Layout/Sidebar";

export default function IndexDV() {
  return (
    <>
      <Sidebar />
      <section id="content">
        {/* MAIN */}
        <main>
          <div className="table-data container">
            <div className="order">
              <div className="head">
                <h3>Dịch vụ</h3>
                <i className="bx bx-search" />
                <i className="bx bx-filter" />
                <div>
                  <Link to="/admin/dichvu/add" className="btn btn-primary">
                    Add
                  </Link>
                </div>
              </div>
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>STT</th>
                    <th>Tên</th>
                    <th>Dơn Giá</th>
                    <th>Phụ Kiện</th>
                    <th>Loại dịch vụ</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {/* {ListDV.map((dv, index) => (
                    <tr>
                      <th scope="row" key={index}>
                        <td>{index + 1}</td>
                      </th>
                      <td>{dv.ten}</td>
                      <td>{dv.donGia}</td>
                      <td>Phụ Kiện</td>
                      <td>{dv.loaiDV.ten}</td>
                      <td>
                        <Link
                          className="btn btn-sm btn-secondary "
                        >
                          Edit
                        </Link>
                        <span className="padd"></span>
                        <button
                          className="btn btn-sm btn-danger "
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))} */}
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
