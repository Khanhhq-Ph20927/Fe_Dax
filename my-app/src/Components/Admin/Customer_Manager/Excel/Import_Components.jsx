import React from 'react'
import * as XLSX from 'xlsx/xlsx.mjs';
import { toast } from 'react-toastify';
import Customer_Service from '../../../../Api/Customer_Service';

export default function Import_Components(props) {

    const fetchData = async () => {
        try {
            const response = await Customer_Service.getCustomer(props.number);
            const data = response.data.content;
            console.log(data);
        }
        catch (error) {
            console.error(error);
        }
    };

    const onchangeImport = async (e) => {
        const selectedFile = e.target.files[0];
        const fileReader = new FileReader();
        let i = 0;
        let y = 0;
        fileReader.onload = async (e) => {
            const data = new Uint8Array(e.target.result);
            const workbook = XLSX.read(data, { type: 'array' });
            const worksheet = workbook.Sheets[workbook.SheetNames[0]];
            const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
            console.log(jsonData);
            if (window.confirm('Bạn Có Muốn Thêm Dữ Liệu Vào Hệ Thống!')) {
                for (let index = 2; index < jsonData.length; index++) {
                    const hoTen = jsonData[index] && jsonData[index][2];
                    const email = jsonData[index] && jsonData[index][3];
                    const sdt = jsonData[index] && jsonData[index][4];
                    const tinhThanh = jsonData[index] && jsonData[index][5];
                    const quanHuyen = jsonData[index] && jsonData[index][6];
                    const gender = jsonData[index] && jsonData[index][7];
                    var gioiTinh;
                    if (gender === "Nam") {
                        gioiTinh = true;
                    } else {
                        gioiTinh = false;
                    }
                    const customer = {
                        hoTen,
                        email,
                        sdt,
                        tinhThanh,
                        quanHuyen,
                        gioiTinh
                    }
                    console.log(customer);

                    const response = await Customer_Service.validate(customer);
                    if (response.data === 'ok') {
                        i++;
                    } else {
                        console.error(response.data);
                        y++;
                    }

                    Customer_Service.saveCustomer(customer).then((response) => {
                        if (response.status === 200) {
                            console.log("success");
                            fetchData();
                        } else {
                            console.log("fail");
                        }
                    });
                }
            }
            if (y === 0)
                toast.success("Có " + i + " Bản Ghi Được Thêm Thành Công!");
            else
                toast.success("Có " + i + " Bản Ghi Được Thêm Thành Công Và " + y + " Bản Ghi Chưa Được Thêm!");
        };
        fileReader.readAsArrayBuffer(selectedFile);
    }

    return (
        <div>
            <input className="form-control form-control-sm" id="formFileSm" accept=".xlsx" type="file" onChange={(e) => onchangeImport(e)} />
        </div>
    )
}
