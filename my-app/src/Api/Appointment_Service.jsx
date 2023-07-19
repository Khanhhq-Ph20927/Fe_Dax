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
        return instance.post(API + "delete/" + id);
    }
    getMaxPage() {
        return instance.get(API + "maxPage");
    }
}

export default new Appointment_Service;