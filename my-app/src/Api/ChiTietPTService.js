
import { instance } from "./instance";
const ChiTietPT_API_URL='chitiet-phutung';
class ChiTietPTService{
    getAll(){
        return instance.get(ChiTietPT_API_URL+'/index');
    }
    getById(id){
        return instance.get(ChiTietPT_API_URL+'/getById/'+id);
    }
    deleteById(id){
        return instance.delete(ChiTietPT_API_URL+'/delete/'+id);
    }
    createctpt(chitietpt){
        return instance.post(ChiTietPT_API_URL+'/create',chitietpt);
    }
    update(id,chitietpt){
        return instance.put(ChiTietPT_API_URL+'/update/'+id,chitietpt)
    }
}
export default new ChiTietPTService();