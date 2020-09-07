const model = {

}
model.infoFromDatabase = undefined
model.currentUser = undefined
model.conversations = []
model.currentConversation = undefined
model.register = async (data) => {
    try {
        const response = await firebase.auth().createUserWithEmailAndPassword(data.email, data.password)
        console.log(response)
        firebase.auth().currentUser.updateProfile({
            displayName: data.firstName + ' ' + data.lastName
        })
        firebase.auth().currentUser.sendEmailVerification()
    } catch (err) {
        alert(err.message)
        console.log(err)
    }
}
model.login = async (email, password) => {
    try {
        // console.log(email)
        const response = await firebase.auth().signInWithEmailAndPassword(email, password)
        // console.log(response.user.emailVerified)
        // if (response.user.emailVerified) {
        //     console.log('haha')
        //     model.currentUser = {
        //         email : response.user.email,
        //         displayName: response.user.displayName,
        //     }
        //     view.setActiveScreen('chatPage')
        // }
        // else {
        //     alert ('Please verifify your email')
        // }
    } catch (err) {
        alert(err.message)
        console.log(err)
    }
}
model.getInfoFromDatabase = async () => {
    const docId = '0yjvVOd4v30Fn9yEo4Ry'
    const response = await firebase.firestore().collection('conversations').doc(docId).get()
    model.infoFromDatabase = getOneDocument(response)
    console.log(model.infoFromDatabase.messages)
    for (let i = 0; i < model.infoFromDatabase.messages.length; i++) {
        console.log(model.infoFromDatabase.messages[i].owner)
        view.addMessage(model.infoFromDatabase.messages[i])
    }

}
model.getConversations = async () => {
    const response = await firebase.firestore().collection('conversations').where('users', 'array-contains', model.currentUser.email).get()
    model.conversations = getManyDocument(response)
    // console.log(model.conversations)
    if (model.conversations.length > 0) {
        model.currentConversation = model.conversations[0]
        view.showCurrentConversation()
        view.showConversations( )
    }
}
model.addMessage = (message) => {
    dataToUpdate = {
        messages: firebase.firestore.FieldValue.arrayUnion(message)
    }
    firebase.firestore().collection('conversations').doc(model.currentConversation.id).update(dataToUpdate)
}
model.listenConversationChange = () => {
    let isFirstRun = true
    firebase.firestore().collection('conversations').where('users', 'array-contains', model.currentUser.email).onSnapshot((snapshot) => {
        if (isFirstRun) {
            isFirstRun = false
            return
        }
        // console.log(snapshot.docChanges())
        for (oneChange of snapshot.docChanges()) {
            const docData = getOneDocument(oneChange.doc)
            console.log(model.currentConversation)
            if (docData.id === model.currentConversation.id) {
                model.currentConversation = docData
                view.addMessage(model.currentConversation.messages[model.currentConversation.messages.length - 1])
                view.scrollToEndElement()
            }
            for (let i=0; i<model.conversations.length -1; i++) {
                if (model.conversations[i].id === docData.id) {
                    model.conversations[i] = docData
                }
            }
        }
    })
}