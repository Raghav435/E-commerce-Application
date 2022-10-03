import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Img,
  Stack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Tfoot,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { emptyCart, removeFromCart } from "../store/Cart/Cart.action";
import { CartOrderSummary } from "./CartorderSummary";
import PaymentDetails from "./PaymentDetails";

const ThankyouPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart.cart);
  // const id = useSelector((state) => state.cart.cart.id);
  // console.log(cart[0].id);

  const id = (cart[0].id);

  const products = useSelector((state) => state.products.filteredItems);
  console.log(products);

  const userDetails = JSON.parse(localStorage.getItem("UserDeta"));
  console.log(userDetails);

  const convertToNumber = (str) => {
    if (Number(str)) {
      return Number(str);
    }
    let arr = str.includes(",") ? str.split(",") : [];
    let final_str = arr.reduce((a, c) => a + c, "");
    let result = Number(final_str);
    return result;
  };
  let total_product_discountedPrice = 0;
  let total_product_strike = 0;

  cart.forEach((prod) => {
    total_product_discountedPrice +=
      convertToNumber(prod.product_discountedPrice) * prod.qty;
    total_product_strike += prod.product_strike * prod.qty;
  });

  let Total_Price = Math.abs(
    total_product_discountedPrice - total_product_strike
  );

  const handleRemove = (id) => {
    dispatch(emptyCart());
    navigate("/product");
  };

  // useEffect(() => {
  //   dispatch(removeFromCart(cart[0].id));
  // }, []);

  return (
    <>
      <Box
        maxW={{
          base: "3xl",
          lg: "7xl",
        }}
        mx="auto"
        px={{
          base: "4",
          md: "8",
          lg: "12",
        }}
        py={{
          base: "6",
          md: "8",
          lg: "12",
        }}
      >
        <Stack
          direction={{
            base: "column",
            lg: "row",
          }}
          align={{
            lg: "flex-start",
          }}
          spacing={{
            base: "8",
            md: "16",
          }}
        >
          <Stack
            spacing={{
              base: "8",
              md: "10",
            }}
            flex="2"
          >
            <Button onClick={() => handleRemove(id)}>Back to Products</Button>
            <Heading color="blue" fontSize="4xl" fontWeight="extrabold">
              Thankyou for shopping
            </Heading>

            <Heading
              mt={4}
              color="tomato"
              fontSize="2xl"
              fontWeight="extrabold"
            >
              Order Details
            </Heading>

            <Box display="flex" gap="7" justifyContent="center">
              <Heading fontSize="x-large">Total Price :-</Heading>
              <Heading fontSize="x-large">Rs. {Total_Price}</Heading>
            </Box>

            <Stack spacing="6">
              {cart.map((item) => (
                <PaymentDetails key={item.id} {...item} />
              ))}
            </Stack>
          </Stack>
        </Stack>
      </Box>
      <Box>
        <Heading mt={4} color="tomato" fontSize="2xl" fontWeight="extrabold">
          User Details
        </Heading>
        <TableContainer
          mt={5}
          fontSize={{ base: "15px", md: "20px", lg: "20px" }}
        >
          <Table variant="striped" colorScheme="teal">
            <Thead>
              <Tr>
                <Th>User Name</Th>
                <Th>User Address</Th>
                <Th>User State</Th>
                <Th>User Country</Th>
                <Th>Pin Code</Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td>{userDetails.name}</Td>
                <Td>{userDetails.address}</Td>
                <Td>
                  <Text>{userDetails.state}</Text>
                </Td>
                <Td>{userDetails.country}</Td>
                <Td>{userDetails.pincode}</Td>
              </Tr>
            </Tbody>
            <Tfoot></Tfoot>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
};

export default ThankyouPage;
