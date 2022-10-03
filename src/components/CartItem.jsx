import {
  Box,
  Button,
  Flex,
  Link,
  Text,
} from "@chakra-ui/react";
import * as React from "react";
import { CartProductMeta } from "./CartProductMeta";
import { useDispatch, useSelector } from "react-redux";
import {
  decreaseQty,
  increaseQty,
  removeFromCart,
} from "../store/Cart/Cart.action";

const QuantitySelect = ({ qty, handleDecrease, handleIncrease, id }) => {
  return (
    <Flex>
      <Button disabled={qty === 0} onClick={() => handleDecrease(id, qty)}>
        -
      </Button>
      <Text>{qty}</Text>
      <Button onClick={() => handleIncrease(id)}>+</Button>{" "}
    </Flex>
  );
};

export const CartItem = (props) => {
  const cart = useSelector((state) => state.cart.cart);
  const dispatch = useDispatch();

  const handleDecrease = (id, qty) => {
    if (qty > 1) {
      dispatch(decreaseQty({ id }));
    } else {
      dispatch(removeFromCart({ id }));
    }
  };

  const handleIncrease = (id) => {
    dispatch(increaseQty({ id }));
  };

  const handleRemove = (id) => {
    dispatch(removeFromCart({ id }));
  };

  const {
    isGiftWrapping,
    product_product,
    description,
    quantity,
    img_responsive_src,
    onChangeQuantity,
    product_discountedPrice,
    product_strike,
    id,
    qty,
  } = props;
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
      >
        <QuantitySelect
          value={quantity}
          id={id}
          qty={qty}
          handleDecrease={handleDecrease}
          handleIncrease={handleIncrease}
        />
        <Box>
          <Text as="s">Rs. {product_discountedPrice}</Text>
          <Text>RS. {product_strike}</Text>
        </Box>
        <Button onClick={() => handleRemove(id)}>Remove</Button>
      </Flex>

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
      >
        <Link fontSize="sm" textDecor="underline">
          Delete
        </Link>
        <QuantitySelect
          value={quantity}
          id={id}
          qty={qty}
          handleDecrease={handleDecrease}
          handleIncrease={handleIncrease}
        />
        <Box gap={2} justify="flex-start" ml={1}>
          <Text as="s">Rs. {product_discountedPrice}</Text>
          <Text>RS. {product_strike}</Text>
        </Box>
        <Button onClick={() => handleRemove(id)}>Remove</Button>
      </Flex>
    </Flex>
  );
};
