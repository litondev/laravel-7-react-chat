/* React */
import React from "react";
import ReactDOM from "react-dom";

/* Library */
import "@/library/axios.js";
import "@/library/react-toastify.js";
import "@/library/react-form-input-validation.js";
import 'bootstrap/dist/css/bootstrap.min.css';

/* Root App */
import Root from "./Root.jsx";

/* Redux */
import {Provider} from "react-redux";
import store from "@/store/index.js";

/* Render */
ReactDOM.render(
	<Provider
		store={store}>
		<Root/>
	</Provider>,
	document.getElementById('app')
);