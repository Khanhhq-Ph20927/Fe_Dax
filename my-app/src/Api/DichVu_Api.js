import { instance } from "./instance";
const API_URL = "api/Admin/dichvu/";
class DichVuApi {
  getAll() {
    return instance.get(API_URL + "index");
  }
  paging(number) {
    return instance.get(API_URL + "index/page/" + number);
  }
  search_ten(ten, number) {
    return instance.get(API_URL + "index/search_ten/" + ten + "/" + number);
  }
  search_loai(loaiDV, number) {
    return instance.get(API_URL + "index/search_loai/" + loaiDV + "/" + number);
  }
  sorting(field, number) {
    return instance.get(API_URL + "index/sort/" + field + "/" + number);
  }
  save(DichVu) {
    return instance.post(API_URL + "add", DichVu);
  }
  delete(id) {
    return instance.delete(API_URL + "delete/" + id);
  }
  detail(id) {
    return instance.get(API_URL + "detail/" + id);
  }
  update(id, DichVu) {
    return instance.put(API_URL + "update/" + id, DichVu);
  }
}
export default new DichVuApi();
