const view = {

}
view.setActiveScreen = (screenName) => {
    switch (screenName) {
        case 'registerPage' : 
         document.getElementById('app').innerHTML = component.registerPage
         const registerForm = document.getElementById('register_form')
         registerForm.addEventListener('submit',(e) => {
             e.preventDefault();
             console.log(registerForm.firstName.value)
             const registerData = {
                 firstName : registerForm.firstName.value,
                 lastName : registerForm.lastName.value,
                 email : registerForm.email.value,
                 password : registerForm.password.value,
                 confirmPassword : registerForm.confirmPassword.value
             }
             console.log(registerData)
             controller.register(registerData)
         })
         document.getElementById('log_in_change').onclick = () => {
            view.setActiveScreen('logInPage')
        }
        break; 
        case 'logInPage' : 
         document.getElementById('app').innerHTML = component.logInPage
         const logInForm = document.getElementById('login_form')
         logInForm.addEventListener('submit',(e) => {
             e.preventDefault();
             const logInData = {
                 email : logInForm.email.value,
                 password : logInForm.password.value,
             }
             console.log(logInData)
             controller.logIn(logInData)
         })
         document.getElementById('register_change').onclick = () => {
             view.setActiveScreen('registerPage')
         }
        break;
        case 'chatPage' :
            document.getElementById('app').innerHTML = component.chatPage 
            document.getElementById('welcome_user').innerText = `Welcome ${model.currentUser.displayName}`
        break;
    }
}
view.setErrorMessage = (elementId,content) => {
    document.getElementById(elementId).innerText = content
}