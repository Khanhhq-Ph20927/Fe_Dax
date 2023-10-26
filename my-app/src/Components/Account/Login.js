import React, { useState } from "react";
import Login_Service from "../../Api/Login_Service";
import { getUserInfoFromToken, hasRole } from "./util";
import { toast } from 'react-toastify';
import { Link } from "react-router-dom";
import { googleLogout, useGoogleLogin } from '@react-oauth/google';


export default function Login() {

  const [user, setUser] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);

  const login_google = useGoogleLogin({
    onSuccess: async response => {
      try {
        const object_data = await Login_Service.login_by_google(response.access_token);
        Login_Service.check_account_by_email(object_data.data.email).then((response) => {
          const data = response.data;
          if (data === undefined) {
            console.log("New User");
          } else {
            const object_user = {
              email: data.email,
              password: data.matKhau,
            }
            Login_Service.login_auth(object_user).then((response) => {
              const data = response.data;
              console.log(data);
              localStorage.setItem("token", data.token);
              localStorage.setItem("refreshToken", data.refreshToken);
              const token = localStorage.getItem('token');
              const refresh_token = localStorage.getItem('refreshToken');
              const userInfo = getUserInfoFromToken(token);
              const userInfo2 = getUserInfoFromToken(refresh_token);
              localStorage.setItem("expirationTime_Token", new Date(userInfo.exp * 1000));
              localStorage.setItem("expirationTime_Refresh_Token", new Date(userInfo2.exp * 1000));
              console.log(localStorage.getItem("expirationTime"));
              if (userInfo) {
                const isAdmin = hasRole(userInfo, 'ADMIN');
                const isCustomer = hasRole(userInfo, 'CUSTOMER');
                if (isAdmin) {
                  window.location.href = "/admin/customer/index";
                  toast.success('Đăng nhập thành công!');
                } else if (isCustomer) {
                  window.location.href = "/home";
                  toast.success('Đăng nhập thành công!');
                } else {
                  toast.error('Thông tin tài khoản hoặc mật khẩu không chính xác!');
                }
              } else {
                console.log("Invalid Token");
              }
            }).catch((error) => { console.error(error); })
          }
        });
        googleLogout();
      } catch (err) {
        console.log(err);
      }
    },
    onError: (error) => console.log(error)
  });

  const handleLoginClick = () => {
    login_google();
  };

  const handleChangeUserName = (e) => {
    setUser((preUser) => ({ ...preUser, email: e.target.value }));
  }

  const handleChangePassword = (e) => {
    setUser((preUser) => ({ ...preUser, password: e.target.value }));
  }

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const login = () => {
    Login_Service.login_auth(user).then((response) => {
      const data = response.data;
      console.log(data);
      localStorage.setItem("token", data.token);
      localStorage.setItem("refreshToken", data.refreshToken);
      const token = localStorage.getItem('token');
      const refresh_token = localStorage.getItem('refreshToken');
      const userInfo = getUserInfoFromToken(token);
      const userInfo2 = getUserInfoFromToken(refresh_token);
      localStorage.setItem("expirationTime_Token", new Date(userInfo.exp * 1000));
      localStorage.setItem("expirationTime_Refresh_Token", new Date(userInfo2.exp * 1000));
      console.log(localStorage.getItem("expirationTime"));
      if (userInfo) {
        const isAdmin = hasRole(userInfo, 'ADMIN');
        const isCustomer = hasRole(userInfo, 'CUSTOMER');
        if (isAdmin) {
          window.location.href = "/admin/customer/index";
          toast.success('Đăng nhập thành công!');
        } else if (isCustomer) {
          window.location.href = "/home";
          toast.success('Đăng nhập thành công!');
        } else {
          toast.error('Thông tin tài khoản hoặc mật khẩu không chính xác!');
        }
      } else {
        console.log("Invalid Token");
      }
    }).catch((error) => { console.error(error); })
  }

  return (
    <>
      <form onSubmit={login} method="post">
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
                        Hãy nhập email và mật khẩu!
                      </p>
                      <div className="form-outline form-white mb-4">
                        <label className="form-label">Email</label>
                        <input
                          type="text"
                          className="form-control form-control-lg"
                          onChange={handleChangeUserName}
                          placeholder="Nhập email của bạn"
                        />
                      </div>
                      <div className="form-outline form-white mb-4 password">
                        <label className="form-label">Mật Khẩu</label>
                        <input
                          type={showPassword ? 'text' : 'password'}
                          className="form-control form-control-lg"
                          onChange={handleChangePassword}
                          placeholder="Nhập mật khẩu của bạn"
                        />
                        <button onClick={togglePassword}>
                          {!showPassword ?
                            (<i class="fa-solid fa-eye eye eye-open"></i>) : (<i class="fa-solid fa-eye-slash eye eye-close"></i>)}
                        </button>
                      </div>
                      <p className="small mb-5 pb-lg-2">
                        <a className="text-white-50" href="#!">
                          Quên Mật Khẩu?
                        </a>
                      </p>
                      <button
                        className="btn btn-outline-light btn-lg px-5"
                        type="submit"
                      >
                        Đăng Nhập
                      </button>
                      <div className="d-flex justify-content-center text-center mt-4 pt-1">
                        <div className="text-white">
                          Hoặc
                        </div>
                      </div>
                      <div className="d-flex justify-content-center text-center mt-4 pt-1">
                        <a href="#!" className="text-white">
                          <i class="fa-brands fa-facebook fa-lg mx-2 px-2"></i>
                          Facebook
                        </a>
                        <div className="text-white">
                          <i className="fa-brands fa-google fa-lg mx-2 px-2" onClick={handleLoginClick}></i>
                          Google
                        </div>
                        <Link to={`/login_with_number_phone`} className="text-white icon-container">
                          <i className="fa-solid fa-phone fa-lg mx-2 px-2"></i>
                          SĐT
                        </Link>
                        {/* <div className="text-white icon-container">
                          <i className="bx bx-log-out bx-sm mx-2 px-2" onClick={logout} />
                        </div> */}
                      </div>
                    </div>
                    <div>
                      <p className="mb-0">
                        Chưa có tài khoản?{" "}
                        <Link to={`/register`} className="text-white-50 fw-bold">
                          Đăng Ký
                        </Link>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </form>
    </>
  );
}
