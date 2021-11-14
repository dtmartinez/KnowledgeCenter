import React from 'react';

export class UserSignUpPage extends React.Component {

	state = {
		name : '',
		password : '',
		confirmPassword : '',
		waitingForApiResponse : false,
		responseErrors : {},
		matchingPasswords : true
	};

	handleFormChange = (event) => {		
		const value = event.target.value;
		const id = event.target.id;
		this.setState({[id] : value });				
	}

	handleConfirmPassword = async (event) => {
		await this.handleFormChange(event);
		
		const errors = {...this.state.responseErrors};
		if (this.state.password && ( this.state.password === this.state.confirmPassword)){			
			this.setState({ matchingPasswords : true });
			this.setState({responseErrors : ""});
		}else{
			errors.passwordDoesNotMatch = 'Password does not match';
			this.setState({responseErrors : errors});
			this.setState({ matchingPasswords : false });
		}

		
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
						onChange={this.handleConfirmPassword}
						type = "password">
					</input>
					<div className="invalid-feedback">{this.state.responseErrors.password}</div>

				</label>
				
			</div>
			<div>
				<label>
					ConfirmPassword
					<input id = "confirmPassword"
						value={this.state.confirmPassword} 
						onChange={this.handleConfirmPassword}
						type = "password">						
					</input>
					<div className="invalid-feedback">{this.state.responseErrors.passwordDoesNotMatch}</div>
				</label>				
			</div>	
			<div>
				<button 
					onClick = {this.handleOnClickSignUp}
					disabled = {this.state.waitingForApiResponse
					 || !this.state.matchingPasswords} >
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