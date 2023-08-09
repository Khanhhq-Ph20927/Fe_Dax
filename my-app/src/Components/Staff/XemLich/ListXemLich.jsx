import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Sidebarnv from "../Layout/Sidebarnv";

const ListXemLich = () => {

    return (
        <>
            <Sidebarnv />
            <section id="content">
                <main>
                    <div className="table-data ">
                        <div className="order">
                            <div >
                                <h3 style={{ textAlign: 'center' }}>Xem Lịch</h3>
                            </div>
                            <div className="head">
                            <div>
                                <div class="input-group rounded">
                                    <input type="text" class="form-control rounded" placeholder="Search"  aria-label="Search" aria-describedby="search-addon" />
                                    <span class="input-group-text border-0" id="search-addon" >
                                        <i class="fas fa-search"></i>
                                    </span>

                                </div>
                            </div></div>
                            <div>
                                <div className="head" style={{ paddingLeft: ' 95%' }}>
                                    <Link to="/nhanvien/create" className="btn btn-primary">
                                        Add
                                    </Link>
                                </div>
                            </div>
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th>STT</th>
                                        <th>Thông tin</th>
                                        <th>Thông tin</th>
                                        <th>Thông tin</th>
                                        <th>Thông tin</th>
                                        <th>Thông tin</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {/* {pxemlich.map((nhanvien, index) => (
                                        <tr key={nhanvien.id}>
                                            <th scope="row">
                                                <td>{index + 1}</td>
                                            </th>
                                            {/* <td style={{ paddingLeft: ' 35px' }}> <img src={nhanvien.image}/></td>
                                            <td style={{ paddingLeft: ' 5px' }}>{nhanvien.maNhanVien}</td>
                                            <td style={{ paddingLeft: ' 5px' }}>{nhanvien.ho + nhanvien.ten}</td>
                                            <td style={{ paddingLeft: ' 35px' }}>{nhanvien.email}</td>
                                            <td style={{ paddingLeft: ' 3px' }}>{nhanvien.sdt}</td>
                                            <td style={{ paddingLeft: ' 35px' }}>{nhanvien.diaChi}</td>
                                            <td style={{ paddingLeft: ' 35px' }} >{moment(nhanvien.ngaySinh).format('DD-MM-YYYY')}</td>
                                            <td style={{ paddingLeft: ' 35px' }}>{nhanvien.trangThai === 0 ? 'Đang Làm' : 'Nghỉ Phép'}</td>
                                            <td style={{ paddingLeft: ' 35px' }}>{nhanvien.chucVu?.tenChucVu}</td> */}

                                    {/* <td>


                                                <button className="btn btn-sm btn-danger"
                                                    onClick={() => handleShow(nhanvien.id)}

                                                >
                                                    <box-icon name='trash'><i class='bx bx-trash'></i> </box-icon>
                                                </button>
                                                <span className="padd"></span>
                                                <Link className="btn btn-success" to={'/nhanvien/update/' + nhanvien.id} >
                                                    <box-icon name='edit-alt' ><i class='bx bx-edit-alt' >

                                                    </i></box-icon>
                                                </Link>
                                            </td>
                                        </tr>
                                    ))} */}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </main>


            </section>
        </>
    )
}
export default ListXemLich;