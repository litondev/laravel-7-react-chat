import React from "react";
import {Container,Col,Row} from "react-bootstrap";

export default class Home extends React.Component{
	constructor(props){
		super(props);

		document.title = "Home";
	}

	render(){		
		let buttonChat = {
			'background' : '#334776ff',
			'border' : '0px',
			'paddingLeft' : '20px',
			'paddingRight' : '20px',
			'paddingTop' : '7px',
			'paddingBottom' : '7px',
			'color' : 'white',
			'borderRadius' : '3px',
			'marginLeft' : '10px',
			'marginRight' : '10px'
		};

		let boxVendor = {
			'background' : '#334776ff',
			'height' : '300px',
			'borderRadius' : '5px'
		};		

		return(
			<Container fluid>
				<$ToastContainer/>		

				<Container className="mt-4">
					<Col bsPrefix="col-12" className="text-right">
						<button style={buttonChat}
							onClick={() => this.props.history.push('/signin')}>
						 Masuk
						</button>
						<button style={buttonChat}
							onClick={() => this.props.history.push('/signup')}>
						 Daftar
						</button>
					</Col>

					<Row className="mt-3 pt-5 pb-5">
						<Col bsPrefix={this.props.isMobile ? 'col-12' : 'col-6'} className="text-right">
							<img src={this.props.baseUrl + '/assets/images/home-welcome.png'}
								className="img-fluid"/>							
						</Col>
						<Col bsPrefix={this.props.isMobile ? 'col-12' : 'col-6'} className="text-left pt-5">
							<h1>Chatingan</h1>
							<h6>
							 Chat dengan teman-teman <br/> keluarga dengan chatingan
							</h6>
						</Col>
					</Row>
					
					<Row className="mt-5 mb-5 pt-5 pb-5">
						<Col bsPrefix={this.props.isMobile ? 'col-12' : 'col-4'}>
							<Col bsPrefix="col-11"
								style={boxVendor}>
							</Col>
						</Col>
						
						<Col bsPrefix={this.props.isMobile ? 'col-12' : 'col-4'}>
							<Col bsPrefix="col-11"
								style={boxVendor}>
							</Col>
						</Col>

						<Col bsPrefix={this.props.isMobile ? 'col-12' : 'col-4'}>
							<Col bsPrefix="col-11"
								style={boxVendor}>
							</Col>
						</Col>
					</Row>

					<Row className="mt-5 pt-5 pb-5">
						<Col bsPrefix={this.props.isMobile ? 'col-12' : 'col-6'} className="text-right">
							<img src={this.props.baseUrl + '/assets/images/welcome.png'}
								className="img-fluid"/>
						</Col>

						<Col bsPrefix={this.props.isMobile ? 'col-12' : 'col-6'} className="d-flex align-self-center">
							<button style={buttonChat}							
								onClick={() => this.props.history.push('/signin')}>
						 		Masuk
							</button>
							<button style={buttonChat}
								onClick={() => this.props.history.push('/signup')}>
						 		Daftar
							</button>
						</Col>					
					</Row>
				</Container>
			</Container>
		)
	}
}