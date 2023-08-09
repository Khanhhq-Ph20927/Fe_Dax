import "../../../index.css";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';

export default function Header() {
  const [status, setStatus] = useState(0);
  const token = localStorage.getItem("token");
  useEffect(() => {
    if (token) {
      setStatus(1);
    }
  }, [token])
  const refresh = (e) => {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    toast.success('🦄 Bạn Đã Đăng Xuất!', {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    setStatus(0);
  }
  return (
    <>
      {/* Topbar Start */}
      <div className="container-fluid bg-light p-0">
        <div className="row gx-0 d-none d-lg-flex">
          <div className="col-lg-7 px-5 text-start">
            <div className="h-100 d-inline-flex align-items-center py-3 me-4">
              <small className="fa fa-map-marker-alt text-primary me-2" />
              <small>123 Street, New York, USA</small>
            </div>
            <div className="h-100 d-inline-flex align-items-center py-3">
              <small className="far fa-clock text-primary me-2" />
              <small>Mon - Fri : 09.00 AM - 09.00 PM</small>
            </div>
          </div>
          <div className="col-lg-5 px-5 text-end">
            <div className="h-100 d-inline-flex align-items-center py-3 me-4">
              <small className="fa fa-phone-alt text-primary me-2" />
              <small>+012 345 6789</small>
            </div>
            <div className="h-100 d-inline-flex align-items-center">
              <a
                className="btn btn-sm-square bg-white text-primary me-1"
                href=""
              >
                <i className="fab fa-facebook-f" />
              </a>
              <a
                className="btn btn-sm-square bg-white text-primary me-1"
                href=""
              >
                <i className="fab fa-twitter" />
              </a>
              <a
                className="btn btn-sm-square bg-white text-primary me-1"
                href=""
              >
                <i className="fab fa-linkedin-in" />
              </a>
              {status === 0 ? (<Link
                className="btn btn-sm-square bg-white text-primary me-0"
                to="/login"
              >
                <i class='bx bx-log-in'></i>
              </Link>) : (<Link
                className="btn btn-sm-square bg-white text-primary me-0"
                to="/login" onClick={refresh}
              >
                <i class='bx bx-log-out'></i>
              </Link>)}
            </div>
          </div>
        </div>
      </div>
      {/* Topbar End */}
      {/* Navbar Start */}
      <nav className="navbar navbar-expand-lg bg-white navbar-light shadow sticky-top p-0">
        <Link
          to="/"
          className="navbar-brand d-flex align-items-center px-4 px-lg-5"
        >
          <h2 className="m-0 text-primary">
            <i className="fa fa-car me-3" />
            J7_Plus
          </h2>
        </Link>
        <button
          type="button"
          className="navbar-toggler me-4"
          data-bs-toggle="collapse"
          data-bs-target="#navbarCollapse"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarCollapse">
          <div className="navbar-nav ms-auto p-4 p-lg-0">
            <Link to="/home" className="nav-item nav-link active">
              Home
            </Link>
            <Link to="/about" className="nav-item nav-link">
              About
            </Link>
            <Link to="/service" className="nav-item nav-link">
              Services
            </Link>
            <Link to="/booking" className="nav-item nav-link">
              Booking
            </Link>
            <Link to="/contact" className="nav-item nav-link">
              Contact
            </Link>
          </div>
          <a href="" className="btn btn-primary py-4 px-lg-5 d-none d-lg-block">
            Get A Quote
            <i className="fa fa-arrow-right ms-3" />
          </a>
        </div>
      </nav>
      {/* Navbar End */}
    </>
  );
}
