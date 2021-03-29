import React from "react";
import Skeleton from "react-loading-skeleton";

export default function loadingChannel(){
	return (
		<div className="p-2">
			<Skeleton height={50} width={50} circle={true}/>		
			<Skeleton height={40} width={100} style={{marginLeft : '10px'}}/>
		</div>
	)
}