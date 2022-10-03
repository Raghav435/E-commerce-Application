import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Filter from "../components/Filter";
import { getProductsApi } from "../store/Products/Products.action";
import styles from "./styles/ListingPage.module.css";
import { Box, Button, Flex, Text } from "@chakra-ui/react";
import ProductCard from "../components/ProductCard";

const ListingPages = () => {
  const { loading, error, data } = useSelector((state) => state.products);
  // console.log(data);

  const products = useSelector((state) => state.products.filteredItems);
  // console.log(products);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProductsApi());
  }, []);

  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentpages = products.slice(indexOfFirstProduct, indexOfLastProduct);
  const pageCount = Math.ceil(products.length / productsPerPage);

  // console.log(currentpages);

  let pageNumberArray = [];
  for (let i = 0; i < pageCount; i++) {
    pageNumberArray[i] = (
      <Box className={currentPage == i + 1 ? "page-item active" : "page-item"}>
        <Button className="page-link" onClick={() => setCurrentPage(i + 1)}>
          {i + 1}
        </Button>
      </Box>
    );
  }

  if (loading) {
    return "Loading...";
  }

  return (
    <div>
      <div className={styles.product_topbar}>
        <h1 className={styles.productTitile}>Products</h1>
        <Link to="/dashboard/products">
          <button className={styles.productAddButton}>Create</button>
        </Link>
      </div>

      <Filter></Filter>
      {products.length === 0 ? (
        <div>...Loading Products</div>
      ) : (
        <div className={styles.grid}>
          {currentpages.map((item) => (
            <ProductCard key={item.id} {...item} />
          ))}

          {/* {currentpages.map((products) => (
            <div key={products.id} style={{ border: "1px solid teal" }}>
              <Link to={`/product/${products.id}`}>
                <img
                  className={styles.flex}
                  style={{ height: "300px" }}
                  key={products.img}
                  src={products.img_responsive_src}
                  alt={products.products_img}
                />
                <p style={{ fontWeight: "bolder" }} className={styles.flex}>
                  {products.product_brand}
                </p>
                <p className={styles.flex}>{products.product_product}</p>
                <p style={{ fontWeight: "bolder" }} className={styles.flex}>
                  Rs. {products.product_strike}
                </p>
                <p style={{ color: "red" }} className={styles.flex}>
                  {products.product_discountPercentage}
                </p>
                <p style={{ color: "teal" }} className={styles.flex}>
                  {products.product_ratingsContainer}
                </p>
              </Link>
            </div>
          ))} */}
        </div>
      )}

      <Flex mt={4} justifyContent="center" gap={4}>
        <Box className={currentPage == 1 ? "page-item disabled" : "page-item "}>
          <Button
            onClick={() => setCurrentPage(currentPage - 1)}
            backgroundColor="teal.200"
            disabled={currentPage == 1}
          >
            Prev
          </Button>
        </Box>

        <Text gap={2} display="flex">
          {pageNumberArray.map((li) => li)}
        </Text>
        <Box
          className={
            currentPage == pageCount ? "page-item disabled" : "page-item "
          }
        >
          <Button
            onClick={() => setCurrentPage(currentPage + 1)}
            backgroundColor="teal.200"
            disabled={currentPage == pageCount}
          >
            Next
          </Button>
        </Box>
      </Flex>
    </div>
  );
};

export default ListingPages;
