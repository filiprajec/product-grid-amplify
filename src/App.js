import React, { useState, useEffect } from "react";

import amplifyApi from "./amplify-api";
import { listProducts } from "./graphql/queries";
import NewProductForm from "./UI/NewProductForm";
import ProductGrid from "./UI/ProductGrid";
import Spinner from "./UI/Spinner";

const App = () => {
  const [products, setProducts] = useState(null);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await amplifyApi.graphql({
          query: listProducts,
        });
        setProducts(response?.data?.listProducts?.items ?? []);
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error(err);
      }
    };
    getProducts();
  }, []);

  return (
    <div className="p-6">
      {products ? (
        <>
          <div className="block w-full max-w-screen-xl mx-auto">
            <ProductGrid products={products} />
          </div>
          <div className="block w-full max-w-screen-xl mx-auto mt-8 ">
            <NewProductForm setProducts={setProducts} products={products} />
          </div>
        </>
      ) : (
        <div className="flex items-center justify-center h-screen">
          <Spinner />
        </div>
      )}
    </div>
  );
};

App.propTypes = {};

export default App;
