import React, { useState } from "react";
import Login_Service from "../../Api/Login_Service";
import { getUserInfoFromToken, hasRole } from "./util";
import { toast } from 'react-toastify';
import { Link } from "react-router-dom";
import OTPInput from "otp-input-react";
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { authentication } from "../../Api/Fire_Base_Config";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";


export default function Login_With_NumberPhone() {

    const [numberPhone, setNumberPhone] = useState('');
    const [user, setUser] = useState({ email: '', password: '' });
    const [showOTP, setShowOTP] = useState(false);
    const [otp, setOTP] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [IsValid, setIsValid] = useState(true);

    const isValidPhoneNumber = (value) => {
        const regex = /^(\+84|0)(3[2-9]|5[2689]|7[06-9]|8[1-9]|9[0-46-8])[0-9]{7}$/;
        return regex.test(value);
    };

    const onCaptchVerify = () => {
        if (!window.recaptchaVerifier) {
            window.recaptchaVerifier = new RecaptchaVerifier("recaptcha-container", {
                'size': 'invisible',
                callback: (response) => {
                    OnSignUp();
                },
                'expired-callback': () => { }
            }, authentication);
        }
    }

    const OnSignUp = async () => {
        onCaptchVerify();
        const appVerifier = window.recaptchaVerifier;
        const formatPN = "+" + numberPhone;
        const phone_number_format = numberPhone.substring(2, numberPhone.length);
        console.log(formatPN);
        console.log(numberPhone);
        if (numberPhone === undefined || numberPhone === '') {
            setIsValid(false);
            setErrorMessage("Hãy nhập số điện thoại!");
        } else {
            if (isValidPhoneNumber(phone_number_format) !== true) {
                setIsValid(isValidPhoneNumber(phone_number_format));
                setErrorMessage("Số điện thoại không hợp lệ!");
            } else {
                signInWithPhoneNumber(authentication, formatPN, appVerifier)
                    .then((confirmationResult) => {
                        window.confirmationResult = confirmationResult;
                        toast.success('OTP sended successfully!');
                        setShowOTP(true);
                    }).catch((error) => {
                        console.log(error);
                    });
                const response = await Login_Service.check_account(phone_number_format);
                const data = response.data;
                console.log(data);
                setUser({ email: data.email, password: data.matKhau });
            }
        }
    }

    const onOTPVerifycation = () => {
        console.log(user);
        window.confirmationResult.confirm(otp).then(async (res) => {
            console.log(res);
            Login_Service.login_auth(user).then((response) => {
                const data = response.data;
                console.log(data);
                localStorage.setItem("token", data.token);
                localStorage.setItem("refreshToken", data.refreshToken);
                const token = localStorage.getItem('token');
                const userInfo = getUserInfoFromToken(token);
                if (userInfo) {
                    const isAdmin = hasRole(userInfo, 'ADMIN');
                    const isCustomer = hasRole(userInfo, 'CUSTOMER');
                    if (isAdmin) {
                        window.location.href = "/admin/customer/index";
                        toast.success('Đăng nhập thành công!');
                    } else if (isCustomer) {
                        window.location.href = "/home";
                        toast.success('Đăng nhập thành công!',);
                    } else {
                        console.log("Invalid Token");
                    }
                } else {
                    console.log("Invalid Token");
                }
            }).catch((error) => { console.error(error); })
        }).catch((error) => {
            console.log(error);
        });
    }

    return (
        <>
            <div id="recaptcha-container"></div>
            <div style={{ marginLeft: 20 }}><div className="btn btn-dark mt-3"><Link to={`/login`} style={{ color: "white" }}>Quay Lại</Link></div></div>
            <div>
                <section className="vh-100 gradient-custom">
                    <div className="container py-5 h-100">
                        <div className="row d-flex justify-content-center align-items-center h-100">
                            <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                                <div
                                    className="card bg-dark text-white"
                                    style={{ borderRadius: "1rem" }}
                                >
                                    <div className="card-body p-5 text-center">
                                        <div className="mb-md-5 mt-md-4 pb-5">
                                            <h2 className="fw-bold mb-2 text-uppercase">Đăng Nhập</h2>
                                            <p className="text-white-50 mb-5">
                                                Nhập số điện thoại của bạn!
                                            </p>
                                            <div className="form-outline form-white mb-4" style={{ paddingBottom: 20 }}>
                                                <label className="form-label" style={{ paddingBottom: 20 }}>Number Phone</label>
                                                <PhoneInput country={"vn"} value={numberPhone} onChange={setNumberPhone}
                                                    style={{ paddingLeft: 65 }}></PhoneInput>
                                                <br />
                                                <p className="error">{IsValid ? "" : errorMessage}</p>
                                            </div>
                                            <button
                                                className="btn btn-outline-light btn-lg px-5"
                                                onClick={OnSignUp}
                                            >
                                                Gửi mã xác nhận
                                            </button>
                                            {showOTP === true && (
                                                <>
                                                    <p className="text-white-50 mb-5" style={{ paddingTop: 50 }}>
                                                        Nhập mã xác nhận của bạn!
                                                    </p>
                                                    <div className="form-outline form-white mb-4" style={{ paddingLeft: 70, paddingBottom: 50 }}>
                                                        <OTPInput value={otp} onChange={setOTP} autoFocus OTPLength={6}
                                                            otpType="number" disabled={false} className="custom-otp-input" />
                                                    </div>
                                                    <button
                                                        className="btn btn-outline-light btn-lg px-5"
                                                        onClick={onOTPVerifycation}
                                                    >
                                                        Xác Nhận
                                                    </button>
                                                </>)}
                                        </div>
                                        <div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
}
