import React from "react";
import ReactDOM from "react-dom";
import Amplify from "aws-amplify";

import awsExports from "./aws-exports";
import App from "./App";
import './css/style.css';

Amplify.configure(awsExports);

ReactDOM.render(<App />, document.getElementById("root"));
