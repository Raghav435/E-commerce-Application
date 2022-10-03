import React from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { NavLink } from "react-router-dom";
import styles from "./styles/SideClose.module.css";

const navbaractive = {
  backgroundColor: "",
  // color:"white",
  color: "teal",
};
const navbarnotactive = {
  backgroundColor: "silver",
  color: "teal",
};

const SideClose = () => {
  return (
    <div className={styles.main}>
      <div className={styles.iconsname}>
        <NavLink
          to="/dashboard/home"
          style={({ isActive }) => (isActive ? navbaractive : navbarnotactive)}
        >
          {" "}
          <div>
            <p>Home</p>
          </div>
        </NavLink>
        <NavLink
          to="/dashboard/users"
          style={({ isActive }) => (isActive ? navbaractive : navbarnotactive)}
        >
          {" "}
          <div>
            <p>Users</p>
          </div>
        </NavLink>
        <NavLink
          to="/dashboard/products"
          style={({ isActive }) => (isActive ? navbaractive : navbarnotactive)}
        >
          {" "}
          <div>
            <p>Products</p>
          </div>
        </NavLink>
        <NavLink
          to="/dashboard/cart"
          style={({ isActive }) => (isActive ? navbaractive : navbarnotactive)}
        >
           {" "}
          <div>
          <p>Cart</p>
          </div>
        </NavLink>
      </div>
    </div>
  );
};

export default SideClose;
