import { instance } from "./instance";

const API = "api/v1/auth/";

class Login_Service {

    login_auth(user) {
        return instance.post(API + "login", user);
    }

    check_account(number_phone) {
        return instance.get(API + "getByNumberPhone/" + number_phone);
    }

}

export default new Login_Service();