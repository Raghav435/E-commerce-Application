import axios from "axios";
import React, { useEffect } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { ADD, addToCart, cartItems } from "../store/Cart/Cart.action";
import {
  selectedProducts,
  removeSelectedProducts,
} from "../store/Products/Products.action";
import styles from "./styles/EntityPage.module.css";
import { Connect } from "react-redux";
import {
  Box,
  chakra,
  Container,
  Stack,
  Text,
  Image,
  Flex,
  VStack,
  Button,
  Heading,
  SimpleGrid,
  List,
  ListItem,
  Spinner,
} from "@chakra-ui/react";
import { MdLocalShipping } from "react-icons/md";

const EntityPages = () => {
  const product = useSelector((state) => state.product);
  const {
    id,
    img_responsive_src,
    product_brand,
    product_product,
    product_strike,
    product_discountPercentage,
    product_ratingsContainer,
    product_size,
    product_ratingsCount,
  } = product;
  const { productId } = useParams();
  const dispatch = useDispatch();

  const addProducts = () => {
    let payload = {
      ...product,
    };
    dispatch(addToCart(payload));
  };

  const fetchProductsDetail = async () => {
    const res = await axios
      .get(`https://scrubs-foal.cyclic.app/mens/${productId}`)
      .catch((err) => {
        console.log(err);
      });
    dispatch(selectedProducts(res.data));
  };

  useEffect(() => {
    if (productId && productId !== "") fetchProductsDetail();
    return () => {
      dispatch(removeSelectedProducts());
    };
  }, [productId]);

  return (
    <Box>
      {Object.keys(product).length === 0 ? (
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
      ) : (
        <Container maxW={"5xl"}>
          <SimpleGrid
            columns={{ base: 1, lg: 2 }}
            spacing={{ base: 7, md: 10 }}
            py={{ base: 18, md: 24 }}
          >
            <Flex>
              <Image
                rounded={"md"}
                alt={"product image"}
                src={img_responsive_src}
                fit={"cover"}
                align={"center"}
                w={"100%"}
                h={{ base: "100%", sm: "400px", lg: "500px" }}
              />
            </Flex>
            <Stack spacing={{ base: 6, md: 10 }}>
              <Box as={"header"}>
                <Heading
                  lineHeight={1.1}
                  fontWeight={600}
                  fontSize={{ base: "2xl", sm: "4xl", lg: "5xl" }}
                >
                  {product_brand}
                </Heading>
                <Text color="grey.900" fontWeight={300} fontSize={"2xl"}>
                  {product_product}
                </Text>
                <Text color="grey.900" fontWeight={300} fontSize={"2xl"}>
                  {product_strike}
                </Text>
              </Box>

              <Stack
                spacing={{ base: 4, sm: 6 }}
                direction={"column"}
                // divider={
                //   <StackDivider
                //   borderColor={("gray.200", "gray.600")}
                //   />
                // }
              >
                {/* <VStack spacing={{ base: 4, sm: 6 }}> */}
                {/* <Text
                    // color={useColorModeValue("gray.500", "gray.400")}
                    fontSize={"2xl"}
                    fontWeight={"300"}
                  >
                    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                    diam nonumy eirmod tempor invidunt ut labore
                  </Text>
                  <Text fontSize={"lg"}>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad
                    aliquid amet at delectus doloribus dolorum expedita hic,
                    ipsum maxime modi nam officiis porro, quae, quisquam quos
                    reprehenderit velit? Natus, totam.
                  </Text> */}
                {/* </VStack> */}
                {/* <Box> */}
                {/* <Text
                    fontSize={{ base: "16px", lg: "18px" }}
                    // color={useColorModeValue("yellow.500", "yellow.300")}
                    fontWeight={"500"}
                    textTransform={"uppercase"}
                    mb={"4"}
                  >
                    Features
                  </Text> */}

                {/* <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
                    <List spacing={2}>
                      <ListItem>Chronograph</ListItem>
                      <ListItem>Master Chronometer Certified</ListItem>{" "}
                      <ListItem>Tachymeter</ListItem>
                    </List>
                    <List spacing={2}>
                      <ListItem>Anti‑magnetic</ListItem>
                      <ListItem>Chronometer</ListItem>
                      <ListItem>Small seconds</ListItem>
                    </List>
                  </SimpleGrid> */}
                {/* </Box> */}
                <Box>
                  <Text
                    fontSize={{ base: "16px", lg: "18px" }}
                    color={("yellow.500", "yellow.300")}
                    fontWeight={"500"}
                    textTransform={"uppercase"}
                    mb={"4"}
                  >
                    Product Details
                  </Text>

                  <List spacing={3}>
                    {/* <ListItem>
                      <Text as={"span"} fontWeight={"bold"}>
                        Between lugs:
                      </Text>{" "}
                      {product_size}
                    </ListItem> */}
                    <ListItem>
                      <Text as={"span"} fontWeight={"bold"}>
                        Product Ratings Count:
                      </Text>{" "}
                      {product_ratingsCount}
                    </ListItem>
                    <ListItem>
                      <Text as={"span"} fontWeight={"bold"}>
                        Product Rating
                      </Text>{" "}
                      {product_ratingsContainer}
                    </ListItem>
                    <ListItem>
                      <Text as={"span"} fontWeight={"bold"}>
                        Product Discount Price:
                      </Text>{" "}
                      {product_discountPercentage}
                    </ListItem>
                  </List>
                </Box>
              </Stack>

              <Button
                rounded={"none"}
                w={"full"}
                mt={8}
                size={"lg"}
                py={"7"}
                onClick={addProducts}
                bg="black"
                color="whiteAlpha.900"
                textTransform={"uppercase"}
                _hover={{
                  transform: "translateY(2px)",
                  boxShadow: "lg",
                }}
              >
                Add to cart
              </Button>

              <Stack
                direction="row"
                alignItems="center"
                justifyContent={"center"}
              >
                <MdLocalShipping />
                <Text>2-3 business days delivery</Text>
              </Stack>
            </Stack>
          </SimpleGrid>
        </Container>
      )}
    </Box>
  );
};

export default EntityPages;
