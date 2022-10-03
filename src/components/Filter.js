import styles from "../styles/Filter.module.css";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  filterProductsApi,
  sortProductsApi,
} from "../store/Products/Products.action";

const Filter = (props) => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.data);
  // console.log(products);

  const filteredProducts = useSelector((state) => state.products.filteredItems);
  // console.log(filteredProducts);

  const size = useSelector((state) => state.products.size);
  // console.log(size);

  const sort = useSelector((state) => state.products.sort);
  // console.log(sort);

  const handleSort = (e) => {
    dispatch(sortProductsApi(filteredProducts, e.target.value));
  };

  const handleFilter = (e) => {
    dispatch(filterProductsApi(products, e.target.value));
  };

  return !filteredProducts ? (
    <div>Loading....</div>
  ) : (
    <div className={styles.filter}>
      <div className={styles.filter_result}>
        {filteredProducts.length}
        {"  "}Products
      </div>
      <div className={styles.filter_sort}>
        Order By
        <select value={props.sort} onChange={handleSort}>
          <option value="latest">latest</option>
          <option value="lowest">Lowest</option>
          <option value="highest">Highest</option>
        </select>
      </div>
      <div className={styles.filter_size}>
        Filter Size
        <select value={props.size} onChange={handleFilter}>
          <option value="">ALL</option>
          <option value="X">X</option>
          <option value="L">L</option>
          <option value="XL">XL</option>
          <option value="XXL">XXL</option>
        </select>
      </div>
    </div>
  );
};

export default Filter;
