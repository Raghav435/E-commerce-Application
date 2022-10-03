import {
  Box,
  Button,
  Flex,
  Image,
  Img,
  Spacer,
  Text,
  useColorMode,
  useDisclosure,
} from "@chakra-ui/react";
import "./styles/Navbar.css";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { MdLogout, MdPerson } from "react-icons/md";
import { logoutFun } from "../store/Auth/Auth.action";

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const cart = useSelector((state) => state.cart.cart);
  // console.log(cart);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();
  const [openLogin, setOpenLogin] = React.useState(false);
  const [openLogout, setOpenLogout] = React.useState(false);

  const dispatch = useDispatch();

  const userData = useSelector((state) => state.auth.user);
  // console.log(userData);
  const myData = JSON.parse(localStorage.getItem("User"));
  // console.log(myData);

  return (
    <Flex
      display={{
        base: "block",
        md: "inline",
        lg: "flex",
      }}
      minH={"40px"}
      direction={{
        base: "row",
        md: "row",
      }}
      justifyContent={{
        base: "flex-start",
        md: "space-between",
        lg: "space-around",
      }}
      mt={3}
      borderBottom="0.5px solid grey"
    >
      <Link to="/">
        <Image
          ml={3}
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRh7p8c-7jgO_nIoag-ocWsYF5gEhcChuaAGA&usqp=CAU"
          alt="Bazar_img"
          height="55px"
        />
      </Link>
      <Spacer />

      <Flex
        justify={{ base: "center", md: "start" }}
        paddingTop="2"
        display={{
          base: "inline-flex",
          md: "inline-flex",
          lg: "flex",
        }}
        justifyContent={{
          base: "center",
          lg: "space-around",
        }}
      >
        <Link to="/product">
          <Text px={4} py={4}>
            Shop
          </Text>
        </Link>

        <Link to="/dashboard/home">
          <Text px={4} py={4}>
            Admin
          </Text>
        </Link>

        {myData ? (
          <Flex
            justify={{ base: "center", md: "start" }}
            onClick={() => setOpenLogout(!openLogout)}
            gap={2}
            px={4}
            py={4}
          >
            <MdPerson style={{ fontSize: "25px" }} className="navbar_icon" />
            {myData.user.firstName}
            {openLogout && (
              <Flex
                gap={2}
                justifyContent="center"
                onClick={() => dispatch(logoutFun())}
              >
                <MdLogout className="navbar_icon" />
                <Button size="sm" color="red.300">
                  Logout
                </Button>
              </Flex>
            )}
          </Flex>
        ) : (
          <Link to="/login">
            <Flex gap={2} onClick={() => setOpenLogin(true)} px={4} py={4}>
              <MdPerson style={{ fontSize: "25px" }} className="navbar_icon" />
              Login
            </Flex>
          </Link>
        )}
      </Flex>

      <Spacer />
      <Link to="/cart">
        <Box
          display={{
            base: "block",
            md: "inline",
          }}
          ref={btnRef}
          onClick={onOpen}
        >
          <Box className="add-to-cart">
            <span className="cart-count">{cart ? cart.length : 0}</span>
            <Img src="https://static.vecteezy.com/system/resources/thumbnails/000/496/007/small/Ecommerce_998.jpg" />
          </Box>
        </Box>
      </Link>
      <Box textAlign="right" py={2} mr={100}>
        <Button onClick={toggleColorMode}>
          {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
        </Button>
      </Box>
    </Flex>
  );
};

export default Navbar;
