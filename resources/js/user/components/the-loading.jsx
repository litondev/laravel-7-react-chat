import React from "react";
import LoadingOverlay from "react-loading-overlay";

export default function(){
	return (
		<LoadingOverlay
			active={true}
			spinner
			text="Loading your content . . .">
			<div style={{height : '100vh'}}></div>
		</LoadingOverlay>	
	)
}