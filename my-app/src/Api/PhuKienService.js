import axios from 'axios';
const PhuKien_API_URL = 'http://localhost:8080/phu-kien';
class PhuKienService {
    getAll() {
        return axios.get(PhuKien_API_URL + '/index');
    }
    deleteById(id) {
        return axios.delete(PhuKien_API_URL + '/delete/' + id);
    }
    getById(id) {
        return axios.get(PhuKien_API_URL + '/getById/' + id);
    }
    createnphukien(phukien) {
        return axios.post(PhuKien_API_URL + '/create', phukien);
    }
    update(id,phukien){
        return axios.put(PhuKien_API_URL + '/update/' + id,phukien);
    }
    paging(number){
        return axios.get(PhuKien_API_URL +'/Page/'+number);
    }
    search(keyword){
        return axios.get(PhuKien_API_URL +'/search/'+ keyword);
    }
    searchncc(nhaCungCap){
        return axios.get(PhuKien_API_URL +'/searchncc/'+ nhaCungCap);
    }
    searchtt(trangThai){
        return axios.get(PhuKien_API_URL +'/searchtt/'+ trangThai);
    }
    searchgia(gia){
        return axios.get(PhuKien_API_URL +'/searchgia/'+ gia);
    }
}
export default new PhuKienService();