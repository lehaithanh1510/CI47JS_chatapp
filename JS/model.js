const model = {
    
}
model.infoFromDatabase = undefined
model.currentUser = undefined
model.register = async (data) => {
    try {
        const response = await firebase.auth().createUserWithEmailAndPassword(data.email, data.password)
        console.log(response)
        firebase.auth().currentUser.updateProfile({
            displayName : data.firstName + ' ' + data.lastName
        })
        firebase.auth().currentUser.sendEmailVerification()
    } catch(err) {
        alert (err.message)  
        console.log(err)
    }
}
model.login = async (email, password) => {
    try {
        // console.log(email)
        const response = await firebase.auth().signInWithEmailAndPassword(email,password) 
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
    }catch (err){
        alert (err.message)
        console.log(err)
    }
}
model.getInfoFromDatabase = async () => {
    console.log('haha')
    const docId = '0yjvVOd4v30Fn9yEo4Ry'
    const response = await firebase.firestore().collection('conversations').doc(docId).get()
    console.log('haha')
    model.infoFromDatabase = getOneDocument(response) 
    console.log(model.infoFromDatabase.messages)
    for (let i=0 ;i < model.infoFromDatabase.messages.length; i++) {
        console.log(model.infoFromDatabase.messages[i].owner)
        view.addMessage(model.infoFromDatabase.messages[i])
    }

}