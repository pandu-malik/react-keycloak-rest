const InitialDataState = {
    menuList:[]
};

const DataReducer = (prevState, action) => {
    switch (action.type) {
        case 'SET_MENU_LIST':
            return {
                ...prevState,
                menuList: action.data,
            };
        case 'CLEAR_DATA':
            return {
                menuList:[]
            };
    }
};

export {InitialDataState, DataReducer};