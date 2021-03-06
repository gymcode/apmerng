module.exports.ValidateRegisterInput = (username, email, password, confirmpassword)=>{
    const errors = {}

    if (username.trim() == "" ) {
        errors.username = "username field must not be left empty"
    }

    if (email.trim() == "") {
        errors.email = "email field must not be left empty"
    } else {
        const regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
        console.log(regex)
        if (!email.match(regex)) {
            errors.email = "email must be a valid email"
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

module.exports.ValidateLoginInput = (email, password)=>{
    const errors = {}

    if (email.trim() == "") {
        errors.email = "email field must not be left empty"
    }

    if (password === "") {
        errors.email = "email field must not be left empty"
    }

    return {
        errors, 
        valid: Object.keys(errors).length < 1
    }
}

module.exports.ValidateComment = (body)=>{
    const errors = {}

    if (body.trim() == "" ) {
        errors.body = "empty comments, please provide a comment for the post"
    }

    return {
        errors, 
        valid: Object.keys(errors).length < 1
    }
}