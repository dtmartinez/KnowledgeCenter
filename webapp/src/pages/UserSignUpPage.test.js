import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { UserSignUpPage	} from './UserSignUpPage';

describe('UserSignUpPage', () => {
	
	describe('Layout', () => {
		
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


})