import { Box, Flex, Heading, Stack} from "@chakra-ui/react";
import React from "react";
import { useSelector } from "react-redux";
import CheckOutStripe from "../components/CheckoutStripe";
import PaymentDetails from "../components/PaymentDetails";
import PaymentForm from "../components/PaymentForm";

const PaymentPage = () => {
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
            Order Details ({cart.length})
          </Heading>

          <Box display="flex" gap="7" justifyContent="center">
            <Heading fontSize="x-large">Total Price :-</Heading>
            <Heading fontSize="x-large">Rs. {Total_Price}</Heading>
          </Box>

          <Stack spacing="6">
            {cart.map((item) => (
              <PaymentDetails key={item.id} {...item} />
            ))}
            <Heading>Payment Details</Heading>
            <CheckOutStripe />
          </Stack>
          <Flex justifyContent="space-between"></Flex>
        </Stack>
        <Flex direction="column" align="center" flex="1">
          <PaymentForm />
        </Flex>
      </Stack>
    </Box>
  );
};

export default PaymentPage;
