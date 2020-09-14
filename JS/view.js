const view = {

}
view.setActiveScreen = (screenName, fromCreateConverastion = false) => {
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
            const sendMessageForm = document.getElementById('send_messages_form')
            sendMessageForm.addEventListener('submit', (e) => {
                e.preventDefault()
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
            document.getElementById('create_conversation').onclick = () => {
                view.setActiveScreen('createConversationPage')
            }
            if (fromCreateConverastion) {
                view.showCurrentConversation()
                view.showConversations()
            }
            else {
                model.getConversations()
                model.listenConversationChange()
            }
            const addUser = document.getElementById('add_user_form')
            addUser.addEventListener('submit', (e) => {
                e.preventDefault()
                const data = addUser.email.value
                controller.addUser(data)
                addUser.email.value = ''
            })
            document.querySelector('#send_messages_form input').addEventListener('click' ,() => {
                view.hideNotification(model.currentConversation.id)

            })
            break;
        case 'createConversationPage':
            console.log('123')
            document.getElementById('app').innerHTML = component.createConversationPage
            document.getElementById('redirect_to_chat').addEventListener('click', () => {
                view.setActiveScreen('chatPage')
            })
            const createNewConversationForm = document.getElementById('create_conversation_form')
            createNewConversationForm.addEventListener('submit', (e) => {
                e.preventDefault()
                const newConversation = {
                    title: createNewConversationForm.title.value,
                    email: createNewConversationForm.email.value,
                }
                controller.createConversation(newConversation)

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
    document.querySelector('.list_messages').appendChild(messageWrapper)
}
view.showCurrentConversation = () => {
    document.querySelector(".conversation_title").innerHTML = model.currentConversation.title
    document.querySelector('.list_messages').innerHTML = ''
    document.querySelector('.list_users').innerHTML = ''

    for (message of model.currentConversation.messages) {
        view.addMessage(message)
    }
    for (user of model.currentConversation.users) {
        view.addUser(user)
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
    conversationWrapper.id = conversation.id
    if (conversation.id === model.currentConversation.id) {
        conversationWrapper.classList.add('current')
    }
    conversationWrapper.innerHTML = `
    <div class="left_conversation_title"> ${conversation.title}</div>
    <div class="num_of_user">${conversation.users.length} users </div>
    <div class="notification"> </div>
    `
    const mediaQuerry = window.matchMedia('(max-width: 768px)')
    if (mediaQuerry.matches) {
        conversationWrapper.firstElementChild.innerText = conversation.title.charAt(0).toUpperCase()
        document.querySelector('#create_conversation').innerText = '+'
    }
    mediaQuerry.addListener((e) => {
        if (e.matches) {
            conversationWrapper.firstElementChild.innerText = conversation.title.charAt(0).toUpperCase()
            document.querySelector('#create_conversation').innerText = '+'
        } 
        else {
            conversationWrapper.firstElementChild.innerText = conversation.title
            document.getElementById('create_conversation').innerText= '+ New conversation'
        }
    })
    conversationWrapper.addEventListener('click', () => {
        model.currentConversation = model.conversations.filter(item => item.id === conversation.id)[0]
        console.log(model.currentConversation)
        view.showCurrentConversation()
        document.querySelector('.conversation.current').classList.remove('current')
        conversationWrapper.classList.add('current')
        view.hideNotification(conversation.id)
    })
    document.querySelector('.list_conversations').appendChild(conversationWrapper)
}
view.addUser = (user) => {
    const addWrapper = document.createElement('div')
    addWrapper.classList.add('user_email')
    addWrapper.innerHTML = user
    document.querySelector('.list_users').appendChild(addWrapper)
}
view.addUserInConversation = (numberUser) => {
    const currentConversationElement = document.querySelector('.conversation.current .num_of_user')
    console.log(currentConversationElement)
    currentConversationElement.innerText = numberUser + ' user'
}
view.showNotification = (docId) => {
    const conversation = document.getElementById(docId)
    conversation.querySelector('.notification').style = 'display : block'
}
view.hideNotification = (docId) => {
    console.log('haha')
    const conversation = document.getElementById(docId)
    conversation.querySelector('.notification').style = 'display : none'
}