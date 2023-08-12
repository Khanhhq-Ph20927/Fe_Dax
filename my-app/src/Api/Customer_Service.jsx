import { instance } from "./instance";

const API = "api/admin/khach-hang/";
const token = localStorage.getItem('token');
const headers = {
    Authorization: `Bearer ${token}`,
};

class Customer_Service {
    getCustomer(number) {
        return instance.get(API + "index/" + number, { headers });
    }
    getAllCustomer() {
        return instance.get(API + "getAllCustomer", { headers });
    }
    validate(customer) {
        return instance.post(API + "validate", customer, { headers });
    }
    getById(id) {
        return instance.get(API + "getById/" + id, { headers });
    }
    saveCustomer(customer) {
        return instance.post(API + "save", customer, { headers });
    }
    getAppointmentByCustomer(id) {
        return instance.get(API + "getAppointmentByCustomer/" + id, { headers });
    }
    deleteCustomer(id) {
        return instance.delete(API + "delete/" + id, { headers });
    }
    updateCustomer(customer, id) {
        return instance.put(API + "update/" + id, customer, { headers });
    }
    searchByName(name, number) {
        return instance.get(API + "searchByName/" + name + "/" + number, { headers });
    }
    getMaxPage() {
        return instance.get(API + "maxPage");
    }
    validateFU(id, customer) {
        return instance.post(API + "validateFormUpdate/" + id, customer, { headers });
    }
}

export default new Customer_Service();


