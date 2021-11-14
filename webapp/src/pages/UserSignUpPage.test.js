import React from 'react';
import { render , waitFor } from '@testing-library/react';
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

	function mockErrorResponseWith(errorMessage) {
		return jest.fn().mockImplementation(() => {
			setTimeout(300);
	
			return Promise.reject({
				response: {
					data: {
						error: [errorMessage,]
					}
				}
			});
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
			expect(submitButton).toBeInTheDocument();
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

		it('enables submitButton when password and confirmPassword are the same', () => {
			setup();
			typeUserDataInForm();
			expect(submitButton).toBeEnabled();
		})

		it('disables submitButton when password is empty', async () => {
			setup();
			await userEvent.type(confirmPasswordInput, "passwordInput");					
			expect(submitButton).toBeDisabled();
		})

		it('disables submitButton when password and confirmPassword are different', async () => {
			setup();
			typeUserDataInForm();
			await userEvent.type(confirmPasswordInput, "P4sword2")
			expect(submitButton).toBeDisabled();
		})

		it('disables submitButton when confirmPassword and password are different', async () => {
			setup();
			typeUserDataInForm();
			await userEvent.type(passwordInput, "P4sword2")
			expect(submitButton).toBeDisabled();
		})

		it('creates post request when fields are valid', () =>  {
				
			const actions = {
				postSignUp: jest.fn().mockResolvedValueOnce({})
			};

			setup({ actions });
			typeUserDataInForm();
			userEvent.click(submitButton);
		
			expect(actions.postSignUp).toHaveBeenCalledTimes(1);
		})

		it('creates a post request with json user when fields are valid', () =>  {
				
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

		it('blocks sending new post request when waiting for a post response', () =>  {
				
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

		it('displays loading spinner when waiting for a post response', () =>  {
				
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
		
		it('deactivates spinner after post request sucess', async () =>  {
				
			const actions = {
				postSignUp: mockResponseDelay()
			};

			const { queryByRole } = setup({ actions });						
			typeUserDataInForm();			
			userEvent.click(submitButton);
			await waitFor(()=> expect(actions.postSignUp).toHaveBeenCalledTimes(1));						
			expect(queryByRole('status')).toBeNull();
			expect(submitButton).toBeEnabled;
		})
		
		it('deactivates spinner after post request fail', async () =>  {
				
			const actions = {
				postSignUp: jest.fn().mockImplementation(() => {
					setTimeout(300);
					return Promise.reject({ response : { data : {} } });
				})
			};

			const { queryByRole } = setup({ actions });						
			typeUserDataInForm();			
			userEvent.click(submitButton);
			await waitFor(()=> expect(actions.postSignUp).toHaveBeenCalledTimes(1));						
			expect(queryByRole('status')).toBeNull();
			expect(submitButton).toBeEnabled;
		})

		it('displays name validation errors', async () => {
			const actions = {
				postSignUp: mockErrorResponseWith("name: Name can not be empty")
			};			
			const { getByText } = setup({ actions });
			typeUserDataInForm();						
			userEvent.click(submitButton);
			await waitFor(()=> expect(actions.postSignUp).toHaveBeenCalledTimes(1));
			const errorMessage = getByText(/name can not be empty/i);			
			expect(errorMessage).toBeInTheDocument();
		})

		it('displays password validation errors', async () => {
			const actions = {
				postSignUp: mockErrorResponseWith("password: Password can not be empty")
			};
			const { getByText } = setup({ actions });
			typeUserDataInForm();					
			userEvent.click(submitButton);
			await waitFor(()=> expect(actions.postSignUp).toHaveBeenCalledTimes(1));
			const errorMessage = getByText(/password can not be empty/i);			
			expect(errorMessage).toBeInTheDocument();
		})

		it('displays confirm password error when it is not the same as password', async ()=> {
			const { getByText } = setup();
			typeUserDataInForm();
			await userEvent.type(confirmPasswordInput, "n0tTheSame");
			const errorMessage = getByText(/password does not match/i);			
			expect(errorMessage).toBeInTheDocument();
		})

		it('removes confirm password error when it is the same as password', async ()=> {
			const { queryByText } = setup();
			typeUserDataInForm();
			await userEvent.type(confirmPasswordInput, "newP4sword");
			await userEvent.type(passwordInput, "newP4sword");
			const errorMessage = queryByText(/password does not match/i);			
			expect(errorMessage).toBeNull();
		})
	})
})






