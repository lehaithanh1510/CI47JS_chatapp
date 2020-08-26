const component = {

}
component.welcomePage = `<h1> Welcome to my chat app <h1>`
component.registerPage = `
    <div class="register_container">
        <form id="register_form">
            <div class='register_header'> MindX chat </div>
            <div class="name_wrapper">
                <div class="input_wrapper">
                    <input type='text' placeholder="First name" name='firstName'>
                    <div class="error" id='first_name_error'></div>
                </div>
                <div class="input_wrapper">
                    <input type='text' placeholder="Last name" name='lastName'>
                    <div class="error" id='last_name_error'></div>
                </div>
            </div>
            <div class="input_wrapper">
                <input type='email' placeholder="Email" name='email'>
                <div class="error" id='email_error'></div>
            </div>
            <div class="input_wrapper">
                <input type='password' placeholder="Password" name='password'>
                <div class="error" id='password_error'></div>
            </div>
            <div class="input_wrapper">
                <input type='password' placeholder="Confirm password" name='confirmPassword'>
                <div class="error" id='confirm_password_error'></div>
            </div>
            <div class="form_action">
                <div> Already have an account ? <span class = 'cursor_pointer' id ='log_in_change'> Log in </span></div>
                <button class='btn cursor_pointer' type = 'submit'> Register </button>
            </div>
        </form>
    </div>`
component.logInPage = `
       <div class="login_container">
        <form id = 'login_form'>
            <div class="login_header">MindX chat</div>
            <div class="input_wrapper">
                <input type ='email' placeholder="Email" name = 'email'>
                <div class= 'error' id= 'login_email_error'></div>
            </div>
            <div class ='input_wrapper'> 
                <input type ='password' placeholder="Password" name= 'password'>
                <div class='error' id= 'login_password_error'></div>
            </div>
            <div class="form_action"> 
                <div>Don't have an account ? <span class = 'cursor_pointer' id= 'register_change'> Sign up</span></div>
                <button class = 'btn cursor_pointer'> Log in </button>
            </div>
        </form> 
    </div> 
`
component.chatPage = `
        <div class="chat_container">
        <div class="header"> MindX chat </div>
        <div class="main">
            <div class="conversation_detail"> 
                <div class="conversation_title"> Fisrt conversation</div>
                <div class="list_messages"></div>
                <form id = "send_messages_form">
                    <div class="input_wrapper">
                        <input type="text" placeholder="Type a message" name = 'message'> </input>
                    </div>
                    <button type = 'submit'> <i class="fas fa-paper-plane fa-2x"></i> </button>
                </form>
            </div>
        </div>
    </div>
`