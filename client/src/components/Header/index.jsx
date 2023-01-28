import React, { useEffect,useState } from "react";
import { useNavigate } from "react-router-dom";
import {Link } from "react-router-dom";
import jwt from 'jwt-decode'

function Header() {
  const [user,setUser] = useState("");
  const navigate = useNavigate();
  useEffect(()=>{
    async function decodeToken(){
      const token = await localStorage.getItem("token");
      console.log("token11",token);
      if(token !== null){
        const user = await jwt(token); 
        setUser(user);
        console.log("user",user);
      }
     
    }
    decodeToken();
  },[])
  const onLogout = () =>{
    localStorage.removeItem("token");
    navigate("/login")
   }
    return (
      <nav className="sb-topnav navbar navbar-expand navbar-dark bg-dark">
      <a className="navbar-brand ps-3" href="/">
        Quản lý cảng
      </a>
      <button
        className="btn btn-link btn-sm order-1 order-lg-0 me-4 me-lg-0"
        id="sidebarToggle"
        href="#!"
      >
        <i className="fas fa-bars"></i>
      </button>
      <form className="d-none d-md-inline-block form-inline ms-auto me-0 me-md-3 my-2 my-md-0">
        <div className="input-group"></div>
      </form>
      <ul className="navbar-nav ms-auto ms-md-0 me-3 me-lg-4">
        <li className="nav-item dropdown">
          <a
            className="nav-link dropdown-toggle"
            id="navbarDropdown"
            href="#"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <i className="fas fa-user fa-fw"></i>
          </a>
          <ul
            className="dropdown-menu dropdown-menu-end"
            aria-labelledby="navbarDropdown"
          >
            <li>
              <a className="dropdown-item" href="#!">
               
              </a>
            </li>
            <li>{user.role === "ROLE_USER" ?  <Link className="dropdown-item" to="/profile">
            {user.userName}
                </Link>: null
              }
           
            </li>
            <li>
            <Link className="dropdown-item" to="/change-password">
               Đổi mật khẩu
                </Link>
            </li>
            <li>
              <hr className="dropdown-divider" />
            </li>
            <li>
              <p
                
                className="dropdown-item"
               onClick={() =>onLogout()}
              >
               Đăng xuất
              </p>
            </li>
          </ul>
        </li>
      </ul>
    </nav>
    );
}

export default Header;