import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { UserSignUpPage	} from './UserSignUpPage';
import userEvent from '@testing-library/user-event';

describe('UserSignUpPage', () => {
	
	describe('Rendering', () => {
		
		it('has a Sign up header',() => {
			const { container } = render(<UserSignUpPage />);
			const header = container.querySelector('h1');
			expect(header).toHaveTextContent('Sign Up');
		})

		it('has input form for Name', () =>  {
			const { getByLabelText  } = render(<UserSignUpPage />);
			const nameInput = getByLabelText('Name');
			expect(nameInput).toBeInTheDocument;
		})

		it('has input form for password', () =>  {
			const { getByLabelText  } = render(<UserSignUpPage />);
			const passwordInput = getByLabelText('Password');
			expect(passwordInput).toBeInTheDocument;
		})

		it('has input form for confirm password', () =>  {
			const { getByLabelText  } = render(<UserSignUpPage />);
			const ConfirmPasswordInput = getByLabelText('ConfirmPassword');
			expect(ConfirmPasswordInput).toBeInTheDocument;
		})

		it('has password type in password input forms', () =>  {
			const { getByLabelText  } = render(<UserSignUpPage />);
			const passwordInput = getByLabelText('Password');
			expect(passwordInput.type).toBe('password');			
		})

		it('has password type in confirm password input forms', () =>  {
			const { getByLabelText  } = render(<UserSignUpPage />);
			const ConfirmPasswordInput = getByLabelText('Password');
			expect(ConfirmPasswordInput.type).toBe('password');			
		})

		it('has a submit button ', () =>  {
			const { getByRole  } = render(<UserSignUpPage />);
			const submitButton = getByRole('button', { name : /Sign up/i});
			expect(submitButton).toBeInTheDocument;
		})	
	})

	describe('Events', () => {
		it('sets the name value', () => {
			const { getByLabelText  } = render(<UserSignUpPage />);
			const nameInput = getByLabelText('Name');
			userEvent.type(nameInput, "username");
			expect(nameInput).toHaveValue("username");
		})

		it('sets the password value', () =>  {
			const { getByLabelText  } = render(<UserSignUpPage />);
			const passwordInput = getByLabelText('Password');
			userEvent.type(passwordInput, "P4sword1");
			expect(passwordInput).toHaveValue("P4sword1");
		})

		it('sets the confirmpassword value', () =>  {
			const { getByLabelText  } = render(<UserSignUpPage />);
			const ConfirmPasswordInput = getByLabelText('ConfirmPassword');
			userEvent.type(ConfirmPasswordInput, "P4sword1");
			expect(ConfirmPasswordInput).toHaveValue("P4sword1");
		})

		it('creates post request when fields are valid ', () =>  {
			
			const actions = {
				postSignUp: jest.fn().mockResolvedValueOnce({})
			};
			
			const { getByLabelText , getByRole } =
				 render(<UserSignUpPage actions={actions}/>);	
					
			const nameInput = getByLabelText('Name');
			const passwordInput = getByLabelText('Password');
			const confirmPasswordInput = getByLabelText('ConfirmPassword');
			const submitButton = getByRole('button', { name : /Sign up/i});
		
			userEvent.type(nameInput, "username");
			userEvent.type(passwordInput, "P4sword1");
			userEvent.type(confirmPasswordInput, "P4sword1");
			userEvent.click(submitButton);		
		
			expect(actions.postSignUp).toHaveBeenCalledTimes(1);
		})

	
		

	})


})