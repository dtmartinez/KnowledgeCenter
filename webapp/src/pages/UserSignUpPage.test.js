import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { UserSignUpPage	} from './UserSignUpPage';
import userEvent from '@testing-library/user-event';

describe('UserSignUpPage', () => {

	let nameInput, passwordInput, confirmPasswordInput, submitButton;

	const setup = (props) => {
		const UserSignUpRender = render(<UserSignUpPage {...props}/>);	
		const { getByLabelText , getByRole } = UserSignUpRender;		
		nameInput = getByLabelText('Name');
		passwordInput = getByLabelText('Password');
		confirmPasswordInput = getByLabelText('ConfirmPassword');
		submitButton = getByRole('button', { name : /Sign up/i});	
		return UserSignUpRender;
	}

	function typeUserDataInForm() {
		userEvent.type(nameInput, "username");
		userEvent.type(passwordInput, "P4sword1");
		userEvent.type(confirmPasswordInput, "P4sword1");
	}

	function mockResponseDelay() {
		return jest.fn().mockImplementation(() => {
			setTimeout(300);
			return Promise.resolve();
		});
	}
	
	describe('Rendering', () => {
		
		it('has a Sign up header',() => {
			const { container } = render(<UserSignUpPage />);
			const header = container.querySelector('h1');
			expect(header).toHaveTextContent('Sign Up');
		})

		it('has input form for Name', () =>  {
			setup();
			expect(nameInput).toBeInTheDocument;
		})

		it('has input form for password', () =>  {
			setup();
			expect(passwordInput).toBeInTheDocument;
		})

		it('has input form for confirm password', () =>  {
			setup();
			expect(confirmPasswordInput).toBeInTheDocument;
		})

		it('has password type in password input forms', () =>  {
			setup();
			expect(passwordInput.type).toBe('password');			
		})

		it('has password type in confirm password input forms', () =>  {
			setup();
			expect(confirmPasswordInput.type).toBe('password');			
		})

		it('has a submit button ', () =>  {
			setup();
			expect(submitButton).toBeInTheDocument;
		})	
	})

	describe('Events', () => {
		it('sets the name value', () => {
			setup();
			userEvent.type(nameInput, "username");
			expect(nameInput).toHaveValue("username");
		})

		it('sets the password value', () =>  {
			setup();
			userEvent.type(passwordInput, "P4sword1");
			expect(passwordInput).toHaveValue("P4sword1");
		})

		it('sets the confirmpassword value', () =>  {
			setup();
			userEvent.type(confirmPasswordInput, "P4sword1");
			expect(confirmPasswordInput).toHaveValue("P4sword1");
		})

		it('when fields are valid creates post request ', () =>  {
				
			const actions = {
				postSignUp: jest.fn().mockResolvedValueOnce({})
			};

			setup({ actions });
			typeUserDataInForm();
			userEvent.click(submitButton);
		
			expect(actions.postSignUp).toHaveBeenCalledTimes(1);
		})

		it('when fields are valid creates a post request with json user', () =>  {
				
			const actions = {
				postSignUp: jest.fn().mockResolvedValueOnce({})
			};

			setup({ actions });
			typeUserDataInForm();
			userEvent.click(submitButton);
			
			const userJson = {
				name : "username",
				password : "P4sword1"
			}
		
			expect(actions.postSignUp).toHaveBeenCalledWith(userJson);
		})

		it('when waiting for a post response you can not send new post request', () =>  {
				
			const actions = {
				postSignUp: mockResponseDelay()
			};

			setup({ actions });						
			typeUserDataInForm();
			userEvent.click(submitButton);
			userEvent.click(submitButton);		
			expect(actions.postSignUp).toHaveBeenCalledTimes(1);
			expect(submitButton).toBeDisabled();
		})

		it('when waiting for a post response displays loading spinner', () =>  {
				
			const actions = {
				postSignUp: mockResponseDelay()
			};

			const { getByRole , queryByRole } = setup({ actions });						
			typeUserDataInForm();
			expect(queryByRole('status')).toBeNull();
			userEvent.click(submitButton);
			userEvent.click(submitButton);
			const spinner = getByRole('status');			
			expect(spinner).toBe;
		})	
		
		

	})


})




