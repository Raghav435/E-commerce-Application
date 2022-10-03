import React, { useRef } from "react";
import {
  Box,
  Button,
  ColorModeProvider,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  IconButton,
  Input,
  Text,
  theme,
  useColorMode,
  useToast,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { ThemeProvider } from "@emotion/react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { SignupGet } from "../store/Auth/Auth.action";

const Signup = () => {
  const [successful, setSuccessful] = React.useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );
  const toast = useToast();
  const [formData, setFormData] = React.useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phone: "",
  });
  const { firstName, lastName, email, password, phone } = formData;

  const handleChange = (e) => {
    let { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    const userData = {
      firstName,
      lastName,
      email,
      password,
      phone,
    };
    // setSuccessful(false);
    dispatch(SignupGet(userData));
    try {
      toast({
        title: "Account created successfully!",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      navigate("/login");
    } catch (err) {
      toast({
        title: "Internal server error!",
        description: "Please try again!",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
    // let payload = { name, email, password, username, mobile, descrption };
    // console.log(payload);
    // loadUsername("username");
    // console.log(loadUsername);
    // localStorage.setItem(username, JSON.stringify(username));
    // handleSignup(payload);
  };
  return (
    <Flex minHeight="100vh" width="full" align="center" justifyContent="center">
      <Box
        borderWidth={1}
        px={4}
        width="full"
        maxWidth="500px"
        textAlign="center"
        boxShadow="lg"
      >
        <Box textAlign="center" p={4}>
          <Heading>Signup your account</Heading>
          <Box my={8} textAlign="left">
            <form onSubmit={handleRegister}>
              <FormControl>
                <FormLabel>First Name</FormLabel>
                <Input
                  onChange={handleChange}
                  name="firstName"
                  type="firstName"
                  value={firstName}
                  placeholder="Enter your first name"
                />
              </FormControl>
              <FormControl>
                <FormLabel>Last Name</FormLabel>
                <Input
                  onChange={handleChange}
                  name="lastName"
                  type="lastName"
                  value={lastName}
                  placeholder="Enter your last name"
                />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Email address</FormLabel>
                <Input
                  onChange={handleChange}
                  name="email"
                  type="email"
                  value={email}
                  placeholder="Enter your email address"
                />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Password</FormLabel>
                <Input
                  onChange={handleChange}
                  name="password"
                  type="password"
                  value={password}
                  placeholder="Enter your password"
                />
              </FormControl>
              <FormControl>
                <FormLabel>Mobile</FormLabel>
                <Input
                  onChange={handleChange}
                  type="phone"
                  name="phone"
                  value={phone}
                  placeholder="Enter your mobile number"
                />
              </FormControl>
              <Button type="submit" width="full" mt={4}>
                Sign up
              </Button>
              <Box display="flex" justifyContent="space-between" mt={4}>
                <Text mt={2}>Already have an account !</Text>
                <Button>
                  <Link to="/login">Sign in</Link>
                </Button>
              </Box>
            </form>
          </Box>
        </Box>
      </Box>
    </Flex>
  );
};

export default Signup;
