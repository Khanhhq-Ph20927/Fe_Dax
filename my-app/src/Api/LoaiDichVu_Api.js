import { instance } from "./instance";
const API_URL = "api/Admin/loaidichvu/";
class LoaiDichVu_Api {
  getAll() {
    return instance.get(API_URL + "index");
  }
  paging(number) {
    return instance.get(API_URL + "index/page/" + number);
  }
  search_ten(ten, number) {
    return instance.get(API_URL + "index/search_ten/" + ten + "/" + number);
  }
  save(LoaiDichVu) {
    return instance.post(API_URL + "add", LoaiDichVu);
  }
  delete(id) {
    return instance.delete(API_URL + "delete/" + id);
  }
  detail(id) {
    return instance.get(API_URL + "detail/" + id);
  }
  update(id, LoaiDichVu) {
    return instance.put(API_URL + "update/" + id, LoaiDichVu);
  }
}
export default new LoaiDichVu_Api();
