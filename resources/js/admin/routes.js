import React from "react";

export default [	
	{
		path : "*",
		component : React.lazy(() => import(/* webpackChunkName: "admin-home" */ './views/home'))
	}	
];