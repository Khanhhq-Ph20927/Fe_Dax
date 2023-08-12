
import { instance } from "./instance";
const MauSac_API_URL ='mau-sac'
class MauSacService{
    getAll(){
        return instance.get(MauSac_API_URL +'/index');
    }
    deleteById(id){
        return instance.delete(MauSac_API_URL+ '/delete/'+id);
    }
    createmausac(mausac){
        return instance.post(MauSac_API_URL+'/update',mausac);
    }
     update(id,mausac){
        return instance.put(MauSac_API_URL+'/update/'+id,mausac);
     }
     getById(id){
        return instance.get(MauSac_API_URL+'/getById/'+id);
     }
}
export default new MauSacService();