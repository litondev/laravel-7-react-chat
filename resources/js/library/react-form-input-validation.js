import ReactFormInputValidation from "react-form-input-validation";
let messages = ReactFormInputValidation.getMessages('en');
messages.required = "harus diisi";
messages.email = 'tidak valid';
messages.min = 'harus lebih dari :min';
ReactFormInputValidation.setMessages('en',messages);
window.$ReactFormInputValidation = ReactFormInputValidation;