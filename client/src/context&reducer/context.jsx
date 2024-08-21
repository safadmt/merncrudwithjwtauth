import {createContext,useContext,useEffect,useReducer} from 'react'
import { initialState, globalReducer } from './reducer';

const GlobalContext = createContext();

function GlobalStateProvider ({children}) {
    const [state, dispatch] = useReducer(globalReducer, initialState)

    return (
        <GlobalContext.Provider value={{state,dispatch}}>
            {children}
        </GlobalContext.Provider>
    )
}
const useGlobalContext = ()=> useContext(GlobalContext)
export {GlobalStateProvider,useGlobalContext}
