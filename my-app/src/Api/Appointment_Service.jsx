import { instance } from "./instance";
const API = "lich-hen/";
class Appointment_Service {
    getAppointment(number) {
        return instance.get(API + "index/" + number);
    }
}

export default new Appointment_Service;