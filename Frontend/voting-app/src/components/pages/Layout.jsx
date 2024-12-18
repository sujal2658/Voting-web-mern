import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../hedar/header";
import Footer from "../hedar/Footer";
function Layout() {
  return (
    <div>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}

export default Layout;
