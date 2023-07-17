import "../../../css/admin.css";
import React, { useState } from "react";
import { Link } from "react-router-dom";
export default function Sidebar() {
  const [value, setValue] = useState("");
  const select = (e) => {
    e.preventDefault();
    setValue("active");
  };
  return (
    <>
      <section id="sidebar">
        <Link to="#" className="brand">
          <i className="bx bxs-smile" />
          <span className="text">AdminHub</span>
        </Link>
        <ul className="side-menu top">
          <li className={value === "customer" ? "active" : ""}>
            <Link to="/admin/customer/index" onClick={() => setValue("customer")}>
              <i class="bi bi-person-lines-fill"></i>
              <span className="text">Customer</span>
            </Link>
          </li>
          <li className={value === "appointment" ? "active" : ""}>
            <Link
              to="/admin/appointment/index"
              onClick={() => setValue("appiontment")}
            >
              <i class="bi bi-calendar"></i>
              <span className="text">Appointment</span>
            </Link>
          </li>
          <li>
            <Link to="#">
              <i className="bx bxs-doughnut-chart" />
              <span className="text">Analytics</span>
            </Link>
          </li>
          <li>
            <Link to="#">
              <i className="bx bxs-message-dots" />
              <span className="text">Message</span>
            </Link>
          </li>
          <li>
            <Link to="#">
              <i className="bx bxs-group" />
              <span className="text">Team</span>
            </Link>
          </li>
        </ul>
        <ul className="side-menu">
          <li>
            <Link to="#" className="logout">
              <i className="bx bxs-log-out-circle" />
              <span className="text">Logout</span>
            </Link>
          </li>
        </ul>
      </section>
    </>
  );
}
