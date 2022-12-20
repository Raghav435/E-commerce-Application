import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Img,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Table,
  Tbody,
  Thead,
  Td,
  TableContainer,
  Text,
  Tfoot,
  Th,
  Tr,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  addProductsApi,
  deleteProductsApi,
} from "../../../store/Products/Products.action";

const Products = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
  const toast = useToast();
  const initState = {
    product_product: "",
    product_brand: "",
    productprice: "",
    product_ratingsContainer: "",
    img_responsive_src: "",
  };
  const [product, setProduct] = React.useState([]);

  const [formData, setFormData] = React.useState(initState);

  const [editProduct, setEditProduct] = React.useState(null);

  const {
    product_product,
    product_brand,
    product_strike,
    product_ratingsContainer,
    img_responsive_src,
  } = formData;

  const handleChange = (e) => {
    let { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const [records, setRecords] = React.useState([]);

  const [error, setError] = React.useState("");

  const dispatch = useDispatch();

  const products = useSelector((state) => state.products.filteredItems);
  // console.log(products);

  const userDeta = JSON.parse(localStorage.getItem("User"));

  if (!userDeta) {
    return <Navigate to="/login"></Navigate>;
  }

  if (userDeta.user.email !== "rs@gmail.com") {
    return <Navigate to="/"></Navigate>;
  }

  const handleAdd = (e) => {
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
      dispatch(addProductsApi(formData));
      navigate("/product");
      setError("");
    }
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure wanted to delete the product ?")) {
      dispatch(deleteProductsApi(id));
    }
  };

  return (
    <Box>
      <Button onClick={onOpen}>Create new Products</Button>
      <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>New Products</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {error && <h3 style={{ color: "red" }}>{error}</h3>}
            <form onSubmit={handleAdd}>
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

              <Button type="submit" width="full" mt={4}>
                Add Product
              </Button>
            </form>
          </ModalBody>

          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>

      <Box>
        <TableContainer
          mt={5}
          fontSize={{ base: "15px", md: "20px", lg: "20px" }}
        >
          <Table size="sm" mx="auto" variant="striped" colorScheme="teal">
            <Thead>
              <Tr>
                <Th>Product Id</Th>
                <Th>Product Image</Th>
                <Th>Product Name</Th>
                <Th>Product Brand</Th>
                <Th>Product Price</Th>
                <Th>Product Rating</Th>
                <Th>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {products.map((prod) => (
                <Tr key={prod.id}>
                  <Td>{prod.id}</Td>
                  <Td>
                    <Img
                      height="80px"
                      src={prod.img_responsive_src}
                      alt="productimage"
                    />
                  </Td>
                  <Td>
                    <Text>{prod.product_product}</Text>
                  </Td>
                  <Td>{prod.product_brand}</Td>
                  <Td>{prod.product_strike}</Td>
                  <Td>{prod.product_ratingsContainer}</Td>
                  <Td>
                    <Link to={`/editproduct/${prod.id}`}>
                      <Button>Edit</Button>
                    </Link>
                    <Button onClick={() => handleDelete(prod.id)} ml={3}>
                      Delete
                    </Button>
                  </Td>
                </Tr>
              ))}
            </Tbody>
            <Tfoot></Tfoot>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default Products;
