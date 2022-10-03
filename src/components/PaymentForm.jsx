import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart } from "../store/Cart/Cart.action";

const PaymentForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [formData, setFormData] = React.useState({
    name: "",
    address: "",
    state: "",
    country: "",
    pincode: "",
    paymentmethod: true,
    details: "",
  });

  const cart = useSelector((state) => state.cart.cart);

  const [data, setData] = React.useState([]);

  const [payment, setPayment] = React.useState([]);

  const [checkedItems, setCheckedItems] = React.useState([false, false]);

  const allChecked = checkedItems.every(Boolean);
  const isIndeterminate = checkedItems.some(Boolean) && !allChecked;

  const handleChange = (e) => {
    let { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleClick = (e) => {
    e.preventDefault();
    console.log(formData);
    localStorage.setItem("UserDeta", JSON.stringify(formData));
  };

  const { name, address, state, country, pincode, paymentmethod, details } =
    formData;
  return (
    <Flex width="full" align="center" justifyContent="center">
      <Box textAlign="center" p={4}>
        <Heading>Shipping Address</Heading>
        <Box my={8} textAlign="left">
          <form onSubmit={handleClick}>
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input
                onChange={handleChange}
                name="name"
                value={name}
                type="name"
                placeholder="Enter your name"
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Address</FormLabel>
              <Input
                onChange={handleChange}
                name="address"
                value={address}
                type="address"
                placeholder="Enter your address"
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>State</FormLabel>
              <Input
                onChange={handleChange}
                name="state"
                value={state}
                type="state"
                placeholder="Enter your state"
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Country</FormLabel>
              <Input
                onChange={handleChange}
                name="country"
                value={country}
                type="country"
                placeholder="Enter your country"
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Pin Code</FormLabel>
              <Input
                onChange={handleChange}
                name="pincode"
                value={pincode}
                type="number"
                placeholder="Enter your pincode"
              />
            </FormControl>

            <Button type="submit" width="full" mt={4}>
              Add Details
            </Button>
          </form>
        </Box>
      </Box>
    </Flex>
  );
};

export default PaymentForm;
