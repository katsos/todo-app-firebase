const FB_CONFIG = {
    apiKey: "AIzaSyCJKpemXPD7KRVmDebrpHwifNMekijlE_s",
    authDomain: "todoapp-9774b.firebaseapp.com",
    databaseURL: "https://todoapp-9774b.firebaseio.com",
    projectId: "todoapp-9774b",
    storageBucket: "todoapp-9774b.appspot.com",
    messagingSenderId: "773465329178"
};


(function(){

  firebase.initializeApp(FB_CONFIG);

  // vazoume ta elements sto dom
  const elements = {
    nav: {
      isUserSignedIn: document.getElementsByClassName('my-navbar-logged'),
      isUserGuest: document.getElementsByClassName('my-navbar-guest')
    }
  };

/*
  const txtEmail = document.getElementById('txtEmail');
  const txtPassword = document.getElementById('txtPassword');
  const txtFullname = document.getElementById('txtFullname');
  const txtUsername = document.getElementById('txtUsername');
  const txtDate = document.getElementById('txtDate');
  const btnLogin = document.getElementById('btnLogin');
  const btnSignUp = document.getElementById('btnSignUp');
  const btnLogout = document.getElementById('btnLogout');
  const todolidt = document.getElementById('todolidt');

  //Add login event

  btnLogin.addEventListener('click', e => {
    //email pass

    const email = txtEmail.value;
    const pass = txtPassword.value;
    const auth = firebase.auth();

    //sign in

    const promise = auth.signInWithEmailAndPassword(email,pass);
    promise.catch(e => console.log (e.message));

  });

  //add sign up

  btnSignUp.addEventListener('click', e => {
     //email pass
     //TODO:check for real email
    const email = txtEmail.value;
    const pass = txtPassword.value;
    const auth = firebase.auth();
    //sign in
    const promise = auth.createUserWithEmailAndPassword(email,pass);
    promise.catch(e => console.log (e.message));
  });

  btnLogout.addEventListener('click', e =>{
    firebase.auth().signOut();
  });
*/

}());