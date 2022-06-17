const InitialAuthState = {
    isLoading: true,
    userName: null,
    userToken: null,
    isLogin: false,
};

const AuthReducer = (prevState, action) => {
    switch (action.type) {
        case 'RETRIEVE_TOKEN':
            return {
                ...prevState,
                userName: action.username,
                userToken: action.token,
                isLogin: true,
                isLoading: false,
            };
        case 'REMOVE_LOAD':
            return {
                ...prevState,
                isLoading: false,
            };
        case 'LOGIN':
            console.log("LOGIN REEDUCER CALLED")
            return {
                ...prevState,
                userName: action.username,
                userToken: action.token,
                isLoading: false,
                isLogin: true,
            };
        case 'LOGOUT':
            return {
                ...prevState,
                userName: null,
                userToken: null,
                isLoading: false,
                isLogin: false,
            };
        case 'REGISTER':
            return {
                ...prevState,
                userName: action.id,
                userToken: action.token,
                isLoading: false,
            };
    }
};

export {InitialAuthState, AuthReducer};