import axios from 'axios'
import {AUTH_START, AUTH_FAILURE, AUTH_LOGOUT, AUTH_SUCCESS} from "./actionTypes"

// Action creators
export const authStart = () =>{
    return {
        type: AUTH_START
    }
}

// Passing token as well
export const authSuccess = (token) => {
    return {
        type: AUTH_SUCCESS,
        token: token
    }
}

// Passing in error
export const authFailure = (error) => {
    return {
        type: AUTH_FAILURE,
        error: error
    }
}

// Removing token and expiration date
export const authLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("Expiratation date")
    return {
        type: AUTH_LOGOUT
    }

}

// Function for setting a timeout according to given expiration time
export const checkAuth = (expiration) =>{
    return dispatch => {
        setTimeout(()=> {
            dispatch(authLogout())
        }, expiration * 1000)
    }
} 

// Function for checking if the user token exists and if the expiration date is over or not
export const checkAuthState = () => {
    return dispatch => {
        const token = localStorage.getItem("token")
        if (token === null){
            dispatch(authLogout())
        } else {
            const expiration_date = new Date(localStorage.getItem("Expiration date"))
            if (expiration_date <= new Date()) {
                dispatch(authLogout())
            } else {
                dispatch(authSuccess(token))
                checkAuth((expiration_date.getTime() - new Date().getTime()) / 1000 )
            }
        }
    }
}

// Asunc action for logging in
export const authLogin = (username, password) => {
    return dispatch => {

        dispatch(authStart())
        // API call, passing in username and password
        axios.post("http://127.0.0.1:8000/api/rest-auth/login/", {
            username: username,
            password: password
        })
        .then(response => {

            // Creating local storage items for user
            const expiration_date = new Date(new Date().getTime() + (3600 * 1000))
            localStorage.setItem("token", response.data.key)
            localStorage.setItem("Expiration date", expiration_date)

            // Sends success dispatch with token and sets up timeout with checkAuth
            dispatch(authSuccess(response.data.key))
            dispatch(checkAuth(3600))
        })
        .catch(error => {
            // Sends success dispatch with token
            dispatch(authFailure(error.response.data))

        })
    }
}

// Asunc action for Registering
export const authRegister = (username, email, password1, password2) => {
    return dispatch => {
        dispatch(authStart())
        // API call, sending in username, email and passwords
        axios.post("http://127.0.0.1:8000/api/rest-auth/registration/", {
            username: username,
            email: email,
            password1: password1,
            password2: password2
        })
        .then(response => {
            // Creating local storage items for user
            const expiration_date = new Date(new Date().getTime() + (3600 * 1000))
            localStorage.setItem("token", response.data.key)
            localStorage.setItem("Expiration date", expiration_date)

            // Sends success dispatch with token and sets up timeout with checkAuth
            dispatch(authSuccess(response.data.key))
            dispatch(checkAuth(3600))
        })
        .catch(error => {
            dispatch(authFailure(error))

        })
    }
    
}


