import axios from 'axios';
import axiosDefault from 'axios'
const NhanVien_API_URL = 'http://localhost:8080/nhan-vien';
class NhanVienService {
    getAll() {
        return axios.get(NhanVien_API_URL + '/index');
    }
    deleteById(id) {
        return axios.delete(NhanVien_API_URL + '/delete/' + id);
    }
    getById(id) {
        return axios.get(NhanVien_API_URL + '/getById/' + id);
    }
    create(nhanvien) {
        return axios.post(NhanVien_API_URL + '/create', nhanvien);
    }
    update(id,nhanvien){
        return axios.put(NhanVien_API_URL + '/update/' + id,nhanvien);
    }
    paging(number){
        return axios.get(NhanVien_API_URL +'/Page/'+number);
    }
    search(keyword){
        return axios.get(NhanVien_API_URL +'/search/'+ keyword);
    }
    searchcv(chucVu){
        return axios.get(NhanVien_API_URL +'/searchchucvu/'+ chucVu);
    }
     seachtt(trangThai){
        return axios.get(NhanVien_API_URL +'/searchtt/'+ trangThai);
     }
     seachns(startDate,endDate){
        return axios.get(NhanVien_API_URL +'/searchns/' + startDate + '/' + endDate);
     }
    
}
export default new NhanVienService(); 
export const apiGetPublicProvinces = () => new Promise(async (resolve, reject) => {
        try {
            const response = await axiosDefault({
                method: 'get',
                url: 'https://vapi.vnappmob.com/api/province/'
            })
            resolve(response)
        } catch (error) {
            reject(error)
        }
    })
    export const apiGetPublicDistrict = (provinceId) => new Promise(async (resolve, reject) => {
        try {
            const response = await axiosDefault({
                method: 'get',
                url: `https://vapi.vnappmob.com/api/province/district/${provinceId}`
            })
            resolve(response)
        } catch (error) {
            reject(error)
        }
    })