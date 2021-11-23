import React from 'react';
import { render , waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { LoginPage	} from './LoginPage';
import userEvent from '@testing-library/user-event';

describe('LoginPage' , () => {

    let nameInput, passwordInput, loginButton;

	const renderPage = (props) => {
		const LoginRender = render(<LoginPage {...props}/>);	
		const { getByLabelText , getByRole } = LoginRender;		
		nameInput = getByLabelText(/name/i);
		passwordInput = getByLabelText(/password/i);		
		loginButton = getByRole('button', { name : /Log in/i});	
		return LoginRender;
	}

	function typeUserDataInForm() {
		userEvent.type(nameInput, "test-user");
		userEvent.type(passwordInput, "Password1");		
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
    
    describe('Rendering' , () => {

        it('has a Login header', () => {
            const { container } = render(<LoginPage />);
            const header = container.querySelector('h1');
            expect(header).toHaveTextContent(/login/i);
        })

        it('has a user name input', () => {
            renderPage();
            expect(nameInput).toBeInTheDocument();
        })

        it('has a user password input', () => {
            renderPage();
            expect(passwordInput).toBeInTheDocument();
        })

        it('has password type on password input', () => {
            renderPage();
            expect(passwordInput.type).toBe('password');
        })

        it('has a user submit button', () => {
            renderPage();
            expect(loginButton).toBeInTheDocument();
        })

    })

    describe('Events' , () => {

        it('sets name input value', () => {
            renderPage();
            userEvent.type(nameInput, "test-user");
            expect(nameInput).toHaveValue("test-user");
        })

        it('sets name input value', () => {
            renderPage();
            userEvent.type(passwordInput, "Password1")
            expect(passwordInput).toHaveValue("Password1");
        })

        it('calls post login on login button click', () => {
            const actions = {
                postLogin : jest.fn().mockResolvedValue({})
            };
            renderPage({actions});
            typeUserDataInForm();
            userEvent.click(loginButton);
            expect(actions.postLogin).toHaveBeenCalledTimes(1);
        })
        
        it('does not throw exception on login button click with no actions', () => {
           
            renderPage();
            expect(() => {userEvent.click(loginButton)}).not.toThrow();
        })

        it('calls post login with user object', () => {
            const actions = {
                postLogin : jest.fn().mockResolvedValue({})
            };
            renderPage({actions});
            typeUserDataInForm();
            userEvent.click(loginButton);

            const user = {
                name : "test-user",
                password : "Password1"
            }

            expect(actions.postLogin).toHaveBeenCalledWith(user);
        })

        it('disables login button with empty name', () => {            
            renderPage(); 
            expect(loginButton).toBeDisabled();
        })

        it('disables login button with empty password', () => {            
            renderPage(); 
            userEvent.type(nameInput, "user")
            expect(loginButton).toBeDisabled();
        })

        it('shows error message on login fail', async () => {
            const actions = {
                postLogin : mockErrorResponseWith("name: Name can not be empty")
            };
            const { getByText } = renderPage({actions});
            typeUserDataInForm();
            userEvent.click(loginButton);            
            await waitFor(()=> expect(actions.postLogin).toHaveBeenCalledTimes(1));
			const errorMessage = getByText(/name can not be empty/i);			
			expect(errorMessage).toBeInTheDocument();   
        })

        it('removes error message when name changes', async () => {
            const actions = {
                postLogin : mockErrorResponseWith("name: Name can not be empty")
            };
            const { queryByText } = renderPage({actions});
            typeUserDataInForm();
            userEvent.click(loginButton);            
            await waitFor(()=> expect(actions.postLogin).toHaveBeenCalledTimes(1));
            userEvent.type(nameInput, "test-name");
			const errorMessage = queryByText(/name can not be empty/i);			
			expect(errorMessage).not.toBeInTheDocument();   
        })

        it('removes error message when passsword changes', async () => {
            const actions = {
                postLogin : mockErrorResponseWith("name: Name can not be empty")
            };
            const { queryByText } = renderPage({actions});
            typeUserDataInForm();
            userEvent.click(loginButton);            
            await waitFor(()=> expect(actions.postLogin).toHaveBeenCalledTimes(1));
            userEvent.type(passwordInput, "Password2");
			const errorMessage = queryByText(/name can not be empty/i);			
			expect(errorMessage).not.toBeInTheDocument();   
        })

        

        







    })
})
