import React from "react";
import { FiClock } from "react-icons/fi";
import { AiOutlineShoppingCart} from "react-icons/ai";
import { VscCalendar } from "react-icons/vsc";
import { BiGridAlt } from "react-icons/bi";
import { IoStatsChart, IoSettingsOutline } from "react-icons/io5";
import { BsTagFill } from "react-icons/bs";
import { FaFileAlt, FaUsers, FaRegUserCircle } from "react-icons/fa";
import { GiThreeFriends } from "react-icons/gi";
import { NavLink } from "react-router-dom";
import styles from "./styles/SideOpen.module.css";

const navbaractive = {
  backgroundColor: "black",
  color: "rgb(35,192,254)",
};
const navbarnotactive = {
  backgroundColor: "silver",
  color: "black",
};

const SideOpen = () => {
  return (
    <div className={styles.main}>
      <div className={styles.iconsbox}>
        <NavLink
          to="/dashboard/home"
          style={({ isActive }) => (isActive ? navbaractive : navbarnotactive)}
        >
          {" "}
          <div>
            <FiClock className={styles.icons1} />
          </div>
        </NavLink>
        <NavLink
          to="/dashboard/users"
          style={({ isActive }) => (isActive ? navbaractive : navbarnotactive)}
        >
          {" "}
          <div>
          <FaUsers  className={styles.icons1}/>
          </div>
        </NavLink>
        <NavLink
          to="/dashboard/products"
          style={({ isActive }) => (isActive ? navbaractive : navbarnotactive)}
        >
          <div>
            <BiGridAlt className={styles.icons1} />
          </div>
        </NavLink>
        <NavLink
          to="/dashboard/cart"
          style={({ isActive }) => (isActive ? navbaractive : navbarnotactive)}
        >
          <div>
            < AiOutlineShoppingCart className={styles.icons1} />
          </div>
        </NavLink>
      </div>
    </div>
  );
};

export default SideOpen;
