module.exports.ValidateRegisterInput = (email, username, password, confirmpassword)=>{
    const errors = {}

    if (username.trim() == "" ) {
        errors.username = "username field must not be left empty"
    }

    if (email.trim() == "") {
        errors.email = "email field must not be left empty"
    } else {
        const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        if (!email.match(regex)) {
            errors.email = "email does not match the correct format of an email"
        }
    }

    if (password === "") {
        errors.password = "password file must not be left empty"
    } else if (password !== confirmpassword) {
        errors.confirmpassword = "passwords do not match"
    }

    return {
        errors, 
        valid: Object.keys(errors).length < 1
    }
}