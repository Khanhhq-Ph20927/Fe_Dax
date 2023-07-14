import { instance } from "./instance";
const API = "khach-hang/";
class Customer_Service {
    getCustomer(number) {
        return instance.get(API + "index/" + number);
    }
    getAllCustomer() {
        return instance.get(API + "getAllCustomer");
    }
    saveCustomer(customer) {
        return instance.post(API + "save", customer);
    }
    deleteCustomer(id) {
        return instance.delete(API + "delete/" + id);
    }
    updateCustomer(id, customer) {
        return instance.post(API + "update/" + id, customer);
    }

}

export default new Customer_Service();


