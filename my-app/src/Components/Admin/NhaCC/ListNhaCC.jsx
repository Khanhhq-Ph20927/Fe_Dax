import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import NhaCungCapService from "../../../Api/NhaCungCapService";
import Sidebar from "../Layout/Sidebar";

const ListNhaCC = () => {
    const [nhacc, setNhaCC] = useState([])
    useEffect(() => {
        NhaCungCapService.getAll().then((response) => {
            setNhaCC(response.data);
        }).catch(error => {
            console.log(error);
        })
    }, [])
    const DeleteDV = (e) => {
        console.log(e);
        NhaCungCapService.deleteById(e)
          .then((res) => {
            window.location.href = "/nhacc/index";
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
                    <h3>Nhà Cung Cấp</h3>
                    <i className="bx bx-search" />
                    <i className="bx bx-filter" />
                    <div>
                      <Link to="/nhacc/index" className="btn btn-primary">
                        Add
                      </Link>
                    </div>
                  </div>
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th>STT</th>
                        <th>Id</th>
                        <th>Tên</th>
                        <th>Thành Phố</th>
                        <th>Quốc Gia</th>
                        <th>Địa Chỉ</th>
                        <th>Ngay Sửa</th>
                        <th>Ngày Tạo</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        nhacc.map(
                          (nhacc, index) =>
                            <tr key={nhacc.id}>
                              <th scope="row" key={index}>
                                <td>{index + 1}</td>
                              </th>
                              <td>{nhacc.id}</td>
                                    <td>{nhacc.ten}</td>
                                    <td>{nhacc.thanhPho}</td>
                                    <td>{nhacc.quocGia}</td>
                                    <td>{nhacc.diaChi}</td>
                                    <td>{nhacc.ngayTao}</td>
                                    <td>{nhacc.ngaySua}</td>
                              <td><button
                                onClick={(e) => DeleteDV(nhacc.id)}
                                className="btn btn-sm btn-danger"
                              >
                                Delete
                              </button>
                                <span className="padd"></span>
                                <Link className="btn btn-success" to={'/nhacc/update/' + nhacc.id}>
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

    export default ListNhaCC