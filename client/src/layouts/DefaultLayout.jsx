import React from "react";
import { Route, Redirect } from "react-router-dom";

import Header from ""
import MenuLeft from "../components/MenuLeft/index";
import Footer from "../components/Footer/index";

function DefaultLayout({ component: Component, ...props }) {
  /*  const authData = JSON.parse(localStorage.getItem('authData'));
    if (!authData) return <Redirect to="/" /> */
  return (
    <Route
      {...props}
      render={(routerProps) => (
       <body className="sb-nav-fixed">
           <Header/>
            <div id="layoutSidenav">
                <MenuLeft/>
                <div id="layoutSidenav_content">
                    <Component {...routerProps} />
                    <Footer/>
                </div>
            </div>
        </body>
      )}
    />
  );
}

export default DefaultLayout;