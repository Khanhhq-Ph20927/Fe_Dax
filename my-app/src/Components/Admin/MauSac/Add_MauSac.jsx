import React,{useState} from "react";
import {Link} from 'react-router-dom';
import Sidebar from '../Layout/Sidebar';
import MauSacService from "../../../Api/MauSacService";
import { toast } from "react-toastify";

const Add_MauSac=()=>{
    const [ten,setTen]=useState('');
    const [ngayTao,SetNgayTao]=useState('');
    const [ngaySua,SetNgaySua]=useState('');

    const saveMauSac =(event)=>{
        event.preventDefault();
        let mausac={
            ten:ten,
            ngayTao:ngayTao,
            ngaySua:ngaySua
        }
        const confix=window.confirm("Bạn Chắc chắn muốn thêm")
        if(confix){
            console.log('mausac =>'+JSON.stringify(mausac));

            MauSacService.createmausac(mausac).then(res =>{
                alert('Save Successful');
                window.location.href="/nhanvien/create";
            }).catch(error =>{
                if(error && error.response && error.response.data){
                    toast(error.response.data);
                }
            });

        }
    }
    const changeTen =(event)=>{
        setTen(event.target.value);
    }
    return (
        <>
        <Sidebar />
      <div style={onvrlay_style}>
     
          <section id="content">
              <main className="container">
                  <div className="table-data">
                      <div className="order">
                          <div className="head">
                              <h3>Thêm Màu Sắc</h3>
                          </div>
                          <form onSubmit={saveMauSac}>
                              <div className=" row col-md-6 offset-md-3">
                                  {/* <div className="md-3">
                                      <label>Nhà Cung Cấp</label>
                                      <select
                                          className="form-select"
                                          aria-label="Default select example"
                                          name="nhaCungCap"
                                          value={this.state.selectedNhaCungCap || ''} // Chỉnh sửa ở đây
                                          onChange={this.changeNhaCungCap}
                                      >
                                          <option value="">Select NhàCC</option> Chỉnh sửa ở đây
                                          {this.state.nhaCungCap.map((ncc) => (
                                              <option key={ncc.id} value={ncc.id}>
                                                  {ncc.ten}
                                              </option>
                                          ))}
                                      </select>
                                  </div> */}
                                  {/* <div className="md-3">
                                      <label className="form-label">
                                          Ngày Tạo                                     </label>
                                      <input type="date" value={this.state.ngayTao} name="ngayTao"
                                          onChange={this.changeNgayTao} className='form-control' />
                                  </div> */}
                                
                                  
                                
                                  <div className="md-3">
                                      <label className="form-label">
                                          Tên 
                                      </label>
                                      <input className="form-control" type="text" name="ten" value={ten}
                                          onChange={changeTen} />
                                  </div>
                                 
                                  
                                  <div className=" row mt-3 form-outline form-white mb-2">
                                      <div className="col-6">
                                          <button
                                              type="submit"
                                              onClick={saveMauSac}
                                              className="btn btn-secondary form-control"
                                          >
                                              ADD
                                          </button>
                                      </div>
                                      <div className="col-6">
                                          <Link
                                              to="/mausac/index"
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
          </div>
          
      </>
    )
}
export default Add_MauSac;