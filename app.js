const FB_CONFIG = {
  apiKey: "AIzaSyCJKpemXPD7KRVmDebrpHwifNMekijlE_s",
  authDomain: "todoapp-9774b.firebaseapp.com",
  databaseURL: "https://todoapp-9774b.firebaseio.com",
  projectId: "todoapp-9774b",
  storageBucket: "todoapp-9774b.appspot.com",
  messagingSenderId: "773465329178"
};

const ELEM = {
  nav: {
    isUserSignedIn: document.getElementsByClassName('my-navbar-logged')[0],
    isUserGuest: document.getElementsByClassName('my-navbar-guest')[0],
    linkFor: {
      signUp: document.getElementById('btnSignUp'),
      signIn: document.getElementById('btnLogin'),
      logout: document.getElementById('btnLogout')
    }
  },
  form: {
    signIn: document.getElementById('login-from'),
    signUp: document.getElementById('signup-from')
  },
  todo: {
    container: document.getElementById('todolist')
  }
};


firebase.initializeApp(FB_CONFIG);

firebase.auth().onAuthStateChanged(user => {
  if (user) {
    ELEM.nav.isUserSignedIn.classList.remove('hide');
    ELEM.todo.container.classList.remove('hide');
  } else {
    ELEM.nav.isUserGuest.classList.remove('hide');
  }
});

initalizeListeners();

function initalizeListeners() {

  /* nav */
  ELEM.nav.linkFor.signUp.addEventListener('click', () => {
    ELEM.form.signUp.classList.toggle('hide');
  });

  ELEM.nav.linkFor.signIn.addEventListener('click', () => {
    ELEM.form.signIn.classList.toggle('hide');
  });

  ELEM.nav.linkFor.logout.addEventListener('click', event => {
    firebase.auth().signOut().then(refresh);
  });

  /* main */
  ELEM.form.signUp.addEventListener('submit', function (event) {
    event.preventDefault();

    data = serializeForm(this);
    firebase.auth().createUserWithEmailAndPassword(data.email, data.password)
      .then(response => {
        console.log(response);
        alert('You have been signed up. You can use login now!');
        refresh();
      })
      .catch(error => {
        console.error(error);
        alert('Error: ' + error.message);
      })
  });

  ELEM.form.signIn.addEventListener('submit', function (event) {
    event.preventDefault();

    data = serializeForm(this);
    firebase.auth().signInWithEmailAndPassword(data.email, data.password)
      .then(response => {
        console.log(response);
        alert('You have been signed in successfully!');
        refresh();
      })
      .catch(error => {
        alert('Error: ' + error.message);
        console.error(error);
      })
  });

}