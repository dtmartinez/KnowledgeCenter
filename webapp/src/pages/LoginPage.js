import React, { useState , useEffect} from "react";
import { render } from "react-dom";

export  const LoginPage = (props) => {

    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [responseErrors, setResponseErrors] = useState();

    const onChangeName = (event) => {
        setName(event.target.value);
    };

    const onChangePassword = (event) => {
        setPassword(event.target.value);
    };

    useEffect(() => {
        setResponseErrors();
      }, [name, password]);

    const onClickLogin = () => {

        const user = {
            name : name,
            password : password
        }

        props.actions.postLogin(user)        
        .catch( (error) => {
            if ( error.response)
                setResponseErrors(error.response.data.error);
        });
    }
    
    return (        
        <div className = "container">
            <h1 className = "text-center">
                Login
            </h1>


            <div>
                { responseErrors && (
                    <div className = "col-12 alert alert-danger">
                        {responseErrors}
                    </div>
                )}
            </div>
            <div className = "col-12">
                <label className = "col-12">
                    Name
                    <input type="text" className="form-control" value = {name} onChange = {onChangeName}/>
                </label>
                </div>

                <div className = "col-12">
                <label className = "col-12">
                    Password
                    <input type="password" className="form-control" value = {password} onChange = {onChangePassword}/>
                </label>
                </div>

            <div className = "text-center">                    
                <button className="btn btn-primary" onClick = {onClickLogin} disabled = {!name || !password} >Log In</button>            
            </div>

        </div> 
    );
    
}

LoginPage.defaultProps = {
    actions : {
        postLogin : () => new Promise( (resolve,reject)  => resolve({}) )
    }
}

export default LoginPage;