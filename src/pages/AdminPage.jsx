import { Box, Button, Flex } from "@chakra-ui/react";
import React, { useState } from "react";
import { VscMenu } from "react-icons/vsc";
import AdminHome from "../components/pages/home/AdminHome";
import styles from "./styles/AdminPage.module.css";
import { Route, Routes } from "react-router-dom";
import Users from "../components/pages/users/Users";
import Products from "../components/pages/products/Products";
import SideOpen from "../components/SidebarOpen";
import SideClose from "../components/SidebarClose";
import AdminCart from "../components/pages/cart/AdminCart";

const AdminPage = () => {
  const [state, setstate] = useState(false);
  const handleclick = () => {
    setstate(!state);
  };
  return (
    <div className={styles.main}>
      <div onClick={handleclick} className={styles.menuicons}>
        <VscMenu fontSize="27px" />
      </div>
      <div className={styles.Slideflex}>
        <div>
          {state ? (
            <div className={styles.slidingfuncbox}>
              <div>
                <SideOpen />
              </div>
              <div>
                <SideClose />
              </div>
            </div>
          ) : (
            <div>
              <SideOpen />
            </div>
          )}
        </div>
        <div className={styles.pages}>
          <Routes>
            <Route path="/home" element={<AdminHome />}></Route>
            <Route path="/users" element={<Users />}></Route>
            <Route path="/products" element={<Products />}></Route>
            <Route path="/cart" element={<AdminCart/>}></Route>
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
