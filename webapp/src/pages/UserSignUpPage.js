import React from 'react';

export class UserSignUpPage extends React.Component {

	state = {
		name : '',
		password : '',
		confirmPassword : ''
	};

	handleFormChange = (event) => {		
		const value = event.target.value;
		const id = event.target.id;
		this.setState({[id] : value });
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
					<input id = "name"  
					value={this.state.name}  
					onChange={this.handleFormChange}></input>
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