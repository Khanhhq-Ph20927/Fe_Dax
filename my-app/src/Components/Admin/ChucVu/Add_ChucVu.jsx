import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PhuKienService from '../../../Api/PhuKienService';
import NhaCungCapService from '../../../Api/NhaCungCapService';
import Sidebar from '../Layout/Sidebar';
import AddNhaCC from '../NhaCC/Add_NhaCC';
import ChucVuService from '../../../Api/ChucVuService';
import { toast } from 'react-toastify';

const onvrlay_style={
    position:'fixed',
    top:0,
    left:0,
    right:0,
    bottom:0,
    backgroundColor:'rgba(0,0,0,.7)',
    zIndex:1000
}
const AddChucVu = ({open,children,onClose}) => {
    const [tenChucVu, setTenChucVu] = useState('');
    const [ngayTao, setNgayTao] = useState('');
    const [ngaySua, setNgaySua] = useState('');
    if(!open) return null;

    const saveChucVu = (event) => {
        event.preventDefault();

        let chucvu = {
            
            tenChucVu: tenChucVu,
            ngayTao: ngayTao,
            ngaySua: ngaySua,
           
        };
         const confix=window.confirm("Bạn Chắc chắn muốn thêm")
        if(confix){
        console.log('chucvu =>' + JSON.stringify(chucvu));

        ChucVuService.createchucvu(chucvu)
            .then((res) => {
                alert('Save Successful');
                window.location.href = '/nhanvien/create';
            })
            .catch((error) => {
                if (error && error.response && error.response.data) {
                    toast(error.response.data);
                }
            });
    };
    }
   

    const changeTen = (event) => {
        setTenChucVu(event.target.value);
    };

    const changeNgayTao = (event) => {
        setNgayTao(event.target.value);
    };

    const changeNgaySua = (event) => {
        setNgaySua(event.target.value);
    };

    return (
        <>
          <Sidebar />
        <div style={onvrlay_style}>
            <button onClick={onClose}>Close</button>
                                    {children}
            <section id="content">
                <main className="container">
                    <div className="table-data">
                        <div className="order">
                            <div className="head">
                                <h3>Thêm Chức Vụ</h3>
                            </div>
                            <form onSubmit={saveChucVu}>
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
                                        <input className="form-control" type="text" name="tenchucVu" value={tenChucVu}
                                            onChange={changeTen} />
                                    </div>
                                    
                                    
                                    <div className=" row mt-3 form-outline form-white mb-2">
                                        <div className="col-6">
                                            <button
                                                type="submit"
                                                onClick={saveChucVu}
                                                className="btn btn-secondary form-control"
                                            >
                                                ADD
                                            </button>
                                        </div>
                                        <div className="col-6">
                                            <Link
                                                to="/nhanvien/index"
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
    );

}

export default AddChucVu;