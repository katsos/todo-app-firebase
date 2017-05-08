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
    container: document.getElementById('todo-container'),
    listContainer: document.getElementById('todo-list-container'),
    list: document.getElementById('todo-list'),
    input: document.getElementById('todo-input'),
    form: document.getElementById('todo-add-form')
  }
};


firebase.initializeApp(FB_CONFIG);
let database = null;
let todoDbList = null;
const auth = firebase.auth();

auth.onAuthStateChanged(user => {
  if (user) {
    ELEM.nav.isUserSignedIn.classList.remove('hide');
    ELEM.todo.container.classList.remove('hide');

    database = firebase.database();
    todoDbList = database.ref(`users/${user.uid}/todoList`);
    addTodosToViewListener();
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
    auth.signOut().then(refresh);
  });

  /* main */
  ELEM.form.signUp.addEventListener('submit', function (event) {
    event.preventDefault();

    data = serializeForm(this);
    auth.createUserWithEmailAndPassword(data.email, data.password)
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
    auth.signInWithEmailAndPassword(data.email, data.password)
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

  /* todo */
  ELEM.todo.form.addEventListener('submit', event => {
    event.preventDefault();

    const input = ELEM.todo.input.value;
    
    /* do nothing if it is empty */
    if (!input.trim().length) return;

    todoDbList.push().set(input);
  });

}

function addTodosToViewListener() {
  /* on every value change */
  todoDbList.on('value', snapshot => {
    /* parse data to proccess them*/
    const data = snapshot.toJSON();
    
    /* construct them in an array of {id: text} objects */
    const todos = Object.keys(data).map(id => {
      return {id, text: data[id]};
    });

    /* reset rendered list */
    ELEM.todo.list.innerHTML = '';
    /* draw each item */
    for(const todo of todos) addTodoItemInList(todo);
  });
}

function addTodoItemInList(todo) {
  ELEM.todo.list.insertAdjacentHTML('beforeend', `
    <li id="todo-item-${todo.id}" class="list-group-item">
      <span>${todo.text}</span>
      <button id="todo-delete-${todo.id}" class="btn-primary">Delete</button>
    </li>
  `);
}
