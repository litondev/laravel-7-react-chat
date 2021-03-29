import {createStore} from "redux";

let states = {
	baseUrl : window.laravel.base_url,
	isMobile : parseInt(window.laravel.is_mobile),
	user : null,
	config : [],
	finsihGetAllData : false
}

function App(state = states,action){
	switch(action.type){
		case "SET_USER" :

			return {
				...state,
				...action.data
			}
		case "SET_CONFIG" :
			return {
				...state,
				...action.data
			}
		case "SET_ALL_DATA" :
			return {
				...state,
				...action.data,			
				finsihGetAllData : true
			}
		default :
			return state;
	}
}

export default createStore(App);