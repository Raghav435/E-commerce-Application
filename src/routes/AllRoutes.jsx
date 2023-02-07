import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Footer from "../components/Footer";
import Login from "../components/Login";
import Navbar from "../components/Navbar";
import EditProduct from "../components/pages/products/EditProduct";
import ThankyouPage from "../components/ThankyouPage";
import AboutUs from "../pages/AboutUs";
import AdminPage from "../pages/AdminPage";
import Blog from "../pages/Blog";
import CartPage from "../pages/CartPage";
import ContactUs from "../pages/ContactUs";
import EntityPages from "../pages/EntityPages";
import Home from "../pages/HomePage";
import ListingPages from "../pages/ListingPages";
import PaymentPage from "../pages/PaymentPage";
import SignupPage from "../pages/SignupPage";

const promise = loadStripe(
  "pk_test_51L97nDSJamWgxW3FAkAQ3D2v127yEvkP8WF8YxSyrp3mGNwOxsSoeIvQNbAAgJatwVDDVLKGxpPMWpBvypXeWVN000GizGQda3"
);

// function PrivateRoute({ userData, children }) {
//   if (userData) {
//     return children;
//   } else {
//     return <Navigate to="/login"></Navigate>;
//   }
// }

const AllRoutes = () => {
  const userData = useSelector((state) => state.authReducer.user);
  console.log(userData);
  const myData = JSON.parse(localStorage.getItem("User"));
  console.log(myData);
  // const [open, setOpen] = useState(true);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/product"
          element={
            // <PrivateRoute>
            <ListingPages />
            // </PrivateRoute>
          }
        />
        <Route
          path="/product/:productId"
          element={
            // <PrivateRoute>
            <EntityPages />
            // </PrivateRoute>
          }
        />

        <Route path="/editproduct/:id" element={<EditProduct />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route
          path="/payment"
          element={
            <Elements stripe={promise}>
              <PaymentPage />
              {!myData && <Navigate to="/login"></Navigate>}
            </Elements>
          }
        />
        <Route path="/thankyouPage" element={<ThankyouPage />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/contactus" element={<ContactUs />} />
        <Route path="/dashboard" element={<AdminPage />} />
        <Route path=":topics/*" element={<AdminPage />}></Route>
      </Routes>
      <Footer />

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover
        theme="colored"
      />
    </>
  );
};

export default AllRoutes;
