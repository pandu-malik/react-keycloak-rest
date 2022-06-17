import React, {useState} from "react";
import {KEYCLOAK} from "../../Constant";
import {AuthContext, DataContext} from "../../Context";

const LoginPage = () => {
    const [authContext, authState] = React.useContext(AuthContext);
    const [state, setState] = useState({
        username: '',
        password: ''
    })
    const login = () => {
        console.log("login called")
        const qs = require('query-string');
        const reqBody = qs.stringify({
            client_id: KEYCLOAK.CLIENT_ID,
            client_secret: KEYCLOAK.CLIENT_SECRET,
            grant_type: 'password',
            username: state.username,
            password: state.password,
        });

        fetch(KEYCLOAK.LOGIN_URL, {
            method: 'POST',
            headers: {
                'Content-type': 'application/x-www-form-urlencoded',
            },
            body: reqBody
        }).then(response => {
            response.json().then(result => {
                setState({
                    ...state,
                    access_token: result.access_token
                })
                authContext.signIn(state.username, result.access_token);
            })
        });
    }

    return (
        <div className={"login_container"}>
            <form className={"login_form_container"} onSubmit={(e) => {
                e.preventDefault();
                login();
            }}>
                <label className="login_form_label">
                    Your username<br/>
                    <input className="login_input" type="string"
                           onChange={(text) => {
                               setState({...state, username: text.currentTarget.value});
                           }}
                           value={state.username}/>
                </label>
                <label className="login_form_label">
                    Your password<br/>
                    <input className="login_input" type="password"
                           onChange={(text) => {
                               setState({...state, password: text.currentTarget.value});
                           }}/>
                </label>
                <input className="login-input-submit" type="submit" value="Login"/>
            </form>
        </div>
    )

}

export default LoginPage;