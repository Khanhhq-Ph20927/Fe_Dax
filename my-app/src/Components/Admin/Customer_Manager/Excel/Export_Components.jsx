import React from 'react'
import Customer_Service from '../../../../Api/Customer_Service';
import Common_Util from '../../../../Utils/Common_Util';

export default function Export_Components(props) {

    const onchangeExport = async () => {
        const response = await Customer_Service.getCustomer(props.number);
        const customers = response.data.content;
        const data = [
            ['STT', 'Mã Khách Hàng', 'Họ Tên', 'Email', 'Số Điện Thoại', 'Tỉnh, Thành Phố', "Quận, Huyện", 'Giới Tính'],
            ...customers.map((customer, index) => [
                index + 1,
                customer.maKhachHang,
                customer.hoTen,
                customer.email,
                customer.sdt,
                customer.tinhThanh,
                customer.quanHuyen,
                customer.gioiTinh ? "Nam" : "Nữ"
            ]),
        ];
        await Common_Util.exportExcel(data, "Danh Sách Khách Hàng Trang " +
            (Number(props.number) + 1), "ListCustomer" + (Number(props.number) + 1));
    }
    return (
        <div>
            <button onClick={() => onchangeExport()} className="btn btn-success">
                Export
            </button>
        </div>
    )
}
