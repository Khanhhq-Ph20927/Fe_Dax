import React, { useState } from "react";
import Login_Service from "../../Api/Login_Service";
import { getUserInfoFromToken, hasRole } from "./util";
import { toast } from 'react-toastify';
import { Link } from "react-router-dom";

export default function Login() {

  const [user, setUser] = useState({ email: '', password: '' });

  const handleChangeUserName = (e) => {
    setUser((preUser) => ({ ...preUser, email: e.target.value }));
  }

  const handleChangePassword = (e) => {
    setUser((preUser) => ({ ...preUser, password: e.target.value }));
  }

  const login = (e) => {
    e.preventDefault();
    console.log(user);
    Login_Service.login_auth(user).then((response) => {
      const data = response.data;
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
                      <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
                      <p className="text-white-50 mb-5">
                        Please enter your email and password!
                      </p>
                      <div className="form-outline form-white mb-4">
                        <label className="form-label">Email</label>
                        <input
                          type="text"
                          className="form-control form-control-lg"
                          onChange={handleChangeUserName}
                        />
                      </div>
                      <div className="form-outline form-white mb-4">
                        <label className="form-label">Password</label>
                        <input
                          type="password"
                          className="form-control form-control-lg"
                          onChange={handleChangePassword}
                        />
                      </div>
                      <p className="small mb-5 pb-lg-2">
                        <a className="text-white-50" href="#!">
                          Forgot password?
                        </a>
                      </p>
                      <button
                        className="btn btn-outline-light btn-lg px-5"
                        type="submit"
                      >
                        Login
                      </button>
                      <div className="d-flex justify-content-center text-center mt-4 pt-1">
                        <a href="#!" className="text-white">
                          <i className="fab fa-facebook-f fa-lg mx-2 px-2" />
                        </a>
                        <a href="#!" className="text-white">
                          <i className="fab fa-twitter fa-lg mx-2 px-2" />
                        </a>
                        <a href="#!" className="text-white">
                          <i className="fab fa-google fa-lg mx-2 px-2" />
                        </a>
                        <Link to={`/login_with_number_phone`} className="text-white">
                          <i class='bx bxs-phone bx-sm mx-2 px-2'></i>
                        </Link>
                      </div>
                    </div>
                    <div>
                      <p className="mb-0">
                        Don't have an account?{" "}
                        <a href="/register" className="text-white-50 fw-bold">
                          Sign Up
                        </a>
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
