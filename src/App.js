import './App.css';
import React, {useEffect, useReducer} from "react";
import {AuthReducer, InitialAuthState} from "./reducer/AuthReducer";
import {DataReducer, InitialDataState} from "./reducer/DataReducer";
import {KEYCLOAK} from "./Constant";
import HomeScreen from "./screen/HomeScreen";
import {AuthContext, DataContext} from "./Context";


import {Route, Routes} from "react-router-dom";
import LoginPage from "./screen/auth/LoginPage";
import keycloak_resource from "./config/keycoak-resource.json";

function App() {
    const [authState, authDispatch] = useReducer(AuthReducer, InitialAuthState,);
    const authFunc = React.useMemo(() => ({
        signIn: async (username, token) => {
            try {
                await localStorage.setItem('userName', username);
                await localStorage.setItem('userToken', token);
            } catch (e) {
                console.log(e);
            }
            authDispatch({type: 'LOGIN', username: username, token: token});
        }, signOut: async () => {
            try {
                await localStorage.removeItem('userName');
                await localStorage.removeItem('userToken');
            } catch (e) {
                console.log(e);
            }
            authDispatch({type: 'LOGOUT'});
        },
    }), [],);

    const [dataState, dataDispatch] = useReducer(DataReducer, InitialDataState,);
    const dataFunc = React.useMemo(() => ({
        setBookingOrder: (bookingOrder) => {
            dataDispatch({type: 'SET_BOOKING_ORDER', data: bookingOrder});
        }, clearData: () => {
            dataDispatch({type: 'CLEAR_DATA'});
        },
    }), [],);

    // APP CONTOLLER
    useEffect(() => {
        let userToken;
        let userName;

        userToken = null;
        userName = null;
        try {
            userToken = localStorage.getItem('userToken');
            userName = localStorage.getItem('userName');
        } catch (e) {
            console.log(e);
        }

        checkToken(userToken, userName);
    }, []);


    function checkToken(token, username) {
        fetch(KEYCLOAK.SESSION_CHECK, {
            method: 'GET', headers: {
                'Content-type': 'application/x-www-form-urlencoded', 'Authorization': `bearer ${token}`,
            },
        }).then(
            (response) => {
                response.json()
                    .then((res) => {
                        if (response.status === 200) {
                            authDispatch({
                                type: 'RETRIEVE_TOKEN', token: token, username: username,
                            });
                        } else {
                            alert("Invalid token, please login")
                        }
                    })
            }
        ).catch((err) => {
            console.log(err)
        });
    }

    function getMenuAllowed() {
        const qs = require('query-string');
        const list_resource = keycloak_resource.resources
        let list_allowed_resource = [];
        list_resource.forEach((resource) => {
            const reqBody = qs.stringify({
                grant_type: 'urn:ietf:params:oauth:grant-type:uma-ticket',
                audience: KEYCLOAK.CLIENT_ID,
                permission: resource.name,
                response_mode: 'decision'
            });

            fetch(`${KEYCLOAK.GET_RESOURCE_ACCESS}`, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/x-www-form-urlencoded',
                    'Authorization': `bearer ${authState.userToken}`,
                },
                body: reqBody
            }).then(response => {
                response.json().then(result => {
                    if (result.result) {
                        list_allowed_resource.push(resource.name)
                        dataDispatch({
                            type: 'SET_MENU_LIST', data: [...list_allowed_resource]
                        })
                    }
                })
            }).catch((err) => {
                console.log(err)
            });
        })
    }

    if (authState.isLogin) {

        getMenuAllowed();

        return (
            <div>
                <AuthContext.Provider value={[authFunc, authState]}>
                    <DataContext.Provider value={[dataFunc, dataState]}>
                        <Routes>
                            <Route path="/home" element={<HomeScreen/>}/>
                            <Route path="/" element={<HomeScreen/>}/>
                        </Routes>
                    </DataContext.Provider>
                </AuthContext.Provider>
            </div>
        )
    }

    return (
        <div className="App">
            <AuthContext.Provider value={[authFunc, authState]}>
                <DataContext.Provider value={[dataFunc, dataState]}>
                    <LoginPage/>
                </DataContext.Provider>
            </AuthContext.Provider>
        </div>);
}

export default App;
