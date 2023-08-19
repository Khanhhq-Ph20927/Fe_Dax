import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

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

  const form = useForm({
    resolver: yupResolver(schema),
  });
  const { register, handleSubmit, formState } = form;
  const { errors } = formState;

  const onSubmit = (data) => {
    console.log('form submitted', data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
    >
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
    </form>
  );
}
