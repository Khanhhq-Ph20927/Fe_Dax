import { instance } from "./instance";

const API = "api/register/";

class Register_Service {

    save_user(user) {
        return instance.post(API + "save_user", user);
    }

    validation(user) {
        return instance.post(API + "validation", user);
    }

}

export default new Register_Service();