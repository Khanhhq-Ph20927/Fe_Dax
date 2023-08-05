import axios from "axios";
const ChiTietPT_API_URL='http://localhost:8080/chitiet-phutung';
class ChiTietPTService{
    getAll(){
        return axios.get(ChiTietPT_API_URL+'/index');
    }
    getById(id){
        return axios.get(ChiTietPT_API_URL+'/getById/'+id);
    }
    deleteById(id){
        return axios.delete(ChiTietPT_API_URL+'/delete/'+id);
    }
    createctpt(chitietpt){
        return axios.post(ChiTietPT_API_URL+'/create',chitietpt);
    }
    update(id,chitietpt){
        return axios.put(ChiTietPT_API_URL+'/update/'+id,chitietpt)
    }
}
export default new ChiTietPTService();