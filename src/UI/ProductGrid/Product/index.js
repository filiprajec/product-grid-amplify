import React from "react";
import { productPropType } from "../../../utils/prop-types";

const Product = (props) => {
  const { product } = props;

  const formatPrice = (price) =>
    price.toLocaleString("en-US", { style: "currency", currency: "AUD" });

  return (
    <li className="border">
      <div className="aspect-w-3 aspect-h-4">
        <img
          src={product.imageUrl}
          className="object-cover h-full w-full"
          alt={product.description ?? "featured"}
        />
      </div>
      <div className="p-2">
        <span className="block font-bold">{product.name}</span>
        <span className="block">{product.brand}</span>
        <span className="text-gray-500">{formatPrice(product.price)}</span>
      </div>
    </li>
  );
};

Product.propTypes = {
  product: productPropType.isRequired,
};

export default Product;
