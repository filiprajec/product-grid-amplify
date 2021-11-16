/* eslint-disable import/prefer-default-export */

import PropTypes from "prop-types";

export const productPropType = PropTypes.shape({
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  brand: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  imageUrl: PropTypes.string,
  description: PropTypes.string,
});
