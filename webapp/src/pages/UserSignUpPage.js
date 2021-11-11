import React from 'react';

export class UserSignUpPage extends React.Component {

	state = {
		name : '',
		password : '',
		confirmPassword : ''
	};

	handleNameChange = (event) => {		
		const value = event.target.value;
		this.setState({name : value });
	}
	handlePasswordChange = (event) => {		
		const value = event.target.value;
		this.setState({password : value });
	}
	handleConfirmPasswordChange = (event) => {		
		const value = event.target.value;
		this.setState({confirmPassword : value });
	}

	handleOnClickSignUp = (event) => {		
		this.props.actions.postSignUp();
	}

	render(){
		return(<div>
			<h1>Sign Up</h1>
			<div>
				<label>
					Name
					<input id = "Name"  
					value={this.state.name}  
					onChange={this.handleNameChange}></input>
				</label>				
			</div>
			<div>
				<label>
					Password
					<input id = "Password"
					value={this.state.password} 
					onChange={this.handlePasswordChange}
					type = "password"></input>
				</label>
				
			</div>
			<div>
				<label>
					ConfirmPassword
					<input id = "ConfirmPassword"
					value={this.state.confirmPassword} 
					onChange={this.handleConfirmPasswordChange}
					type = "password"></input>
				</label>				
			</div>	
			<div>
				<button 
					onClick= {this.handleOnClickSignUp}>
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