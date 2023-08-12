
import { instance } from "./instance";
const HangXe_API_URL ='hang-xe';
class HangXeService{
    getAll(){
        return instance.get(HangXe_API_URL +'/index');
    }
    getById(id){
        return instance.get(HangXe_API_URL+'/getById/'+id);
    }
    deleteById(id){
        return instance.delete(HangXe_API_URL+'/delete/'+id);
    }
    createhangxe(hangxe){
        return instance.post(HangXe_API_URL+'/create',hangxe);
    }
    update(id,hangxe){
        return instance.put(HangXe_API_URL+'/update/'+id,hangxe)
    }
}
export default new HangXeService();