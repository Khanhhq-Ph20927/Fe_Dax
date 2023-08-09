import axios from 'axios';
import axiosDefault from 'axios'
const NhaCC_API_URL = 'http://localhost:8080/nha-cung-cap';
class NhaCCService {
    getAll() {
        return axios.get(NhaCC_API_URL + '/index');
    }
    deleteById(id) {
        return axios.delete(NhaCC_API_URL + '/delete/' + id);
    }
    getById(id) {
        return axios.get(NhaCC_API_URL + '/getById/' + id);
    }
    createnhacc(nhacungcap) {
        return axios.post(NhaCC_API_URL + '/create', nhacungcap);
    }
    update(id,nhacc){
        return axios.put(NhaCC_API_URL + '/update/' + id,nhacc);
    }
}
export default new NhaCCService();
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