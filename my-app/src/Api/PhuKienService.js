
import { instance } from './instance';
const PhuKien_API_URL = 'phu-kien';
class PhuKienService {
    getAll() {
        return instance.get(PhuKien_API_URL + '/index');
    }
    deleteById(id) {
        return instance.delete(PhuKien_API_URL + '/delete/' + id);
    }
    getById(id) {
        return instance.get(PhuKien_API_URL + '/getById/' + id);
    }
    createnphukien(phukien) {
        return instance.post(PhuKien_API_URL + '/create', phukien);
    }
    update(id,phukien){
        return instance.put(PhuKien_API_URL + '/update/' + id,phukien);
    }
    paging(number){
        return instance.get(PhuKien_API_URL +'/Page/'+number);
    }
    search(keyword){
        return instance.get(PhuKien_API_URL +'/search/'+ keyword);
    }
    searchncc(nhaCungCap){
        return instance.get(PhuKien_API_URL +'/searchncc/'+ nhaCungCap);
    }
    searchtt(trangThai){
        return instance.get(PhuKien_API_URL +'/searchtt/'+ trangThai);
    }
    searchgia(gia){
        return instance.get(PhuKien_API_URL +'/searchgia/'+ gia);
    }
}
export default new PhuKienService();