
(function(){

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBndc1KqNIg9qxCfzfxzdUPkpntYLrbLPE",
    authDomain: "to-do-list-project-50ac0.firebaseapp.com",
    databaseURL: "https://to-do-list-project-50ac0.firebaseio.com",
    projectId: "to-do-list-project-50ac0",
    storageBucket: "to-do-list-project-50ac0.appspot.com",
    messagingSenderId: "282717427866"
  };
  firebase.initializeApp(config);

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
