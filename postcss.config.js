// eslint-disable-next-line import/no-extraneous-dependencies
module.exports = {
  plugins: [
    "postcss-preset-env",
    require("postcss-import"),
    require("tailwindcss"),
    require("postcss-nested"),
  ],
};
