import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  editProductsApi,
  updateProductsApi,
} from "../../../store/Products/Products.action";

const EditProduct = () => {
  const initState = {
    product_product: "",
    product_brand: "",
    productprice: "",
    product_ratingsContainer: "",
    img_responsive_src: "",
  };
  const [formData, setFormData] = React.useState(initState);
  let { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const data = useSelector((state) => state.products.data);
  console.log(data);

  const [error, setError] = React.useState("");

  const {
    product_product,
    product_brand,
    product_strike,
    product_ratingsContainer,
    img_responsive_src,
  } = formData;

  useEffect(() => {
    dispatch(editProductsApi(id));
  }, []);

  useEffect(() => {
    if (data) {
      setFormData({ ...data });
    }
  }, [data]);

  const handleChange = (e) => {
    let { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleEdit = (e) => {
    e.preventDefault();
    if (
      !product_product ||
      !product_brand ||
      !product_strike ||
      !product_ratingsContainer ||
      !img_responsive_src
    ) {
      setError("Please input all the input field");
    } else {
      dispatch(updateProductsApi(formData, id));
      navigate("/product");
      setError("");
    }
  };
  return (
    <Flex minHeight="100vh" width="full" align="center" justifyContent="center">
      <Box
        borderWidth={1}
        px={4}
        width="full"
        maxWidth="500px"
        // borderRadious={4}
        textAlign="center"
        boxShadow="lg"
      >
        <Box textAlign="center" p={4}>
          <Heading>Edit Product</Heading>
          <Box my={8} textAlign="left">
            <form onSubmit={handleEdit}>
              <FormControl>
                <FormLabel>Product Name</FormLabel>
                <Input
                  onChange={handleChange}
                  name="product_product"
                  type="product_product"
                  value={product_product}
                  placeholder="Enter your Product Name"
                />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Product Brand</FormLabel>
                <Input
                  onChange={handleChange}
                  name="product_brand"
                  type="product_brand"
                  value={product_brand}
                  placeholder="Enter your email address"
                />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Product Price</FormLabel>
                <Input
                  onChange={handleChange}
                  name="product_strike"
                  type="product_strike"
                  value={product_strike}
                  placeholder="Enter your password"
                />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Product Rating</FormLabel>
                <Input
                  onChange={handleChange}
                  name="product_ratingsContainer"
                  type="product_ratingsContainer"
                  value={product_ratingsContainer}
                  placeholder="Enter your username"
                />
              </FormControl>
              <FormControl>
                <FormLabel>Product Image</FormLabel>
                <Input
                  onChange={handleChange}
                  type="img_responsive_src"
                  name="img_responsive_src"
                  value={img_responsive_src}
                  placeholder="Enter your Product Image"
                />
              </FormControl>

              <Button onChange={handleChange} type="submit" width="full" mt={4}>
                Update Product
              </Button>
            </form>
          </Box>
        </Box>
      </Box>
    </Flex>
  );
};

export default EditProduct;
