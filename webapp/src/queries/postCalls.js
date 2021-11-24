import axios from "axios";

export const userSignUp = (user) => {
    return axios.post('/users', user);
}

export const userLogin = (user) => {
    return axios.post('/login', {} , { auth : user } );
}