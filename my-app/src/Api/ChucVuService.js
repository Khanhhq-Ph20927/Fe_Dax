import axios from 'axios';
const ChucVu_API_URL = 'http://localhost:8080/chuc-vu';
class ChucVuService {
    getAll() {
        return axios.get(ChucVu_API_URL + '/index');
    }
    deleteById(maChucVu) {
        return axios.delete(ChucVu_API_URL + '/delete/' + maChucVu);
    }
    getById(maChucVu) {
        return axios.get(ChucVu_API_URL + '/getById/' + maChucVu);
    }
    createchucvu(chucvu) {
        return axios.post(ChucVu_API_URL + '/create', chucvu);
    }
    UpdateCV(maChucVu,chucvu){
        return axios.put(ChucVu_API_URL + '/update/' + maChucVu,chucvu);
    }
}
export default new ChucVuService();