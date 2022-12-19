import {
  Elements,
  CardElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import "./styles/CheckoutStripe.css";
import { loadStripe } from "@stripe/stripe-js";
import { PaymentElement } from "@stripe/react-stripe-js";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast} from "react-toastify";
import {Button, useToast} from "@chakra-ui/react";
import {emptyCart} from "../store/Cart/Cart.action";

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(
  "pk_test_51L97nDSJamWgxW3FAkAQ3D2v127yEvkP8WF8YxSyrp3mGNwOxsSoeIvQNbAAgJatwVDDVLKGxpPMWpBvypXeWVN000GizGQda3"
);

function CheckOutStripe() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const toast = useToast();

  const stripe = useStripe();
  const elements = useElements();
  const cart = useSelector((state) => state.cart.cart);

  const cartTotal = cart.reduce((acc, el) => {
    return acc + el.cart * el.prize;
  }, 0);

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

//   const cartAferDisc = cartTotal - (cartTotal / 100) * 5;

  const toPay = Total_Price;

  const notify = () => toast.success(`Payment Successfull..! \nThank You..!`);

  const handleSubmit = async (event) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    var response = fetch("https://ecommerce-backend-app.onrender.com/payment/create", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ amount: toPay }),
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (responseJson) {
        var clientSecret = responseJson.clientSecret;

        // Call stripe.confirmCardPayment() with the client secret.
        stripe
          .confirmCardPayment(clientSecret, {
            payment_method: {
              card: elements.getElement(CardElement),
            },
          })
          .then(() => {
            // notify();
            toast({
                title: "Payment Successfully!",
                description: "Thank You",
                status: "success",
                duration: 5000,
                isClosable: true,
              });
            navigate("/thankyouPage");
          })
          .catch((err) => console.warn(err));
      });
  };

  return (
    <div>
      <form className="Checkout_card_details">
        <CardElement className="Checkout_cardElement" />
        <Button
          onClick={(e) => handleSubmit(e)}
          disabled={!stripe}
          variant="contained"
          color="success"
          sx={{ margin: "20px", width: "90%", backgroundColor: "#47bf9c" }}
        >
          Make Payment
        </Button>
      </form>
    </div>
  );
}

export default CheckOutStripe;
