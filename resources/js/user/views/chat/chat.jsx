import React from "react";
import {Container,Row,Col,Form,Button} from "react-bootstrap";

export default class Chat extends React.Component{
	constructor(props){
		super(props);

		this.state = {
			isOpen : false,
			loadingOpenChat : false,
			loadingSendMessage : false,
			channel : {},			
			chats : {},			
		}
	}
	
	loadChat(item){
		if(this.state.channel.id === item.id || this.state.loadingOpenChat){
			return false;
		}

		this.setState({
			channel : item,
			loadingOpenChat : true,
			isOpen : true
		});
		
		window.$echo.private('new-message-private-'+item.id)
    	.listen('.NewMessagePrivate'+item.id,(data) => {
    		this.setState(prevState => {    			
    			let newChat = [...prevState.chats.data,...data.message];
    			return {
    				...prevState,
    				chats : {
    					data : newChat.filter((value,index,self) => self.indexOf(value) === index),
    					pagination : prevState.chats.pagination
    				}
    			}
    		});    	     	    	
    	});

		window.$axios.get("api/user/chat/"+item.id)
		.then(res => {
			this.setState({
				chats : {
					data : res.data.data.reverse(),
					pagination : res.data.pagination
				},
				loadingOpenChat : false
			},() => {
				document.getElementById('chatContainer').scrollTo({
					top : document.getElementById('chatContainer').scrollHeight,
					behavior : 'smooth'
				});
			});		
		});	
	}

	componentWillUnmount(){
		window.$echo.leave('new-message-private-'+this.state.channel.id);
	}

	submitMessage(evt){
		evt.preventDefault();		

		if(this.state.loadingSendMessage){
			return false;
		}

		this.setState({
			loadingSendMessage : true
		});

		window.$axios.post("api/user/chat",{
			message : document.getElementById("message").value,
			channel_id : this.state.channel.id
		})
		.then(res => {
			// window.$toastr('success','Berhasil Mengirim Pesan');
			document.getElementById('chatContainer').scrollTo({
				top : document.getElementById('chatContainer').scrollHeight,
				behavior : 'smooth'
			});
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
				loadingSendMessage : false
			})
		});
	}

	renderChat(item,indexItem){
		let className = 'float-right p-2 pl-3 pr-3';

		if(item.sender == "sender"){
			if(this.state.channel.sender_id != this.props.user.id){							
				className = 'float-left p-2 pl-3 pr-3';
			}
		}else{
			if(this.state.channel.accepeter_id != this.props.user.id){
				className = 'float-left p-2 pl-3 pr-3';
			}
		}

		return (		
			<Col bsPrefix="col-12"
				className="clearfix mb-2 p-2"
				key={indexItem}>
				<div style={{background: 'lightgray',borderRadius : '10px'}}													
					className={className}>					
					{item.message}
				</div>
			</Col>						
		)	
	}

	scrollTop(evt){
		if(evt.target.scrollTop === 0){
			if(this.state.chats.pagination.currentPage < this.state.chats.pagination.lastPage){
				window.$axios.get("api/user/chat/"+this.state.channel.id+"?page="+(this.state.chats.pagination.currentPage + 1))
				.then(res => {
				 	this.setState(prevState => ({
				 		...prevState,
					 	chats : {
							data : [...res.data.data.reverse(),...prevState.chats.data],
				 			pagination : res.data.pagination
				 		}				 
					}));				
				});	
			}
		}
	}

	render(){
		return (	
			<Col bsPrefix="col-10"
				className="p-2">
				{!this.state.loadingOpenChat &&
					<>
						{this.state.isOpen && 						
							<Container>
								<Row>
									<Col bsPrefix="col-12"
										className="p-4">
										<Row>
											<Col bsPrefix="col-1" style={{background : 'lightgray',borderRadius : '50%',height : '50px'}}>
											</Col>									
											<Col bsPrefix="col-11"
												className="d-flex flex-column">																					
												<div>
													{this.state.channel.username}
												</div>															
											</Col>
										</Row>
									</Col>

									<Col bsPrefix="col-12">
										<Row 
											style={{maxHeight : '400px',minHeight : '390px',overflowY : 'auto'}}
											id="chatContainer"
											onScroll={() => this.scrollTop(event)}>
											{this.state.chats.data.map((item,indexItem) => this.renderChat(item,indexItem))}																
										</Row>
									</Col>

									<Col bsPrefix="col-12">
										<Form id="sendMessage"
											onSubmit={(event) => this.submitMessage(event)}										
											className="d-flex flex-row">																		
											<div className="w-100 pl-1 pr-1">
												<Form.Control
													id="message"												
													placeholder="Kirim . . ."/>
											</div>

											<div>
												<Button type="submit" variant="primary">
													{this.state.loadingSendMessage ? '...' : 'Kirim'}
												</Button>
											</div>										
										</Form>
									</Col>							
								</Row>
							</Container>											
						}
					</>
				}
			</Col>
		)
	}
}