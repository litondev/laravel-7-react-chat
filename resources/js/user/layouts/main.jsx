import React from "react";
import {Container,Navbar,Nav,NavDropdown} from "react-bootstrap";

export default class Main extends React.Component{
	constructor(props){
		super(props);

		this.state = {
			isLoadingLogout : false
		}
	}

	logout(){
		if(this.state.isLoadingLogout){
			return false;
		}

		this.setState({
			isLoadingLogout : true
		});

		window.$axios.post("/api/user/logout")
		.then(res => {
			window.location.href = this.props.baseUrl;
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
				isLoadingLogout : false
			});
		})
	}

	render(){
		return (
			<>					
			    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
				  <Container>
					  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
					  	<Navbar.Collapse id="responsive-navbar-nav">
					    <Nav className="mr-auto">
					      <Nav.Link onClick={() => this.props.history.push('/chat')}>Dashboard</Nav.Link>					      
					      <Nav.Link onClick={() => this.props.history.push('/chat-add')}>Chat Add</Nav.Link>
					    </Nav>					    
					    <Nav>
					      <NavDropdown title="Profil" id="collasible-nav-dropdown">
					        <NavDropdown.Item onClick={() => this.props.history.push('/profil')}>
					        Profil
					        </NavDropdown.Item>
					        <NavDropdown.Divider />
					        <NavDropdown.Item 
					        	href="#"
					        	onClick={() => this.logout()}>
					        	Keluar
					        </NavDropdown.Item>
					      </NavDropdown>
					    </Nav>
					  </Navbar.Collapse>
					</Container>
				</Navbar>			
					
				{this.props.children}
			</>
		)
	}
}