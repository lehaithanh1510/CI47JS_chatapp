const model = {
    
}
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