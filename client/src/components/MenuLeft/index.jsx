import React, { useEffect, useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthProvider";
import jwt from "jwt-decode";
import { ROLE_ADMIN, ROLE_USER } from "../../constants";

export default function Menuleft() {
  const [user, setUser] = useState("");
  useEffect(() => {
    async function decodeToken() {
      const token = await localStorage.getItem("token");
      if (token !== null) {
        const user = await jwt(token);
        setUser(user);
        console.log("user", user?.role);
      }
    }
    decodeToken();
  }, []);
  return (
    <div id="layoutSidenav_nav">
      <nav
        className="sb-sidenav accordion sb-sidenav-dark"
        id="sidenavAccordion"
      >
        <div className="sb-sidenav-menu">
          <div className="nav">
            <div className="sb-sidenav-menu-heading">Quản lý</div>
            {user?.role === ROLE_ADMIN ? (
              <>
                <a
                  className="nav-link collapsed"
                  href="#"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseLayouts"
                  aria-expanded="false"
                  aria-controls="collapseLayouts"
                >
                  <div className="sb-nav-link-icon">
                    <i className="fas fa-columns"></i>
                  </div>
                  Quản lý kho
                  <div className="sb-sidenav-collapse-arrow">
                    <i className="fas fa-angle-down"></i>
                  </div>
                </a>
                <div
                  className="collapse"
                  id="collapseLayouts"
                  aria-labelledby="headingOne"
                  data-bs-parent="#sidenavAccordion"
                >
                  <nav className="sb-sidenav-menu-nested nav">
                    <Link className="nav-link" to="/category">
                      Danh mục
                    </Link>
                    <Link className="nav-link" to="/unit">
                      Đơn vị
                    </Link>
                    <Link className="nav-link" to="/manufacturer">
                      Nơi sản xuất
                    </Link>
                    <Link className="nav-link" to="/vehicle">
                      Phương tiện
                    </Link>
                    <Link className="nav-link" to="/product">
                      Sản phẩm
                    </Link>
                    <Link className="nav-link" to="/transequipment">
                      Thiết bị vận chuyển
                    </Link>
                    <Link className="nav-link" to="/warehouse">
                      Nhà kho
                    </Link>
                    <Link className="nav-link" to="/package">
                      Thùng gỗ
                    </Link>
                    <Link className="nav-link" to="/container">
                      Thùng container
                    </Link>
                    <Link className="nav-link" to="/driver">
                      Tài xế
                    </Link>
                    <Link className="nav-link" to="/customer">
                      Khách hàng
                    </Link>
                  </nav>
                </div>
                <a
                  className="nav-link collapsed"
                  href="#"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseLayouts1"
                  aria-expanded="false"
                  aria-controls="collapseLayouts1"
                >
                  <div className="sb-nav-link-icon">
                    <i className="fas fa-columns"></i>
                  </div>
                  Quản lý nhân viên
                  <div className="sb-sidenav-collapse-arrow">
                    <i className="fas fa-angle-down"></i>
                  </div>
                </a>
                <div
                  className="collapse"
                  id="collapseLayouts1"
                  aria-labelledby="headingOne"
                  data-bs-parent="#sidenavAccordion"
                >
                  <nav className="sb-sidenav-menu-nested nav">
                    <Link className="nav-link" to="/employee">
                      Nhân viên
                    </Link>
                  </nav>
                </div>
                <a
                  className="nav-link collapsed"
                  href="#"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapsePages"
                  aria-expanded="false"
                  aria-controls="collapsePages"
                >
                  <div className="sb-nav-link-icon">
                    <i className="fas fa-book-open"></i>
                  </div>
                  Thống kê
                  <div className="sb-sidenav-collapse-arrow">
                    <i className="fas fa-angle-down"></i>
                  </div>
                </a>
                <div
                  className="collapse"
                  id="collapsePages"
                  aria-labelledby="headingTwo"
                  data-bs-parent="#sidenavAccordion"
                >
                  <nav className="sb-sidenav-menu-nested nav">
                    <Link className="nav-link" to="/invoices-buy">
                      Buy
                    </Link>
                    <Link className="nav-link" to="/invoices-sell">
                      Sell
                    </Link>
                  </nav>
                </div>
                <a
                  className="nav-link collapsed"
                  href="#"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapsePages3"
                  aria-expanded="false"
                  aria-controls="collapsePages"
                >
                  <div className="sb-nav-link-icon">
                    <i className="fas fa-book-open"></i>
                  </div>
                  Đơn hàng
                  <div className="sb-sidenav-collapse-arrow">
                    <i className="fas fa-angle-down"></i>
                  </div>
                </a>
                <div
                  className="collapse"
                  id="collapsePages3"
                  aria-labelledby="headingTwo"
                  data-bs-parent="#sidenavAccordion"
                >
                  <nav className="sb-sidenav-menu-nested nav">
                    <Link className="nav-link" to="/order-input">
                      Nhập
                    </Link>
                    <Link className="nav-link" to="/order-output">
                      Xuất
                    </Link>
                  </nav>
                </div>
              </>
            ) : (
              <>
                <a
                  className="nav-link collapsed"
                  href="#"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapsePages3"
                  aria-expanded="false"
                  aria-controls="collapsePages"
                >
                  <div className="sb-nav-link-icon">
                    <i className="fas fa-book-open"></i>
                  </div>
                  Đơn hàng
                  <div className="sb-sidenav-collapse-arrow">
                    <i className="fas fa-angle-down"></i>
                  </div>
                </a>
                <div
                  className="collapse"
                  id="collapsePages3"
                  aria-labelledby="headingTwo"
                  data-bs-parent="#sidenavAccordion"
                >
                  <nav className="sb-sidenav-menu-nested nav">
                    <Link
                      className="nav-link"
                      to={`/order-by-warehouse/${user?.id}`}
                    >
                      Kho quản lý
                    </Link>
                  </nav>
                </div>
              </>
            )}

            {/* <Link to="/prescription" className="nav-link">
              <div className="sb-nav-link-icon">
                <i className="fas fa-tachometer-alt"></i>
              </div>
              Medicine Prescription
            </Link> */}
          </div>
        </div>
      </nav>
    </div>
  );
}
