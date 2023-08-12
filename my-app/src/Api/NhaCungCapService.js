
import axiosDefault from 'axios'
import { instance } from './instance';
const NhaCC_API_URL = 'nha-cung-cap';
class NhaCCService {
    getAll() {
        return instance.get(NhaCC_API_URL + '/index');
    }
    deleteById(id) {
        return instance.delete(NhaCC_API_URL + '/delete/' + id);
    }
    getById(id) {
        return instance.get(NhaCC_API_URL + '/getById/' + id);
    }
    createnhacc(nhacungcap) {
        return instance.post(NhaCC_API_URL + '/create', nhacungcap);
    }
    update(id,nhacc){
        return instance.put(NhaCC_API_URL + '/update/' + id,nhacc);
    }
}
export default new NhaCCService();
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