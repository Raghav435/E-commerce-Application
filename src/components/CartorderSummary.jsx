import {
  Button,
  Flex,
  Heading,
  Stack,
  Text,
  useColorModeValue as mode,
} from "@chakra-ui/react";
import * as React from "react";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";

export const CartOrderSummary = ({
  total_product_discountedPrice,
  total_product_strike,
  Total_Price,
}) => {
  return (
    <Stack spacing="8" borderWidth="1px" rounded="lg" padding="8" width="full">
      <Heading size="md">Order Summary</Heading>

      <Flex justify="space-between" align="center" m={2}>
        <Text>SUBTOTAL</Text>
        <Flex p={2}>
          <Text p={2} as="s">
            Rs. {total_product_discountedPrice}
          </Text>
          <Text p={2}>Rs. {total_product_strike}</Text>
        </Flex>
      </Flex>

      <Flex justify="space-between" align="center" m={2}>
        <Text>TOTAL AMOUNT</Text>
        <Flex p={2}>
          <Text p={2}>Rs. {Total_Price}</Text>
        </Flex>
      </Flex>
      <Link to="/payment">
        <Button
          colorScheme="blue"
          size="lg"
          fontSize="md"
          // rightIcon={<FaArrowRight />}
        >
          Checkout
        </Button>
      </Link>
    </Stack>
  );
};
