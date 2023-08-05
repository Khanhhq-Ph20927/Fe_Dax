import axios  from "axios";
const HangXe_API_URL ='http://localhost:8080/hang-xe';
class HangXeService{
    getAll(){
        return axios.get(HangXe_API_URL +'/index');
    }
    getById(id){
        return axios.get(HangXe_API_URL+'/getById/'+id);
    }
    deleteById(id){
        return axios.delete(HangXe_API_URL+'/delete/'+id);
    }
    createhangxe(hangxe){
        return axios.post(HangXe_API_URL+'/create',hangxe);
    }
    update(id,hangxe){
        return axios.put(HangXe_API_URL+'/update/'+id,hangxe)
    }
}
export default new HangXeService();