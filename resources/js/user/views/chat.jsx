import React from "react";
import {Redirect} from "react-router-dom";
import {Container,Row,Col,Form,Button} from "react-bootstrap";
import Main from "@/user/layouts/main.jsx";
import OpenChat from "@/user/views/chat/chat.jsx";
import Channel from "@/user/views/chat/channel.jsx";

export default class Chat extends React.Component{
	constructor(props){
		super(props);

		document.title = "Chat";

		this.refOpenChat = React.createRef();
	}	

	render(){		
		if(!this.props.user){
			return <Redirect to="/signin"/>
		}

		return(
			<Main {...this.props}>
				<$ToastContainer/>

				<Container fluid>
					<Row>
						<Channel {...this.props} openChat={(item) => this.refOpenChat.current.loadChat(item)} />						
						<OpenChat {...this.props} ref={this.refOpenChat}/>
					</Row>
				</Container>
			</Main>
		)
	}
}