import {
  Box,
  Flex,
  Heading,
  Img,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";

const AdminCart = () => {
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart.cart);
  console.log(cart);

  // const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  // console.log(isLoggedIn);

  const userData = useSelector((state) => state.authReducer.user);
  // console.log(userData);

  const userDeta = JSON.parse(localStorage.getItem("User"));
  // console.log(user);

  if (!userDeta) {
    navigate("/login");
  }

  if (userDeta.user.email !== "rs@gmail.com") {
    return <Navigate to="/"></Navigate>;
  }

  // if(!isLoggedIn){
  //   navigate("/login")
  // }

  return (
    <Box>
      <Heading color="teal">Cart Details</Heading>
      <Flex color="tomato" gap={20} mt={5} justifyContent="center">
        <Text>Items in the Cart</Text>
        <Text>{cart.length}</Text>
      </Flex>

      <Box>
        <TableContainer
          mt={5}
          fontSize={{ base: "15px", md: "20px", lg: "20px" }}
        >
          <Table variant="striped" colorScheme="teal">
            <Thead>
              <Tr>
                <Th>Product Id</Th>
                <Th>Product Name</Th>
                <Th>Product Brand</Th>
                <Th>Product Price</Th>
              </Tr>
            </Thead>
            <Tbody>
              {cart.length > 0 &&
                cart.map((item) => {
                  return (
                    <Tr key={item.id}>
                      <Td>{item.id}</Td>
                      <Td>
                        <Text>{item.product_product}</Text>
                      </Td>
                      <Td>{item.product_brand}</Td>
                      <Td>{item.product_strike}</Td>
                    </Tr>
                  );
                })}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default AdminCart;
