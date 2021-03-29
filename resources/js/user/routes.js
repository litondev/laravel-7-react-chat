import React from "react";

export default [
	{
		path : "/chat-add",
		component : React.lazy(() => import(/* webpackChunkName: "user-chat-add" */ './views/chat-add')),
	},
	{
		path : "/profil",
		component : React.lazy(() => import(/* webpackChunkName: "user-profil" */ './views/profil')),
	},
	{
		path : "/chat",
		component : React.lazy(() => import(/* webpackChunkName: "user-chat" */ './views/chat'))
	},
	{
		path : "/signup",
		component : React.lazy(() => import(/* webpackChunkName: "user-signup" */ './views/signup'))
	},
	{
		path : "/signin",
		component : React.lazy(() => import(/* webpackChunkName: "user-signin" */ './views/signin'))
	},
	{
		path : "*",
		component : React.lazy(() => import(/* webpackChunkName: "user-home" */ './views/home'))
	}	
];