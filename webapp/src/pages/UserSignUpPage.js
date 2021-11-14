import React from 'react';

export class UserSignUpPage extends React.Component {

	state = {
		name : '',
		password : '',
		confirmPassword : '',
		waitingForApiResponse : false,
		responseErrors : {}
	};

	handleFormChange = (event) => {		
		const value = event.target.value;
		const id = event.target.id;
		this.setState({[id] : value });
	}

	handleOnClickSignUp = (event) => {	
		const user = {
			name : this.state.name,
			password : this.state.password
		}
		
		this.setState({waitingForApiResponse : true})
		if ( !this.state.waitingForApiResponse )
			this.props.actions.postSignUp(user)
			.then((response) => {
				this.setState({waitingForApiResponse : false});
			})
			.catch((error) => {
				let errors = {...this.state.responseErrors};
								
				if ( error.response.data && error.response.data.error)
					errors = {...Object.fromEntries(error.response.data.error.map(e => e.split(":")))};				
				
				this.setState({waitingForApiResponse : false});
				this.setState({ responseErrors : errors });
			});
	}

	render(){
		return(<div>
			<h1>Sign Up</h1>
			<div>
				<label>
					Name
					<input id = "name"  
						value={this.state.name}  
						onChange={this.handleFormChange}>						
					</input>
					<div className="invalid-feedback">{this.state.responseErrors.name}</div>

				</label>				
			</div>
			<div>
				<label>
					Password
					<input id = "password"
					value={this.state.password} 
					onChange={this.handleFormChange}
					type = "password"></input>
				</label>
				
			</div>
			<div>
				<label>
					ConfirmPassword
					<input id = "confirmPassword"
					value={this.state.confirmPassword} 
					onChange={this.handleFormChange}
					type = "password"></input>
				</label>				
			</div>	
			<div>
				<button 
					onClick = {this.handleOnClickSignUp}
					disabled = {this.state.waitingForApiResponse} >
					{this.state.waitingForApiResponse && (<div className="spinner-border" role="status">
  						<span className="sr-only">Loading...</span>
						</div>)}
					Sign up
				</button>			
			</div>
					
		</div>);
	}
	
	
}

UserSignUpPage.defaultProps = {
	actions : {
		postSignUp : () => new Promise((resolve, reject) => {
			resolve({});
		})
	}
}

export default UserSignUpPage;