import axios from "axios";
const API = "https://provinces.open-api.vn/api/?depth=2";
const API_GET_DISTRICTS = "https://provinces.open-api.vn/api/d/";
const API_GET_DISTRICTS_BY_CODE = "https://provinces.open-api.vn/api/p/";
class Province_Service {
    getProvince() {
        return axios.get(API);
    }
    getDistricts() {
        return axios.get(API_GET_DISTRICTS);
    }
    getDistrictsByCode(code) {
        return axios.get(API_GET_DISTRICTS_BY_CODE + code + "?depth=2");
    }
}

export default new Province_Service();
