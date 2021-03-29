import React from "react";
import Main from "@/user/layouts/main.jsx";
import {Redirect} from "react-router-dom";
import {
	Container,
	Button,
	Row,
	Form,
	Col
} from "react-bootstrap";

export default class Profil extends React.Component{
	constructor(props){
		super(props);

		document.title = "Profil";

		this.state = {
			fields : {
				username : props.user.username,
				email : props.user.email,
				password : '',
				password_confirm : ''
			},
			errors : {},
			isLoadingFormData : false,
			isLoadingFormPhoto : false
		}

		this.formData = new window.$ReactFormInputValidation(this);
		this.formData.useRules({
			username : 'required',
			email : "required|email",
			password : "min:8",
			password_confirm : 'required|min:8'
		});
		this.formData.onformsubmit = this.onSubmitData.bind(this);
	}

	onSubmitData(fields){
		if(this.state.isLoadingFormData){
			return false;
		}

		this.setState({
			isLoadingFormData : true
		});

		window.$axios.put("api/user/"+this.props.user.id,fields)
		.then(res => {
			this.props.setUser({user : res.data.user});					
			window.$toastr('success','Berhasil Update Data');			
		})
		.catch(err => {
			if(err.response && err.response.status === 422){
	  			window.$toastr('error',err.response.data.error);
			}else if(err.response && err.response.status == 500){
	  			window.$toastr('error',err.response.data.message);
			}else{
				window.$toastr('error','Terjadi Kesalahan');
			}			
		})
		.finally(() => {
			this.setState({
				isLoadingFormData : false
			});
		});
	}

	onSubmitPhoto(evt){
		evt.preventDefault();

		if(this.state.isLoadingFormPhoto){
			return false;
		}

		this.setState({
			isLoadingFormPhoto : true
		});

		let photoData = new FormData(document.getElementById('user-photo'));

		window.$axios.post("api/user/"+this.props.user.id+"/photo",photoData)
		.then(res => {				
			this.props.setUser({user : res.data.user});					

			window.$toastr('success','Berhasil Update Data');			
		})
		.catch(err => {
			if(err.response && err.response.status === 422){
	  			window.$toastr('error',err.response.data.error);
			}else if(err.response && err.response.status == 500){
	  			window.$toastr('error',err.response.data.message);
			}else{
				window.$toastr('error','Terjadi Kesalahan');
			}			
		})
		.finally(() => {
			this.setState({
				isLoadingFormPhoto : false
			});
		});
	}

	render(){
		if(!this.props.user){
			return <Redirect to="/signin"/>
		}

		return (
			<Main {...this.props}>
				<$ToastContainer/>
				
				<Container>
					<Row>
						<Col bsPrefix="col-6"
							className="pt-5 text-center">
							<img src={this.props.baseUrl + '/assets/images/users/'+this.props.user.photo} />
							<br/>
							<Form id="user-photo"
								onSubmit={() => this.onSubmitPhoto(event)}
								encType="multipart/form-data">
								<Form.Control 
									type="file"
									name="photo"/>
								<Button type="submit" variant="primary">
							  	Kirim
								</Button>
							</Form>
						</Col>
						<Col bsPrefix="col-6">
							<Form className="text-left p-3"
								onSubmit={this.formData.handleSubmit}>							
							 <Form.Group>
							 	<Form.Label>
							 		Username
							 	</Form.Label>
							 	<Form.Control
							 	 name="username"
							 	 className={this.state.errors.username ? 'is-invalid' : ''}
								 placeholder="Masukan Username"			 	 
								 onChange={this.formData.handleChangeEvent}
								 value={this.state.fields.username}/>
								{
									!this.state.errors.username 
									?
									<Form.Text className="text-muted">
									 Masukan Username Anda
									</Form.Text>
									: 
									<Form.Text className="invalid-feedback">
									 {this.state.errors.username}
									</Form.Text>
								}
							 </Form.Group>

							 <Form.Group>
							 	<Form.Label>
							 		Email
							 	</Form.Label>
							 	<Form.Control
							 	 name="email"
							 	 className={this.state.errors.email ? 'is-invalid' : ''}
								 placeholder="Masukan Email"			 	 
								 onChange={this.formData.handleChangeEvent}
								 value={this.state.fields.email}/>
								{
									!this.state.errors.email 
									?
									<Form.Text className="text-muted">
									 Masukan Email Anda
									</Form.Text>
									: 
									<Form.Text className="invalid-feedback">
									 {this.state.errors.email}
									</Form.Text>
								}
							 </Form.Group>

							 <Form.Group>
							 	<Form.Label>
							 		Password
							 	</Form.Label>

							 	<Form.Control
							 	  name="password"
							 	  type="password"
							 	  className={this.state.errors.password ? 'is-invalid' : ''}
							 	  placeholder="Masukan Password"
							 	  onChange={this.formData.handleChangeEvent}
							 	  value={this.state.fields.password}/>

							 	 {
							 	 	!this.state.errors.password 
							 	 	?
							 	 	<Form.Text className="text-muted">
							 	 	 Masukan Password Anda
							 	 	</Form.Text>
							 	 	:
							 	 	<Form.Text className="invalid-feedback">
							 	 	 {this.state.errors.password}
							 	 	</Form.Text>
							 	 }
							 </Form.Group>

							  <Form.Group>
							 	<Form.Label>
							 		Password Confirm
							 	</Form.Label>

							 	<Form.Control
							 	  name="password_confirm"
							 	  type="password"
							 	  className={this.state.errors.password_confirm ? 'is-invalid' : ''}
							 	  placeholder="Masukan Password"
							 	  onChange={this.formData.handleChangeEvent}
							 	  value={this.state.fields.password_confirm}/>

							 	 {
							 	 	!this.state.errors.password_confirm 
							 	 	?
							 	 	<Form.Text className="text-muted">
							 	 	 Masukan Password Confirm Anda
							 	 	</Form.Text>
							 	 	:
							 	 	<Form.Text className="invalid-feedback">
							 	 	 {this.state.errors.password_confirm}
							 	 	</Form.Text>
							 	 }
							 </Form.Group>

							 {this.state.isLoadingFormData && 
							 	<Button type="submit" variant="primary">
							 	 . . .
							 	</Button>
							 }

							 {!this.state.isLoadingFormData &&
							 	<Button type="submit" variant="primary">
							 	 Kirim
							 	</Button>
							 }						
							</Form>
						</Col>
					</Row>
				</Container>
			</Main>
		)			
	}
}