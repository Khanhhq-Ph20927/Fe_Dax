import { instance } from "./instance";

const API = "api/v1/auth/";

class Login_Service {
    login_auth(user) {
        return instance.post(API + "login", user);
    }
}

export default new Login_Service();