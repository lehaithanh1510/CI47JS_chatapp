window.onload = () => {
    // console.log('window loaded')
    // document.getElementById('app').innerHTML = component.register
    var firebaseConfig = {     
        apiKey : "AIzaSyBWuHPdX87q_3dDqykmwUXzp5KHjyFzMZY" ,     
        authDomain : "chat-app-8dd1a.firebaseapp.com" ,     
        databaseURL : "https: // chat-app-8dd1a.firebaseio.com " ,
        projectId : "chat-app-8dd1a" ,     
        storageBucket : "chat-app-8dd1a.appspot.com" ,    
         messagingSenderId : "821119421609" ,     
         appId : "1: 821119421609: web: 7d27a30f6a0f06d17aedb8" 
    }; // Initialize Firebase   
    firebase . initializeApp ( firebaseConfig );
    console.log (firebase.app())
    firebase.auth().onAuthStateChanged((user) => {
        console.log(user)
        if (user) {
            model.currentUser= {
                displayName : user.displayName,
                email: user.email,
            }
            if (user.emailVerified) {
                view.setActiveScreen('chatPage')
            }
            else {
                alert ('Please verify your email')
                firebase.auth().signOut()
                view.setActiveScreen('logInPage')
            }
            
        }
        else {
            view.setActiveScreen('registerPage')
        }
    })
    // templateFirestore() 
}

const  templateFirestore = async () => {
    // get one 
    const docId = 'v42YrxVF1PYXa162y8Fk'
    const  response = await firebase.firestore().collection('users').doc(docId).get()
    // console.log(response)
    const user = getOneDocument(response)
    // console.log(user)
    // get many 
    const responseMany = await firebase.firestore().collection('users').where('age','==',18).get()
    // console.log(responseMany)
    console.log(responseMany)
    const users = getManyDocument(responseMany)
    console.log(users)
    //create 
    const dataToCreate = {
        age : 100,
        name : 'ABC'
    }
    // firebase.firestore().collection('users').add(dataToCreate)
    //update 
    const idToUpdate = 'v42YrxVF1PYXa162y8Fk'
    const dataToUpdate = {
        name : 'Updated',
        phone : firebase.firestore.FieldValue.arrayUnion('0982'),
    }
    firebase.firestore().collection('users').doc(idToUpdate).update(dataToUpdate)
    // delete 
    const idToDelete = 'GZygXVSeoghrJei3z0E5'
    firebase.firestore().collection('users').doc(idToDelete).delete()
}
const getManyDocument = (response) => {
    const listData = []
    for (const doc of response.docs) {
        listData.push(getOneDocument(doc))
    }
    return listData
} 
const getOneDocument = (response) => {
    const data = response.data() 
    data.id = response.id
    return data
}