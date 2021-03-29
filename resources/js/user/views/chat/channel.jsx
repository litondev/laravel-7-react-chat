import React from "react";
import LoadingChannel from "@/user/components/loading-channel.jsx";
import {Container,Row,Col,Form,Button} from "react-bootstrap";
import "@/library/echo.js";

export default class Channel extends React.Component{
	constructor(props){
		super(props);

		this.state = {
			channel : {},
			isLoadingChannel : true,
			searchChannel : ''
		}
	}

	componentDidMount(){
		window.$echo.private('new-channel-'+this.props.user.id)
    	.listen('.NewChannel'+this.props.user.id, (data) => {
			this.state.searchChannel === '' ? this.onLoadChannel() : window.$toastr("success","Sepertinya ada channel baru")
	    });

	    window.$echo.private('new-message-'+this.props.user.id)
	    .listen('.NewMessage'+this.props.user.id,(data) => {	    	
	    	let channel = this.state.channel.data.find(item => item.id == data.channel.id);
	    	
	    	if(channel){
	    		let channelData = this.state.channel.data.map(item => {	    			
	    			return {
	    				...item,
	    				last_message : item.id == data.channel.id ? data.message.message : item.last_message 
	    			}	    			
	    		});
	    		
	    		this.setState(prevState => {
	    			return {
	    				...prevState,
	    				channel : {
	    					data : channelData,
	    					pagination : prevState.channel.pagination
	    				}
	    			}
	    		});
	    	}else{
	    		this.state.searchChannel === '' ? this.onLoadChannel(false) : '';	    		
	    	}
	    });
    
		this.onLoadChannel();
	}

	componentWillUnmount(){
		window.$echo.leave('new-channel-'+this.props.user.id);
		window.$echo.leave('new-message-'+this.props.user.id);
	}

	scrollBottom(evt){
		if(evt.target.scrollHeight - evt.target.scrollTop === evt.target.clientHeight){
			this.onScrollChannel();
		}
	}

	onScrollChannel(){
		if(this.state.channel.pagination.currentPage < this.state.channel.pagination.lastPage){
			let params = "search="+this.state.searchChannel;
				params += "&page="+(this.state.channel.pagination.currentPage + 1);		

			window.$axios.get("api/user/channel?"+params)
			.then(res => {
				this.setState(prevState => ({					
					 ...prevState,
					channel : {
						data : [...prevState.channel.data,...res.data.data].filter((value,index,self) => self.indexOf(value) === index),
						pagination : res.data.pagination
					}
				}));				
			});	
		}
	}

	onLoadChannel(isNeedLoading = true){
		if(isNeedLoading){
			this.setState({
				isLoadingChannel : true
			});
		}

		window.$axios.get("api/user/channel?search="+this.state.searchChannel)
		.then(res => {
			this.setState({
				isLoadingChannel : false,
				channel : res.data
			});	
		});		
	}

	onSearchChannel(evt){	
		if(evt.keyCode == 13){		
			this.setState({
				searchChannel : evt.target.value
			},() => {
				this.onLoadChannel();
			});
		}
	}

	render(){
		return (	
			<Col bsPrefix="col-2" 
				style={{height : '100vh'}}
				className="p-3">
				<Row className="p-2 pb-3">								
					<Form.Control				 
					 	placeholder="Masukan Channel"
					 	style={{borderRadius : '20px'}}
					 	onKeyUp={() => this.onSearchChannel(event)}/>							
				</Row>

				<Row className="p-2"
					style={{maxHeight : '500px',overflowY: 'auto'}}
					onScroll={() => this.scrollBottom(event)}>													
					{!this.state.isLoadingChannel && 
						<>
						{!this.state.channel.pagination.total && 
							<>
								<Col bsPrefix="col-12">
									Not Found
								</Col>
							</>
						}

						{this.state.channel.data.map(item => 							
								<Col bsPrefix="col-12"									
									key={item.id}
									className="mb-3">
									<Row onClick={() => this.props.openChat(item)}>
										<Col bsPrefix="col-3" style={{background : 'lightgray',borderRadius : '50%',height : '50px'}}></Col>
										<Col bsPrefix="col-9">
											<Row>
												<Col bsPrefix="col-12">
													{item.username}
												</Col>
												<Col bsPrefix="col-12">
													{item.last_message ? item.last_message : 'Belum ada pesan'}
												</Col>
											</Row>
										</Col>
									</Row>
								</Col>																															
							)
						}							
						</>
					}

					{this.state.isLoadingChannel && <LoadingChannel/>}
				</Row>
			</Col>
		)
	}
}