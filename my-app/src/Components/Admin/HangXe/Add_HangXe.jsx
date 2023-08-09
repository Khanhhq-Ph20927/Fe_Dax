import React,{useState} from "react";
import { Link } from "react-router-dom";
import Sidebar from '../Layout/Sidebar';
import HangXeService from "../../../Api/HangXeService";
import { toast } from "react-toastify";

const Add_HangXe=()=>{
    const [ten,setTen]=useState('');
    const [quocGia,setQuocGia]=useState('');

    const saveHangXe =(event)=>{
        event.preventDefault();
        let hangxe={
            ten:ten,
            quocGia:quocGia,
            ngayTao:ngayTao,
            ngaySua:ngaySua

        }
        const confix=window.confirm("Bạn có chắc chắn thêm");
        if(confix){
            console.log('hangxe =>'+JSON.stringify(hangxe));
            HangXeService.createhangxe(hangxe).then(res =>{
                alert('Save Successful');
                window.location.href="/hangxe"
            }).catch(error=>{
                if(error && error.response && error.response.data){
                    toast(error.response.data);
                }
            });
        }
    }
    const changeTen=(event)=>{
        setTen(event.target.event);
    }
    const changetQuocGia=(event)=>{
        setQuocGia(event.target.event);
    }
    return(
        <>
        <Sidebar />
      <div style={onvrlay_style}>
     
          <section id="content">
              <main className="container">
                  <div className="table-data">
                      <div className="order">
                          <div className="head">
                              <h3>Thêm Hãng xe</h3>
                          </div>
                          <form onSubmit={saveHangXe}>
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
                                  <div className="md-3">
                                      <label className="form-label">
                                          Quốc Gia
                                      </label>
                                      <input className="form-control" type="text" name="quocGia" value={quocGia}
                                          onChange={changetQuocGia} />
                                  </div>
                                 
                                  
                                  <div className=" row mt-3 form-outline form-white mb-2">
                                      <div className="col-6">
                                          <button
                                              type="submit"
                                              onClick={saveHangXe}
                                              className="btn btn-secondary form-control"
                                          >
                                              ADD
                                          </button>
                                      </div>
                                      <div className="col-6">
                                          <Link
                                              to="/hangxe/index"
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
export default Add_HangXe;