import axios from "axios";

export const userSignUp = (user) => {
    return axios.post('/users', user);
}