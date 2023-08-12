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
    const [message, setMessage] = useState(false);
    const [otp, setOTP] = useState('');

    const handleClick = (e) => {
        e.preventDefault();
        console.log(numberPhone);
        if (numberPhone === '') {
            setMessage("Please enter a number phone!");
        } else
            setShowOTP(true);
    }

    const onCaptchVerify = () => {
        if (!window.recaptchaVerifier) {
            window.recaptchaVerifier = new RecaptchaVerifier("recaptcha-container", {
                'size': 'invisible',
                callback: (response) => {
                    OnSignup();
                },
                'expired-callback': () => { }
            }, authentication);
        }
    }

    const OnSignup = async () => {
        onCaptchVerify();
        const appVerifier = window.recaptchaVerifier;
        const formatPN = "+" + numberPhone;
        console.log(formatPN);
        console.log(numberPhone);
        signInWithPhoneNumber(authentication, formatPN, appVerifier)
            .then((confirmationResult) => {
                window.confirmationResult = confirmationResult;
                toast.success('OTP sended successfully!');
                setShowOTP(true);
            }).catch((error) => {
                console.log(error);
            });
        // setShowOTP(true);
        const phone_number_format = numberPhone.substring(2, numberPhone.length);
        const response = await Login_Service.check_account(phone_number_format);
        const data = response.data;
        console.log(data);
        setUser({ email: data.email, password: data.matKhau });
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
                        toast.success('🦄 Đăng nhập thành công!', {
                            position: "top-right",
                            autoClose: 2000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "light",
                        });
                    } else if (isCustomer) {
                        window.location.href = "/home";
                        toast.success('🦄 Đăng nhập thành công!', {
                            position: "top-right",
                            autoClose: 2000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "light",
                        });
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
            <div style={{ marginLeft: 20 }}><div className="btn btn-dark mt-3"><Link to={`/login`} style={{ color: "white" }}>Back</Link></div></div>
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
                                            <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
                                            <p className="text-white-50 mb-5">
                                                Please enter your number phone!
                                            </p>
                                            <div className="form-outline form-white mb-4" style={{ paddingBottom: 20 }}>
                                                <label className="form-label" style={{ paddingBottom: 20 }}>Number Phone</label>
                                                <PhoneInput country={"vn"} value={numberPhone} onChange={setNumberPhone} style={{ paddingLeft: 65 }}></PhoneInput>
                                                <br />
                                                <label style={{ color: "red", fontWeight: "bold" }}>{message}</label>
                                            </div>
                                            <button
                                                className="btn btn-outline-light btn-lg px-5"
                                                onClick={OnSignup}
                                            >
                                                Send Verify Code
                                            </button>
                                            {showOTP === true && (
                                                <>
                                                    <p className="text-white-50 mb-5" style={{ paddingTop: 50 }}>
                                                        Enter your otp!
                                                    </p>
                                                    <div className="form-outline form-white mb-4" style={{ paddingLeft: 70, paddingBottom: 50 }}>
                                                        <OTPInput value={otp} onChange={setOTP} autoFocus OTPLength={6}
                                                            otpType="number" disabled={false} secure />
                                                    </div>
                                                    <button
                                                        className="btn btn-outline-light btn-lg px-5"
                                                        onClick={onOTPVerifycation}
                                                    >
                                                        Veryfication
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
