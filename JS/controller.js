const controller = {

}
controller.register = (data) => {
    if (data.firstName === '') {
        document.getElementById('first_name_error').innerText = 'Please input your first name'
    }
    if (data.lastName === '') {
        document.getElementById('last_name_error').innerText = 'Please input your last name'
    }
    if (data.email === '') {
        document.getElementById('email_error').innerText = 'Please input your email'
    }
    if (data.password === '') {
        document.getElementById('password_error').innerText = 'Please input your password'
    }
    if (data.confirmPassword === '') {
        document.getElementById('confirm_password_error').innerText = 'Please input your password confirmation'
    }
}
controller.logIn = (data) => {
    if (data.email === '') {
        document.getElementById('login_email_error').innerText = 'Please enter your email'
    }
    if (data.password === '') {
        document.getElementById('login_password_error').innerText = 'Please enter your password'
    }
}