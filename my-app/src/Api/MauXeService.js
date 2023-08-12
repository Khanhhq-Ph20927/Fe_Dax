
import { instance } from "./instance";
const MauXe_API_URL = 'mau-xe';
class MauXeService{
    getAll(){
        return instance.get(MauXe_API_URL+'/index');
    }
    deleteById(id){
        return instance.delete(MauXe_API_URL+'/delete/'+id);
    }
    getById(id){
        return instance.getById(MauXe_API_URL+'/getById/'+id);
    }
    createmauxe(mauxe){
        return instance.post(MauXe_API_URL+'/create',mauxe);
    }
    update(id,mauxe){
        return instance.update(MauXe_API_URL+'/update/'+id,mauxe);
    }
}
export default new MauXeService();