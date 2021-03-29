import React from "react";
import {Redirect} from "react-router-dom";
import Main from "@/user/layouts/main.jsx";
import {Container,Row,Col,Form,Button} from "react-bootstrap";

export default class Chat extends React.Component{
	constructor(props){
		super(props);

		this.state = {
			isLoadingUsername : false,
			isLoadingMakeChannel : false,
			user : null
		}

		document.title = "Chat Add";
	}	

	onChangeUsername(evt){		
		if(evt.keyCode != 13 || this.isLoadingUsername){
			return false;
		}

		this.setState({
			isLoadingUsername : true
		});

		window.$axios.get("api/user/"+evt.target.value)
		.then(res => {
			this.setState({
				user :  (Object.keys(res.data).length ? res.data : null)
			});

			if(!Object.keys(res.data).length){			
				window.$toastr('error','User tidak ditemukan');
			}	
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
				isLoadingUsername : false
			});
		});
	}

	makeChannel(){
		if(this.state.isLoadingMakeChannel){
			return false;
		}

		this.setState({
			isLoadingMakeChannel : true
		});

		window.$axios.post("api/user/channel",{
			id : this.state.user.id 
		})
		.then(res => {
			window.$toastr('success','Berhasil membuat channel');
			
			this.setState({
				isLoadingMakeChannel : false
			})

			setTimeout(() => {
				this.props.history.push('/chat');
			},2000);
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
				isLoadingMakeChannel : false
			})
		});
	}

	render(){
		if(!this.props.user){
			return <Redirect to="/signin"/>
		}

		return(
			<Main {...this.props}>
				<$ToastContainer/>
				<Container
					className="p-5">			
					<div className="p-3">
						<Form.Control
							placeholder="Masukan Username User"			 	 
							onKeyUp={() => this.onChangeUsername(event)}/>
					</div>

					{!this.state.user && <div className="w-20 text-center pt-3">
							<img src={this.props.baseUrl + '/assets/images/chat-add.png'}/>
						</div>
					}

					{this.state.user && 
						<>
							<Row>
								<Col bsPrefix="col-2">
									<img src={this.props.baseUrl + '/assets/images/users/' + this.state.user.photo} 
										className="img-fluid"/>
								</Col>

								<Col bsPrefix="col-10">
									{this.state.user.username}
									<br/>
									<br/>
									<Button onClick={() => this.makeChannel()}>
										{this.state.isLoadingMakeChannel ? '...' : 'Buat Channel'}
									</Button>
								</Col>
							</Row>
						</>						
					}
				</Container>
			</Main>
		)
	}
}