import { instance } from "./instance";

const API = "api/admin/lich-hen/";

const token = localStorage.getItem('token');
const headers = {
    Authorization: `Bearer ${token}`,
};

class Appointment_Service {
    getAppointment(number) {
        return instance.get(API + "index/" + number, { headers });
    }
    getById(id) {
        return instance.get(API + "getById/" + id, { headers });
    }
    validate(appointment) {
        return instance.post(API + "validate", appointment, { headers });
    }
    validateFU(appointment, id) {
        return instance.post(API + "validateFormUpdate/" + id, appointment, { headers });
    }
    update(id, appointment) {
        return instance.put(API + "update/" + id, appointment, { headers });
    }
    saveAppointment(appointment) {
        return instance.post(API + "save", appointment, { headers });
    }
    deleteAppointment(id) {
        return instance.delete(API + "delete/" + id, { headers });
    }
    getMaxPage() {
        return instance.get(API + "maxPage", { headers });
    }
    findByStatus(status, number) {
        return instance.get(API + "filter/status/" + status + "/" + number, { headers });
    }
    findByType(type, number) {
        return instance.get(API + "filter/type/" + type + "/" + number, { headers });
    }
    findByStatusAndType(status, type, number) {
        return instance.get(API + "filter/" + status + "/" + type + "/" + number, { headers });
    }
    findByName(keyword, number) {
        return instance.get(API + "filter/name/" + keyword + "/" + number, { headers });
    }
}

export default new Appointment_Service();