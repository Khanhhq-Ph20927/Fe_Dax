import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import PhuKienService from '../../../Api/PhuKienService';
import Sidebar from '../Layout/Sidebar';
import NhaCungCapService from '../../../Api/NhaCungCapService';

const onvrlay_style={
    position:'fixed',
    top:0,
    left:0,
    right:0,
    bottom:0,
    backgroundColor:'rgba(0,0,0,.7)',
    zIndex:1000
  }
const UpdatePhuKien = () => {
    const { id } = useParams();
    const [maPhuKien, setMaPhuKien] = useState('');
    const [tenPhuKien, setTenPhuKien] = useState('');
    const [gia, setGia] = useState('');
    const [soLuongTon, setSoLuongTon] = useState('');
    const [ngayTao, setNgayTao] = useState('');
    const [ngaySua, setNgaySua] = useState('');
    const [trangThai, setTrangThai] = useState('');
    const [nhaCungCap, setNhaCC] = useState([]);
    const [selectnhacc, setselectNhaCC] = useState(null);


    useEffect(() => {
        ListNhaCC();
        PhuKienService.getById(id).then((res) => {
            let phukien = res.data;
            setTenPhuKien(phukien.tenPhuKien);
            setMaPhuKien(phukien.maPhuKien);
            setGia(phukien.gia);
            setSoLuongTon(phukien.soLuongTon);
            setNgayTao(phukien.ngayTao);
            setNgaySua(phukien.ngaySua);
            setTrangThai(phukien.trangThai);
            setselectNhaCC(phukien.nhaCungCap.id);
        });
    }, [id]);

    const ListNhaCC = () => {
        NhaCungCapService.getAll().then((response) => {
            setNhaCC(response.data);
        }).catch((error) => {
            console.log(error);
        });
    };

    const changengaytao = (e) => {
        setNgayTao(e.target.value);
    };

    const changengaysua = (e) => {
        setNgaySua(e.target.value);
    };
    const changegia = (e) => {
        setGia(e.target.value);
    };
    const changetrangthai = (e) => {
        setTrangThai(e.target.value);
    };
    const changemaphukien = (e) => {
        setMaPhuKien(e.target.value);
    };

    const changetenphukien = (e) => {
        setTenPhuKien(e.target.value);
    };
    const changesoluongton = (e) => {
        setSoLuongTon(e.target.value);
    };

    const changenhacc = (e) => {
        setselectNhaCC(e.target.value);
    };
    const updatephukien = (e) => {
        e.preventDefault();
        let phukien = {
            id,
            maPhuKien,
            tenPhuKien,
            gia,
            soLuongTon,
            ngayTao,
            ngaySua,
            trangThai,
            nhaCungCap: { id: selectnhacc },


        };
        const confix=window.confirm("Bạn có chắc chắn muốn update?")
        if(confix){
        console.log('phukien =>' + JSON.stringify(phukien));
        PhuKienService.update(id, phukien).then(res => {
            alert('Update Successful');
            window.location.href = "/phukien/index";
        });
    };
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
                                <h3>Update Phụ Kiện</h3>
                            </div>
                            <form onSubmit={updatephukien}>
                                <div className=" row col-md-6 offset-md-3">
                                    <div className="md-3">
                                        <label>Nhà Cung Cấp</label>
                                        <select
                                            className="form-select"
                                            aria-label="Default select example"
                                            name="nhaCungCap"
                                            value={selectnhacc || ''} // Chỉnh sửa ở đây
                                            onChange={changenhacc}
                                        >
                                            <option value="">Select NhàCC</option>
                                            {nhaCungCap.map((ncc) => (
                                                <option key={ncc.id} value={ncc.id}>
                                                    {ncc.ten}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    {/* <div className="md-3">
                                        <label className="form-label">
                                            Ngày Tạo                                     </label>
                                        <input type="date" value={ngayTao} name="ngayTao"
                                            onChange={changengaytao} className='form-control' />
                                    </div> */}
                                    <div className="md-3">
                                        <label className="form-label">
                                            Mã Phu Kiện
                                        </label>
                                        <input type="text" value={maPhuKien} name="maPhuKien"
                                            onChange={changemaphukien} className='form-control' />
                                    </div>
                                    <div className="md-3">
                                        <label className="form-label">
                                            Tên Phụ Kiện
                                        </label>
                                        <input className="form-control" type="text" name="tenPhuKien" value={tenPhuKien}
                                            onChange={changetenphukien} />
                                    </div>
                                    <div className="md-3">
                                        <label className="form-label">
                                            Số Lượng Tồn
                                        </label>
                                        <input type="number" className="form-control" name="soLuongTon" value={soLuongTon}
                                            onChange={changesoluongton} />
                                    </div>
                                    <div className="md-3">
                                        <label className="form-label">
                                            Giá
                                        </label>
                                        <input className="form-control" type="number" name="gia" value={gia}
                                            onChange={changegia} />
                                    </div>
                                    {/* <div className="md-3">
                                        <label className="form-label">
                                            Ngày Sửa
                                        </label>
                                        <input type="date" value={ngaySua} name="ngaySua"
                                            onChange={changengaysua} className='form-control' />
                                    </div> */}
                                    <div className="md-3">
                                        <label>Trang Thái</label>
                                        <select
                                            class="form-select" name='trangThai'
                                            value={trangThai}
                                            onChange={changetrangthai}
                                        >

                                            <option value="0">Còn Hàng</option>
                                            <option value="1">Hết Hàng</option>
                                        </select>
                                    </div>
                                    <div className=" row mt-3 form-outline form-white mb-2">
                                        <div className="col-6">
                                            <button
                                                type="submit"

                                                className="btn btn-secondary form-control"
                                            >
                                                UPDATE
                                            </button>
                                        </div>
                                        <div className="col-6">
                                            <Link
                                                to="/phukien/index"
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
            </section></div>
        </>
    );
};

export default UpdatePhuKien;