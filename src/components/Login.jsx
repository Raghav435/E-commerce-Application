import React, { useEffect, useRef } from "react";
import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginGet } from "../store/Auth/Auth.action";

const Login = (props) => {
  const dispatch = useDispatch();
  const toast = useToast();
  const navigate = useNavigate();
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.authReducer
  );
  const [formData, setFormData] = React.useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const handleChange = (e) => {
    let { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const userData = {
      email,
      password,
    };
    try {
      dispatch(loginGet(userData));
      toast({
        title: "Logged-In Successfully!",
        description: "Let's Enjoy our app",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      if (email == "rs@gmail.com" && password == "rs1@") {
        navigate("/dashboard/users");
      } else {
        navigate("/");
      }
    } catch (err) {
      toast({
        title: "Internal server error",
        description: "Please try again!",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
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
          <Heading>Sign in to you Account</Heading>
          <Box my={8} textAlign="left">
            <form onSubmit={handleLogin}>
              <FormControl>
                <FormLabel>Email</FormLabel>
                <Input
                  onChange={handleChange}
                  name="email"
                  type="email"
                  value={email}
                  placeholder="Enter your email"
                />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Password</FormLabel>
                <Input
                  onChange={handleChange}
                  name="password"
                  value={password}
                  type="password"
                  placeholder="Enter your password"
                />
              </FormControl>

              <Stack isInline justifyContent="space-between" mt={4}>
                <Box>
                  <Checkbox>Remember Me</Checkbox>
                </Box>
                <Box>
                  <Link to="/">Forget your password</Link>
                </Box>
              </Stack>
              <Button type="submit" width="full" mt={4}>
                Sign in
              </Button>
              <Box display="flex" justifyContent="space-between" mt={4}>
                <Text mt={2}>New User ? Register Here</Text>
                <Button>
                  <Link to="/signup">Signup</Link>
                </Button>
              </Box>
            </form>
          </Box>
        </Box>
      </Box>
    </Flex>
  );
};

export default Login;
