import { instance } from "./instance";
const API = "api/lich-hen/";
class Appointment_Service {
    getAppointment(number) {
        return instance.get(API + "index/" + number);
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
}

export default new Appointment_Service();