import React from "react";
import PropTypes from "prop-types";

import { productPropType } from "../../utils/prop-types";
import Product from "./Product";

const ProductGrid = (props) => {
  const { products } = props;

  if (products == null) {
    return "error getting products"
  }

  if (products.length === 0) {
    return "no products here yet"
  }

  return (

    <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {products.map((product) => (
        <Product product={product} key={product.id} />
      ))}
    </ul>
  );
};

ProductGrid.propTypes = {
  products: PropTypes.arrayOf(productPropType).isRequired,
};

export default ProductGrid;
