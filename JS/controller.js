const controller = {

}
controller.register = (data) => {
    if (data.firstName === '') {
        console.log(data.firstName)
        view.setErrorMessage('first_name_error','Please input your first name')
    }
    else document.getElementById('first_name_error').innerText = ''

    if (data.lastName === '') {
        view.setErrorMessage('last_name_error','Please input your last name')
    }
    else document.getElementById('last_name_error').innerText = ''
    if (data.email === '') {
        view.setErrorMessage('email_error','Please input your email')
    }
    else document.getElementById('email_error').innerText = ''

    if (data.password === '') {
        view.setErrorMessage('password_error','Please input your password')
    }
    else document.getElementById('password_error').innerText = ''

    if (data.confirmPassword === '') {
        view.setErrorMessage('confirm_password_error','Please input your password confirmation')
    }
    else if (data.password!== data.confirmPassword) {
        view.setErrorMessage('confirm_password_error',"Password didn't match")
    }
    else document.getElementById('confirm_password_error').innerText = ''
    
if (data.firstName !== '' 
    && data.lastName !== ''
    && data.email !== ''
    && data.password !== ''
    && data.password === data.confirmPassword) {
        model.register(data)
    }
}
controller.logIn = (data) => {
    if (data.email === '') {
        document.getElementById('login_email_error').innerText = 'Please enter your email'
    }
    else document.getElementById('login_email_error').innerText = ''

    if (data.password === '') {
        document.getElementById('login_password_error').innerText = 'Please enter your password'
    }
    else document.getElementById('login_password_error').innerText = ''
    if (data.email !== '' &&  data.password !== '') {
        model.login(data.email,data.password)
    }
}
controller.chatPage = () => {
    
}