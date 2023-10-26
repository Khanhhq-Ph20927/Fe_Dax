import { instance } from "./instance";

const API = "api/v1/auth/";

const API_OAUTH2_GOOGLE = "https://www.googleapis.com/oauth2/v3/userinfo";

class Login_Service {

    login_auth(user) {
        return instance.post(API + "login", user);
    }

    check_account(number_phone) {
        return instance.get(API + "getByNumberPhone/" + number_phone);
    }

    check_account_by_email(email) {
        return instance.get(API + "getByEmail/" + email);
    }

    login_by_google(access_token) {
        return instance.get(API_OAUTH2_GOOGLE, {
            headers: {
                "Authorization": `Bearer ${access_token}`,
            }
        })
    }
}

export default new Login_Service();