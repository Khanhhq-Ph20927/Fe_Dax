import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import Register_Service from "../../Api/Register_Service";
import { toast } from 'react-toastify';
import OTPInput from "otp-input-react";
import { authentication } from "../../Api/Fire_Base_Config";
import { RecaptchaVerifier, signInWithPhoneNumber, sendSignInLinkToEmail, isSignInWithEmailLink, signInWithEmailLink } from "firebase/auth";
import { Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function isValidPhoneNumber(value) {
  const regex = /^(0\d{9,10})$/;
  return regex.test(value);
}

function isValidEmail(value) {
  const regex = /^[a-zA-Z0-9._%+-]{1,50}@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  return regex.test(value);
}

function isValidName(value) {
  const regex = /^[\p{L} ]{2,50}$/u;
  return regex.test(value);
}

const schema = yup.object().shape({
  ho_ten: yup.string().required('Họ tên không được trống').min(2, 'Tối thiểu 2 kí tự').max(50, 'Tối đa 50 kí tự').test('validName', 'Tên không hợp lệ', isValidName),
  email: yup.string().email('Email không hợp lệ').required('Email không được trống').test('validEmail', 'Email không hợp lệ', isValidEmail),
  sdt: yup.string().required('Số điên thoại không được trống').test('validPhoneNumber', 'Số điện thoại không hợp lệ', isValidPhoneNumber),
  mat_khau: yup.string().required('Mật khẩu không được trống').min(6, 'Mật khẩu phải ít nhất 6 kí tự').max(15, 'Mật khẩu tối đa 15 kí tự'),
  mat_khau_xac_nhan: yup.string().oneOf([yup.ref('mat_khau'), null], 'Mật khẩu không khớp'),
});

export default function Register() {

  const navigate = useNavigate();
  const [user, setUser] = useState({});

  const [showModal, setShowModal] = useState(false);
  const [numberPhone, setNumberPhone] = useState('');
  const [email, setEmail] = useState('');
  const [showOTP, setShowOTP] = useState(false);
  const [showText, setShowText] = useState(false);
  const [isEmail, setIsEmail] = useState(false);
  const [isNumberPhone, setIsNumberPhone] = useState(false);
  const [isClick, setIsClick] = useState(false);
  const [otp, setOTP] = useState('');

  const form = useForm({
    resolver: yupResolver(schema),
  });

  const { register, handleSubmit, formState } = form;
  const { errors } = formState;

  const onSubmit = async (data) => {
    console.log('form submitted', data);
    let acccount = {
      hoTen: data.ho_ten,
      email: data.email,
      sdt: data.sdt,
      matKhau: data.mat_khau
    };
    setUser({
      hoTen: data.ho_ten,
      email: data.email,
      sdt: data.sdt,
      matKhau: data.mat_khau
    })
    const response = await Register_Service.validation(acccount);
    setEmail(acccount.email);
    setNumberPhone(acccount.sdt);
    setIsClick(false);
    setShowText(false);
    if (response.data !== 'success') {
      toast.error(response.data);
    } else
      setShowModal(true);
  };

  const handleClickEmail = () => {
    setShowText(true);
    setIsEmail(true);
    setIsClick(true);
    handleSignUp();
  };

  const handleClickNumberPhone = () => {
    setShowOTP(true);
    setIsNumberPhone(true);
    setIsClick(true);
    OnSignUp();
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

  const OnSignUp = () => {
    onCaptchVerify();
    const appVerifier = window.recaptchaVerifier;
    const formatPN = "+84" + numberPhone;
    console.log(numberPhone);
    console.log(formatPN);
    if (isNumberPhone) {
      signInWithPhoneNumber(authentication, formatPN, appVerifier)
        .then((confirmationResult) => {
          window.confirmationResult = confirmationResult;
          toast.success('Mã otp đã được gửi đi!');
          setShowOTP(true);
        }).catch((error) => {
          console.log(error);
        });
    }
  }

  const onOTPVerifycation = async () => {
    if (otp === '' || otp === undefined) {
      toast.error('Mã otp chưa được nhập!')
    } else {
      console.log(otp);
      if (isNumberPhone) {
        window.confirmationResult.confirm(otp).then(async (res) => {
          console.log(res);
          console.log(user);
          const response = await Register_Service.save_user(user);
          if (response.data === 'success') {
            toast.success('Đăng ký thành công!');
          } else {
            toast.success('Lỗi hệ thống! Vui lòng thử lại sau ít phút!');
          }
          navigate('/login');
        }).catch((error) => {
          console.log(error);
        });
      }
    }
  }

  const handleSignUp = () => {
    sendSignInLinkToEmail(authentication, email, {
      url: 'http://localhost:3000/login',
      handleCodeInApp: true
    }).then(async () => {
      console.log(user);
      const response = await Register_Service.save_user(user);
      if (response.data === 'success') {
        toast.success('Đăng ký thành công!');
      } else {
        toast.success('Lỗi hệ thống! Vui lòng thử lại sau ít phút!');
      }
    })
  };

  return (
    <>
      <div id="recaptcha-container"></div>
      <form onSubmit={handleSubmit(onSubmit)}>
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
                      <h2 className="fw-bold mb-2 text-uppercase">Đăng Ký</h2>
                      <div className="form-outline form-white mb-2">
                        <label className="form-label">Họ Tên</label>
                        <input
                          type="text"
                          name="ho_ten"
                          className="form-control form-control-lg"
                          {...register("ho_ten")}
                        />
                        <p className="error">{errors.ho_ten?.message}</p>
                      </div>
                      <div className=" row mt-3 form-outline form-white mb-2">
                        <div className="col-6">
                          <label>Số điện thoại</label>
                          <input type="tel" name="sdt" className="form-control"
                            {...register("sdt")}
                          />
                          <p className="error">{errors.sdt?.message}</p>
                        </div>
                        <div className="col-6">
                          <label>Email</label>
                          <input type="email" name="email" className="form-control"
                            {...register("email")}
                          />
                          <p className="error">{errors.email?.message}</p>
                        </div>
                      </div>
                      <div className=" row mt-3 form-outline form-white mb-2">
                        <div className="col-6">
                          <label className="form-label">Mật Khẩu</label>
                          <input
                            type="password"
                            name="mat_khau"
                            className="form-control form-control-lg"
                            {...register("mat_khau")}
                          />
                          <p className="error">{errors.mat_khau?.message}</p>
                        </div>
                        <div className="col-6">
                          <label className="form-label">Xác Nhận Mật Khẩu</label>
                          <input
                            type="password"
                            name="mat_khau_xac_nhan"
                            className="form-control form-control-lg"
                            {...register("mat_khau_xac_nhan")}
                          />
                          <p className="error">{errors.mat_khau_xac_nhan?.message}</p>
                        </div>
                      </div>
                      <button
                        className="btn btn-outline-light btn-lg px-5"
                        style={{ margin: 20 }}
                        type="submit"
                        onClick={() => setShowOTP(false)}
                      >
                        Đăng Ký
                      </button>
                      <div className="d-flex justify-content-center text-center mt-4 pt-1">
                        <a href="#!" className="text-white">
                          <i className="fab fa-facebook-f fa-lg" />
                        </a>
                        <a href="#!" className="text-white">
                          <i className="fab fa-twitter fa-lg mx-4 px-2" />
                        </a>
                        <a href="#!" className="text-white">
                          <i className="fab fa-google fa-lg" />
                        </a>
                      </div>
                    </div>
                    <div>
                      <p className="mb-0">
                        <a href="/login" className="text-white-50 fw-bold">
                          Đăng Nhập
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <Modal show={showModal} onHide={() => setShowModal(false)} size="lg" aria-labelledby="contained-modal-title-vcenter">
          <Modal.Header closeButton >
            <Modal.Title>Xác Nhận Người Dùng</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form className="col-md-12" id="myForm" >
              <div className="text-center" style={{ paddingBottom: 20 }}><strong>Bạn muốn nhận mã xác nhận bằng số điện thoại hay email?</strong></div>
              <div className="row">
                <div className="col-md-12 padd2">
                  <div className="row padd">
                    <div className="col-md-1"></div>
                    <div className="col-md-4">
                      <button className="btn btn-dark" onClick={handleClickEmail} disabled={isClick}>
                        <i className='bx bxs-envelope' style={{ paddingLeft: 10, paddingRight: 10 }}
                          o></i>Địa Chỉ Email</button>
                    </div>
                    <div className="col-md-2"></div>
                    <div className="col-md-4" style={{ paddingLeft: 70 }}>
                      <button className="btn btn-dark" onClick={handleClickNumberPhone} disabled={isClick}>
                        <i className='bx bxs-phone' style={{ paddingLeft: 10, paddingRight: 10 }}
                        ></i>Số điện thoại</button>
                    </div>
                    <div className="col-md-1"></div>
                  </div>
                </div>
              </div>
              <div >
                {showOTP === true && (
                  <>
                    <p className="text-dark-50 mb-5 d-flex justify-content-center align-items-center" style={{ paddingTop: 20 }}>
                      <strong>Nhập mã xác nhận của bạn!</strong>
                    </p>
                    <div className="text-dark-50 mb-5 d-flex justify-content-center align-items-center">
                      <OTPInput value={otp} onChange={setOTP} autoFocus OTPLength={6}
                        otpType="number" disabled={false} className="custom-otp-input" />
                    </div>
                    <div className="d-flex justify-content-center align-items-center">
                      <button
                        className="btn btn-outline-dark btn-lg px-5"
                        onClick={onOTPVerifycation}
                      >
                        Xác Nhận
                      </button></div>
                  </>)}
                {showText === true && (
                  <>
                    <div>
                      <p className="d-flex justify-content-center align-items-center">
                        Xin vui lòng đợi trong quá trình xác nhận email...</p>
                    </div>
                  </>
                )}
              </div>
            </form>
          </Modal.Body>
          <Modal.Footer>
          </Modal.Footer>
        </Modal>
      </form >
    </>
  );
}
