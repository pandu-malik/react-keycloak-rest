import {KEYCLOAK} from "../Constant";

const login = () => {
    const qs = require('query-string');
    const reqBody = qs.stringify({
        client_id: 'new-insurance',
        client_secret: 'SxanbWIuOJS2nVRQqoNgSy7jTyUFJx7S',
        grant_type: 'password',
        username: 'pandumalik',
        password: 'password',
    });

    return fetch(KEYCLOAK.LOGIN_URL, {
        method: 'POST',
        headers: {
            'Content-type': 'application/x-www-form-urlencoded',
        },
        body: reqBody
    }).then(response => {
        response.json().then(result => {
            return result.access_token;
        })
    });
}

// const getMenu = (token) => {
//     const params = new URLSearchParams();
//     fetch(KEYCLOAK.LOGIN_URL, {
//         method: 'POST',
//         headers: {
//             'Accept': 'application/x-www-form-urlencoded'
//         },
//         body: {}
//     })
// }

export {login};