import { useState, useEffect, useMemo } from "react";
import MaterialReactTable from "material-react-table";
import { useLoaderData } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer/index";
import MenuLeft from "../components/MenuLeft";
import UserTable from "../components/User/UserTable.jsx";

function User() {
  const data = useLoaderData();
  console.log("HOme", data);
  return (
    <body className="sb-nav-fixed">
      <Header />
      <div id="layoutSidenav">
        <div id="layoutSidenav_nav">
          <MenuLeft />
        </div>
        <div id="layoutSidenav_content">
          <main>
            <div className="User-fluid px-4">
              <h1 className="mt-4">Người dùng</h1>
              <ol className="breadcrumb mb-4">
                <li className="breadcrumb-item active">Người dùng</li>
              </ol>
            </div>
            <div className="User">
              <UserTable props={data} />
            </div>
          </main>
          <Footer />
        </div>
      </div>
    </body>
  );
}

export default User;
