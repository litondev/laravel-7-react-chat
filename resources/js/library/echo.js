import Echo from "laravel-echo";
window.io = require('socket.io-client');
window.$echo = new Echo({
	broadcaster: 'socket.io',
	host: window.location.hostname+":6001",
	auth: {
		headers: {
			'X-CSRF-TOKEN' : window.laravel.csrf_token
		}
	}    		
})