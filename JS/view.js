const view = {

}
view.setActiveScreen = (screenName) => {
    switch (screenName) {
        case 'registerPage':
            document.getElementById('app').innerHTML = component.registerPage
            const registerForm = document.getElementById('register_form')
            registerForm.addEventListener('submit', (e) => {
                e.preventDefault();
                console.log(registerForm.firstName.value)
                const registerData = {
                    firstName: registerForm.firstName.value,
                    lastName: registerForm.lastName.value,
                    email: registerForm.email.value,
                    password: registerForm.password.value,
                    confirmPassword: registerForm.confirmPassword.value
                }
                console.log(registerData)
                controller.register(registerData)
            })
            document.getElementById('log_in_change').onclick = () => {
                view.setActiveScreen('logInPage')
            }
            break;
        case 'logInPage':
            document.getElementById('app').innerHTML = component.logInPage
            const logInForm = document.getElementById('login_form')
            logInForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const logInData = {
                    email: logInForm.email.value,
                    password: logInForm.password.value,
                }
                console.log(logInData)
                controller.logIn(logInData)
            })
            document.getElementById('register_change').onclick = () => {
                view.setActiveScreen('registerPage')
            }
            break;
        case 'chatPage':
            document.getElementById('app').innerHTML = component.chatPage
            // model.getInfoFromDatabase()
            model.getConversations()
            const sendMessageForm = document.getElementById('send_messages_form')
            sendMessageForm.addEventListener('submit', (e) => {
                e.preventDefault()
                // console.log(sendMessageForm.message.value)
                const message = {
                    content: sendMessageForm.message.value,
                    owner: model.currentUser.email,
                    createdAt: new Date().toISOString()
                }
                if (message.content.trim() !== '') {
                    model.addMessage(message)
                }
                console.log(model.currentConversation)


            })
            model.listenConversationChange()
            document.getElementById('create_conversation').onclick = () => {
                view.setActiveScreen('createConversationPage')
            }
            break;
        case 'createConversationPage':
            console.log('123')
            document.getElementById('app').innerHTML = component.createConversationPage
            const createNewConversationForm = document.getElementById('create_conversation_form')
            createNewConversationForm.addEventListener('submit', (e) => {
                e.preventDefault()
                const newConversation = {
                    title: createNewConversationForm.title.value,
                    createdAt: new Date().toISOString(),
                    user: [model.currentUser.email, createNewConversationForm.email.value],
                }
                firebase.firestore().collection('conversations').add(newConversation)
                console.log(newConversation)
            })
            break;
    }
}
view.setErrorMessage = (elementId, content) => {
    document.getElementById(elementId).innerText = content
}
view.addMessage = (message) => {
    const messageWrapper = document.createElement('div')
    messageWrapper.classList.add('message')
    if (message.owner === model.currentUser.email) {
        messageWrapper.classList.add('my')
        messageWrapper.innerHTML = `
        <div class ='content'> ${message.content}</div>
        `
    }
    else {
        messageWrapper.classList.add('their')
        messageWrapper.innerHTML = `
        <div class = 'owner'> ${message.owner} </div>
        <div class ='content'> ${message.content}</div>
        `
    }
    // console.log(messageWrapper)
    document.querySelector('.list_messages').appendChild(messageWrapper)
}
view.showCurrentConversation = () => {
    document.querySelector(".conversation_title").innerHTML = model.currentConversation.title
    document.querySelector('.list_messages').innerHTML = ''
    for (message of model.currentConversation.messages) {
        view.addMessage(message)
    }
    view.scrollToEndElement()

}
view.scrollToEndElement = () => {
    const element = document.querySelector('.list_messages')
    element.scrollTop = element.scrollHeight
}
view.showConversations = () => {
    for (conversation of model.conversations) {
        view.addConversation(conversation)
    }
}
view.addConversation = (conversation) => {
    const conversationWrapper = document.createElement('div')
    conversationWrapper.classList.add('conversation')
    conversationWrapper.classList.add('cursor_pointer')
    if (conversation.id === model.currentConversation.id) {
        conversationWrapper.classList.add('current')
    }
    conversationWrapper.innerHTML = `
    <div class="left_conversation_title"> ${conversation.title}</div>
    <div class="num_of_user">${conversation.users.length} users </div>
    `
    conversationWrapper.addEventListener('click', () => {
        model.currentConversation = model.conversations.filter(item => item.id === conversation.id)[0]
        console.log(model.currentConversation)
        view.showCurrentConversation()
        document.querySelector('.conversation.current').classList.remove('current')
        conversationWrapper.classList.add('current')
    })
    document.querySelector('.list_conversations').appendChild(conversationWrapper)
}