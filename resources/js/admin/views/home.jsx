import React from "react";

export default class Home extends React.Component{
	constructor(props){
		super(props);

		document.title = "Admin";
	}

	render(){		
		return(
			<div>
				Admin
			</div>
		)
	}
}