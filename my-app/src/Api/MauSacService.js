import axios from "axios";
const MauSac_API_URL ='http://localhost:8080/mau-sac'
class MauSacService{
    getAll(){
        return axios.get(MauSac_API_URL +'/index');
    }
    deleteById(id){
        return axios.delete(MauSac_API_URL+ '/delete/'+id);
    }
    createmausac(mausac){
        return axios.post(MauSac_API_URL+'/update',mausac);
    }
     update(id,mausac){
        return axios.put(MauSac_API_URL+'/update/'+id,mausac);
     }
     getById(id){
        return axios.get(MauSac_API_URL+'/getById/'+id);
     }
}
export default new MauSacService();