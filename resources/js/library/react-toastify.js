import {
	ToastContainer,
	toast
} from "react-toastify";

import 'react-toastify/dist/ReactToastify.css';

window.$ToastContainer = ToastContainer;

window.$toastr = function(action,args){
	let options = {
		position: "bottom-right",
		autoClose: 5000,
		hideProgressBar: true,
		closeOnClick: true,
		pauseOnHover: true,
		draggable: true,
		progress: undefined,
	};

	if(action == 'error'){
		toast.error(args,options);
	}else if(action == "success"){
		toast.success(args,options);
	}else{
		toast(args,options);
	}
}