import { Box, Flex, Text } from "@chakra-ui/react";
import React from "react";
import { useSelector } from "react-redux";
import { CartProductMeta } from "./CartProductMeta";

const PaymentDetails = (props) => {
  const cart = useSelector((state) => state.cart.cart);

  const { isGiftWrapping, product_product, description, img_responsive_src } =
    props;

  return (
    <Flex
      direction={{
        base: "column",
        md: "row",
      }}
      justify="space-between"
      align="center"
    >
      <CartProductMeta
        name={product_product}
        description={description}
        image={img_responsive_src}
        isGiftWrapping={isGiftWrapping}
      />

      {/* Desktop */}
      <Flex
        width="full"
        justify="space-between"
        display={{
          base: "none",
          md: "flex",
        }}
      ></Flex>

      {/* Mobile */}
      <Flex
        mt="4"
        align="center"
        width="full"
        justify="space-between"
        display={{
          base: "flex",
          md: "none",
        }}
      ></Flex>
    </Flex>
  );
};

export default PaymentDetails;
