import axios from "axios";
import { userSignUp , userLogin} from './postCalls';

describe('postCalls' , () => {
    describe('userSignUp' , () => {
        it ('calls /users' , async () => {
            const userSignUpMock = jest.fn();
            axios.post = userSignUpMock;
            userSignUp();
            /*First parameter of the first call in the history*/
            const path = userSignUpMock.mock.calls[0][0];
            expect(path).toBe("/users");            
        })
    })

    describe('userLogin' , () => {
        it ('calls /login' , async () => {
            const userLoginMock = jest.fn();
            axios.post = userLoginMock;
            userLogin();
            /*First parameter of the first call in the history*/
            const path = userLoginMock.mock.calls[0][0];
            expect(path).toBe("/login");            
        })
    })
})