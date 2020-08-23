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
    view.setActiveScreen('registerPage')
}