import axios from "axios";;
axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
axios.defaults.baseURL = window.laravel.base_url;
window.$axios = axios;