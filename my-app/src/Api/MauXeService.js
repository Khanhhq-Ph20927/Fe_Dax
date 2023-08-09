import axios from "axios";
const MauXe_API_URL = 'http://localhost:8080/mau-xe';
class MauXeService{
    getAll(){
        return axios.get(MauXe_API_URL+'/index');
    }
    deleteById(id){
        return axios.delete(MauXe_API_URL+'/delete/'+id);
    }
    getById(id){
        return axios.getById(MauXe_API_URL+'/getById/'+id);
    }
    createmauxe(mauxe){
        return axios.post(MauXe_API_URL+'/create',mauxe);
    }
    update(id,mauxe){
        return axios.update(MauXe_API_URL+'/update/'+id,mauxe);
    }
}
export default new MauXeService();