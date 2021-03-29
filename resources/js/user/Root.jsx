import React from "react";
import {
	BrowserRouter,
	Route,
	Switch,
	Link
} from "react-router-dom";
import {connect} from "react-redux";
import Routes from "./routes.js";
import TheLoading from "@/user/components/the-loading.jsx";

class Root extends React.Component{
	constructor(props){
		super(props);		

		let promiseUser = window.$axios.get("api/user")
			.then(res => res.data)
			.catch(err => {
				console.log(err);
			});

		let promiseSetting = window.$axios.get("api/user/setting")
			.then(res => res.data)
			.catch(err => {
				console.log(err);
			});

		Promise.all([promiseUser,promiseSetting])
			.then(res => {			
				props.setAllData({
					user : Object.keys(res[0]).length ? res[0] : null,
					config : res[1]
				});					
			});
	}

	render(){
		return (
			<BrowserRouter>
				<React.Suspense
					fallback={<TheLoading/>}>
					{!this.props.finsihGetAllData && <TheLoading/>}

					{this.props.finsihGetAllData &&
						<Switch>
						 {
						  Routes.map((route,indexRoute) => 
						  	<Route 
						  		path={route.path}
						  		key={indexRoute}
						  		render={
						  			(props) => <route.component 
						  				{...props} 
						  				{...this.props}/>
						  		}/>
						  )
						 }
						</Switch>
					}
				</React.Suspense>
			</BrowserRouter>
		)
	}
}

const mapStateToProps = (state) => ({
	baseUrl : state.baseUrl,
	isMobile : state.isMobile,
	user : state.user,
	config : state.config,
	finsihGetAllData : state.finsihGetAllData
});

const mapDisptachToProps = (disptach) => ({
	setUser : (data) => {
		disptach({
			"type" : "SET_USER",
			"data" : data
		});
	},

	setConfig : (data) => {
		disptach({
			"type" : "SET_CONFIG",
			"data" : data 
		});
	},

	setAllData : (data) => {
		disptach({
			"type" : "SET_ALL_DATA",
			"data" : data
		});
	}
});

export default connect(mapStateToProps,mapDisptachToProps)(Root);