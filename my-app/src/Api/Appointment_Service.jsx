import { instance } from "./instance";

const API = "api/admin/lich-hen/";

class Appointment_Service {
    getAppointment(number) {
        return instance.get(API + "index/" + number);
    }
    getById(id) {
        return instance.get(API + "getById/" + id);
    }
    validate(appointment) {
        return instance.post(API + "validate", appointment);
    }
    validateFU(appointment, id) {
        return instance.post(API + "validateFormUpdate/" + id, appointment);
    }
    update(id, appointment) {
        return instance.put(API + "update/" + id, appointment);
    }
    saveAppointment(appointment) {
        return instance.post(API + "save", appointment);
    }
    deleteAppointment(id) {
        return instance.delete(API + "delete/" + id);
    }
    getMaxPage() {
        return instance.get(API + "maxPage");
    }
    findByStatus(status, number) {
        return instance.get(API + "filter/status/" + status + "/" + number);
    }
    findByType(type, number) {
        return instance.get(API + "filter/type/" + type + "/" + number);
    }
    findByStatusAndType(status, type, number) {
        return instance.get(API + "filter/" + status + "/" + type + "/" + number);
    }
    findByName(keyword, number) {
        return instance.get(API + "filter/name/" + keyword + "/" + number);
    }
}

export default new Appointment_Service();