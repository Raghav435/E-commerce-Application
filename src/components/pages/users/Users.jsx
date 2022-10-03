import {
  Box,
  Button,
  Heading,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { logout, logoutFun, usersData } from "../../../store/Auth/Auth.action";

const Users = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [value, setValue] = React.useState(false);

  const user = useSelector((state) => state.auth.user);
  console.log(user);

  const handleLogout = () => {
    dispatch(logoutFun());
    navigate("/login");
  };

  const userDeta = JSON.parse(localStorage.getItem("UserDeta"));

  if(!user){
    return <Navigate to="/login"></Navigate>;
  }

  return !user ? (
    <Box>...Loading</Box>
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
                <Th>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td>{user.user._id}</Td>
                <Td>{user.user.firstName}</Td>
                <Td>{user.user.email}</Td>
                <Td>{user.user.phone}</Td>
                <Td>
                  <Button onClick={handleLogout}>Logout</Button>
                </Td>
              </Tr>
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default Users;
