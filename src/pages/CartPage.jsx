import {
  Box,
  Flex,
  Heading,
  HStack,
  Stack,
  useColorModeValue as mode,
} from "@chakra-ui/react";
import * as React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { CartItem } from "../components/CartItem";
import { CartOrderSummary } from "../components/CartorderSummary";

const CartPage = () => {
  const cart = useSelector((state) => state.cart.cart);

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

  return (
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
          <Heading fontSize="2xl" fontWeight="extrabold">
            Shopping Cart ({cart.length})
          </Heading>

          <Stack spacing="6">
            {cart.map((item) => (
              <CartItem key={item.id} {...item} />
            ))}
          </Stack>
        </Stack>

        <Flex direction="column" align="center" flex="1">
          <CartOrderSummary
            total_product_discountedPrice={total_product_discountedPrice}
            total_product_strike={total_product_strike}
            Total_Price={Total_Price}
          />
          <HStack mt="6" fontWeight="semibold">
            <p>or</p>
            <Link to="/product" style={{color:"blue"}}>Continue shopping</Link>
          </HStack>
        </Flex>
      </Stack>
    </Box>
  );
};

export default CartPage;
