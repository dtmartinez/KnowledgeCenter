import React from 'react';

export class UserSignUpPage extends React.Component {
	render(){
		return(<div>
			<h1>Sign Up</h1>
			<div>
				<label for = "Name">Name</label>
				<input id = "Name"></input>
			</div>
			<div>
				<label for = "Password">Password</label>
				<input id = "Password" type = "password"></input>
			</div>
			<div>
				<label for = "ConfirmPassword">ConfirmPassword</label>
				<input id = "ConfirmPassword" type = "password"></input>
			</div>	
			<div>
				<button name = 'submit'>Sign up</button>
			</div>		
		</div>);
	}
	
	
}

export default UserSignUpPage;