import React, { useState } from "react";
import PropTypes from "prop-types";

import amplifyApi from "../../amplify-api";
import { productPropType } from "../../utils/prop-types";
import { createProduct } from "../../graphql/mutations";

const NewProductForm = (props) => {
  const { products, setProducts } = props;
  const [isSubmitting, setIsSubmitting] = useState(false);
  // these are states related to new product values
  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [price, setPrice] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [description, setDescription] = useState("");

  const handleInputChange = (event, setState) => setState(event.target.value);

  const areRequiredFieldsComplete = () => {
    const requiredFields = [name, brand, price];
    return requiredFields.every(
      (fieldValue) => fieldValue !== "" && fieldValue != null
    );
  };

  const clearForm = () => {
    setName("");
    setBrand("");
    setPrice("");
    setImageUrl("");
    setDescription("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    try {
      if (!areRequiredFieldsComplete()) {
        throw new Error("required fields are not complete");
      }
      const newProduct = {
        name,
        brand,
        price: parseFloat(price),
        imageUrl,
        description,
      };
      const response = await amplifyApi.graphql({
        query: createProduct,
        variables: {
          input: newProduct,
        },
      });
      if (response?.data?.createProduct?.id) {
        setProducts([...products, newProduct]);
        clearForm();
      } else {
        throw new Error("graphql response invalid");
      }
      setIsSubmitting(false);
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error("form submission error", e);
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="new-product-form">
      <h3 className="text-lg font-bold mb-2">New Product</h3>
      <label htmlFor="name" className="required">
        <span>Product Name</span>
        <input
          type="text"
          name="name"
          value={name}
          onChange={(e) => handleInputChange(e, setName)}
          required
        />
      </label>
      <label htmlFor="brand" className="required">
        <span>Product Brand</span>
        <input
          type="text"
          name="brand"
          value={brand}
          onChange={(e) => handleInputChange(e, setBrand)}
          required
        />
      </label>
      <label htmlFor="price" className="required">
        <span>Product Price</span>
        <input
          type="number"
          name="price"
          value={price}
          onChange={(e) => handleInputChange(e, setPrice)}
          required
        />
      </label>
      <label htmlFor="imageUrl">
        <span>Product Image URL</span>
        <input
          type="text"
          name="imageUrl"
          value={imageUrl}
          onChange={(e) => handleInputChange(e, setImageUrl)}
        />
      </label>
      <label htmlFor="description">
        <span>Product Description</span>
        <textarea
          type="url"
          name="description"
          value={description}
          onChange={(e) => handleInputChange(e, setDescription)}
          rows="2"
          cols="50"
        />
      </label>
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Adding..." : "Add Product"}
      </button>
    </form>
  );
};

NewProductForm.propTypes = {
  products: PropTypes.arrayOf(productPropType).isRequired,
  setProducts: PropTypes.func,
};

NewProductForm.defaultProps = {
  setProducts: () => {
    // eslint-disable-next-line no-console
    console.warn("setProducts not attached to form");
  },
};

export default NewProductForm;
