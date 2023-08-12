import axiosDefault from 'axios'
import { instance } from './instance';
const NhanVien_API_URL = 'nhan-vien';
class NhanVienService {
    getAll() {
        return instance.get(NhanVien_API_URL + '/index');
    }
    deleteById(id) {
        return instance.delete(NhanVien_API_URL + '/delete/' + id);
    }
    getById(id) {
        return instance.get(NhanVien_API_URL + '/getById/' + id);
    }
    create(nhanvien) {
        return instance.post(NhanVien_API_URL + '/create', nhanvien);
    }
    update(id,nhanvien){
        return instance.put(NhanVien_API_URL + '/update/' + id,nhanvien);
    }
    paging(number){
        return instance.get(NhanVien_API_URL +'/Page/'+number);
    }
    search(keyword){
        return instance.get(NhanVien_API_URL +'/search/'+ keyword);
    }
    searchcv(chucVu){
        return instance.get(NhanVien_API_URL +'/searchchucvu/'+ chucVu);
    }
     seachtt(trangThai){
        return instance.get(NhanVien_API_URL +'/searchtt/'+ trangThai);
     }
     seachns(startDate,endDate){
        return instance.get(NhanVien_API_URL +'/searchns/' + startDate + '/' + endDate);
     }
    
}
export default new NhanVienService(); 
export const apiGetPublicProvinces = () => new Promise(async (resolve, reject) => {
        try {
            const response = await instance({
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
            const response = await instance({
                method: 'get',
                url: `https://vapi.vnappmob.com/api/province/district/${provinceId}`
            })
            resolve(response)
        } catch (error) {
            reject(error)
        }
    })