import amplifyApi from "../../src/amplify-api";
import { listProducts } from "../../src/graphql/queries";

const getProducts = async () => {
  try {
    const response = await amplifyApi.graphql({
      query: listProducts,
    });
    return response?.data?.listProducts?.items;
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err);
    return null;
  }
};

test("Check that the api returns items", async () => {
  const products = await getProducts();
  expect(products).toEqual(expect.arrayContaining([expect.any(Object)]));
});
