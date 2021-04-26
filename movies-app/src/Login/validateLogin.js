import { useAuth } from '../contexts/AuthContext'
import React from 'react'




const useLoginValidation = () => {
    const { login } = useAuth()


     function ValidateLogin(values) {
        let errors = {}
        
        errors.username = validateUsername(values.username)
        errors.password = validatePassword(values.password)
       
        const anyErrors = Object.values(errors).some(x => (x !== undefined && x !== ''));

        if(!anyErrors) {
             login(values.username, values.password)
            // errors.form = errorMsg kad poruku vracas
        }
        return errors
    }

    const ValidateInput = (target, value) => {
            if(target === 'username') {
                return validateUsername(value)
            }
            else if (target === 'password') {
                return validatePassword(value)
            }
    }

    function validateUsername(username) {
        if(!username.trim()) {
            return "Username required"
        } else if (username.length < 6) {
            return "Username needs to be 6 characters or more"
        }

    }
    function validatePassword(password) {
        if(!password.trim()) {
            return "Password required"
        } else if (password.length < 6) {
            return "Password needs to be 6 characters or more"
        }
    }

    return {ValidateLogin, ValidateInput}
}


export default useLoginValidation



