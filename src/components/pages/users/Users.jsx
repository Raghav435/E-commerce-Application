import {
  Box,
  Button,
  Heading,
  Spinner,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { logout, logoutFun, usersData } from "../../../store/Auth/Auth.action";
import { setToast } from "../../../Utils/Other";

const Users = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast();
  const [userData, setUserData] = useState([]);
  const [value, setValue] = React.useState(false);

  const user = useSelector((state) => state.authReducer?.user);
  // console.log(user);

  const handleLogout = () => {
    dispatch(logoutFun());
    navigate("/login");
  };

  const getUsers = async () => {
    try {
      const res = await axios.get(
        "https://ecommerce-backend-app.onrender.com/user"
      );
      // console.log(res.data.users);
      setUserData(res.data.users);
      setToast(toast, "users Getting", "success");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  const userDeta = JSON.parse(localStorage.getItem("User"));

  if (!userDeta) {
    return <Navigate to="/login"></Navigate>;
  }

  return !userDeta ? (
    <Box>
      <Spinner />
    </Box>
  ) : (
    <Box>
      <Box color="tomato" mt={5}>
        <Heading>User Details</Heading>
      </Box>

      <Box>
        <TableContainer
          mt={8}
          fontSize={{ base: "20px", md: "25px", lg: "25px" }}
        >
          <Table variant="striped" colorScheme="teal">
            <Thead>
              <Tr>
                <Th>User Id</Th>
                <Th>User Name</Th>
                <Th>User Email</Th>
                <Th>User Mobile</Th>
                {/* <Th>Actions</Th> */}
              </Tr>
            </Thead>
            <Tbody>
              {userData &&
                userData.map((user) => (
                  <Tr key={user._id}>
                    <Td>{user._id}</Td>
                    <Td>{user.firstName}</Td>
                    <Td>{user.email}</Td>
                    <Td>{user.phone}</Td>
                    {/* <Td>
                      <Button onClick={handleLogout}>Logout</Button>
                    </Td> */}
                  </Tr>
                ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default Users;
