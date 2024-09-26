import Navbars from "../Navbar/Navbar";

import { Outlet } from "react-router-dom";


const Layout = () => {
  return (
    <>
      <Navbars />
      <Outlet />
    </>
  );
};

export default Layout;
