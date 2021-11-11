import axios from "axios";
import * as postCalls from './postCalls';

describe('postCalls' , () => {
    describe('userSignUp' , () => {
        it ('calls /users' , async () => {
            const userSignUpMock = jest.fn();
            axios.post = userSignUpMock;
            postCalls.userSignUp();
            /*First parameter of the first call in the history*/
            const path = userSignUpMock.mock.calls[0][0];
            expect(path).toBe("/users");
            
        })
    })
})