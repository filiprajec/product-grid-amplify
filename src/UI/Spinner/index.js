import React from "react";

const Spinner = () => (
    <div className="flex justify-center items-center">
      <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-gray-900" />
    </div>
  );

Spinner.propTypes = {};

export default Spinner;
