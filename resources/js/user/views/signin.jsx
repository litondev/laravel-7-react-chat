import React from "react";
import {Redirect,Link} from "react-router-dom";
import {
	Container,
	Button,
	Row,
	Form,
	Col
} from "react-bootstrap";

export default class Signin extends React.Component{
	constructor(props){
		super(props);

		document.title = "Signin";

		this.state = {
			fields : {
				email : '',
				password : ''
			},
			errors : {},
			isLoadingForm : false
		}

		this.form = new window.$ReactFormInputValidation(this);
		this.form.useRules({
			email : "required|email",
			password : "required|min:8"
		});
		this.form.onformsubmit = this.onSubmit.bind(this);
	}

	onSubmit(fields){
		if(this.state.isLoadingForm){
			return false;
		}

		this.setState({
			isLoadingForm : true
		});

		window.$axios.post("api/user/signin",fields)
		.then(res => {
			window.$toastr('success','Berhasil Masuk');

			setTimeout(() => {
				window.location = this.props.baseUrl + res.data.role == 'admin' ? '/admin' : '/chat';					
			},1500);
		})
		.catch(err => {
			if(err.response && err.response.status === 422){
	  			window.$toastr('error',err.response.data.error);
			}else if(err.response && err.response.status == 500){
	  			window.$toastr('error',err.response.data.message);
			}else{
				window.$toastr('error','Terjadi Kesalahan');
			}

			this.setState({
				isLoadingForm : false
			});
		})
	}

	render(){		
		if(this.props.user){
			return <Redirect to="/chat"/>
		}

		return(
			<Container 
				className="p-5"
				fluid>
				<$ToastContainer/>

				<Container
					className="mt-5 mb-5 p-3 cleafix">
					<Row>
						<Col bsPrefix={this.props.isMobile ? 'col-12' : 'col-6'}
							className="p-3 text-right">
							<img src={ this.props.baseUrl + '/assets/images/welcome.png' }
								className="img-fluid pt-5"/>
						</Col>
						<Col bsPrefix={this.props.isMobile ? 'col-12' : 'col-6'} 
							className="p-3">
							<Form className="text-left p-3"
								onSubmit={this.form.handleSubmit}>
							 <Form.Group>
							 	<Form.Label>
							 		Email
							 	</Form.Label>
							 	<Form.Control
							 	 name="email"
							 	 className={this.state.errors.email ? 'is-invalid' : ''}
								 placeholder="Masukan Email"			 	 
								 onChange={this.form.handleChangeEvent}
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
							 	  onChange={this.form.handleChangeEvent}
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

							 {this.state.isLoadingForm && 
							 	<Button type="submit" variant="primary">
							 	 . . .
							 	</Button>
							 }

							 {!this.state.isLoadingForm &&
							 	<Button type="submit" variant="primary">
							 	 Masuk
							 	</Button>
							 }

							 <div className="mt-3">
							  <Link to="/signup">Belum Punya Akun</Link>
							 </div>
							</Form>								
						</Col>
					</Row>
				</Container>
			</Container>
		)
	}
}