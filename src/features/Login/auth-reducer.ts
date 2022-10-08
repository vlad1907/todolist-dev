import {AppThunk} from '../../app/store';
import {setAppStatusAC} from '../../app/app-reducer';
import {authAPI, LoginParamsType} from '../../api/todolists-api';
import {handleServerAppError, handleServerNetworkError} from '../../utils/error-utils';


const initialState: LoginStateType = {
    isLoggedIn: false
}

export const authReducer = (state = initialState, action: ActionsType): LoginStateType => {
    switch (action.type) {
        case 'login/SET-IS-LOGGED-IN':
            return {...state, isLoggedIn: action.value}
        default:
            return state;
    }
}

// actions
export const setIsLoggedInAC = (value: boolean) =>
    ({type: 'login/SET-IS-LOGGED-IN', value} as const)

// thunks
export const loginTC = (data: LoginParamsType): AppThunk => (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    authAPI.login(data).then(res=>{
        if (res.data.resultCode === 0) {
            dispatch(setIsLoggedInAC(true))
            dispatch(setAppStatusAC('succeeded'))
        } else {
            handleServerAppError(res.data, dispatch)
        }
    }).catch((error) => {
        handleServerNetworkError(error, dispatch)
    })
}
export const logoutTC = (): AppThunk => (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    authAPI.logout().then(res=>{
        if (res.data.resultCode === 0) {
            dispatch(setIsLoggedInAC(false))
            dispatch(setAppStatusAC('succeeded'))
        } else {
            handleServerAppError(res.data, dispatch)
        }
    }).catch((error) => {
        handleServerNetworkError(error, dispatch)
    })
}

// types

type LoginStateType = {
    isLoggedIn: boolean
}

type ActionsType = ReturnType<typeof setIsLoggedInAC>

