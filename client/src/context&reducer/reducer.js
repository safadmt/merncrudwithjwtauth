const initialState = {
    is_login_or_regiser : true,
    isShowAuthSidebar : false,
    user : JSON.parse(localStorage.getItem('user')) || {},
    
}


function globalReducer(state,action) {
    switch (action.type) {
        case "set_login_register": {
            return {
                ...state,
                is_login_or_regiser : action.payload
            }
        } 
        case "set_auth_sidebar" : {
            return {
                ...state,
                isShowAuthSidebar : action.payload
            }
        }
        case "set_user": {
            if(!action.payload) {
                localStorage.removeItem('user')
            }else{
                localStorage.setItem('user', JSON.stringify(action.payload))
            }
            
            return {
                ...state,
                user : {...action.payload}
            }
        }
        
        default:
            return state
            
    }
}

export {initialState, globalReducer}
