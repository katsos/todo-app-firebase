const FB_CONFIG = {
    apiKey: "AIzaSyD636iUl9DB6v_mRbcdb4WU_GOLTZt43I4",
    authDomain: "todoapp-a6f6a.firebaseapp.com",
    databaseURL: "https://todoapp-a6f6a.firebaseio.com",
    projectId: "todoapp-a6f6a",
    storageBucket: "todoapp-a6f6a.appspot.com",
    messagingSenderId: "266129417099"
};


(function(){

  firebase.initializeApp(FB_CONFIG);

  // vazoume ta elements sto dom

  const txtEmail = document.getElementById('txtEmail');
  const txtPassword = document.getElementById('txtPassword');
  const txtFullname = document.getElementById('txtFullname');
  const txtUsername = document.getElementById('txtUsername');
  const txtDate = document.getElementById('txtDate');
  const btnLogin = document.getElementById('btnLogin');
  const btnSignUp = document.getElementById('btnSignUp');
  const btnLogout = document.getElementById('btnLogout');
  const everything = document.getElementById('everything');
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


  // add a realtime listener

  firebase.auth().onAuthStateChanged(firebaseUser => {
    if(firebaseUser) {
      console.log(firebaseUser);
      btnLogout.classList.remove('hide');
      everything.classList.add('hide');
      todolidt.classList.remove('hide');

    } else {
      console.log('not logged in');
      btnLogout.classList.add('hide');
      everything.classList.remove('hide');
      todolidt.classList.add('hide');
    }

  });

}());