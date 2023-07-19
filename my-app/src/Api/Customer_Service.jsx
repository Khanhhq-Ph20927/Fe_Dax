import { instance } from "./instance";
const API = "api/khach-hang/";
class Customer_Service {
    getCustomer(number) {
        return instance.get(API + "index/" + number);
    }
    getAllCustomer() {
        return instance.get(API + "getAllCustomer");
    }
    validate(customer) {
        return instance.post(API + "validate", customer);
    }
    getById(id) {
        return instance.get(API + "getById/" + id);
    }
    saveCustomer(customer) {
        return instance.post(API + "save", customer);
    }
    getAppointmentByCustomer(id) {
        return instance.get(API + "getAppointmentByCustomer/" + id);
    }
    deleteCustomer(id) {
        return instance.delete(API + "delete/" + id);
    }
    updateCustomer(customer, id) {
        return instance.put(API + "update/" + id, customer);
    }
    searchByName(name, number) {
        return instance.get(API + "searchByName/" + name + "/" + number);
    }
    getMaxPage() {
        return instance.get(API + "maxPage");
    }
}

export default new Customer_Service();


