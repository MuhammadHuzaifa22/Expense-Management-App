import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js";
import { auth } from "/config.js"

const userName = document.getElementById('username')
const form = document.getElementById('form');
const email = document.getElementById('email');
const password = document.getElementById('password');

form.addEventListener('submit', event =>{
    event.preventDefault();
    createUserWithEmailAndPassword(auth, email.value, password.value)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log(user);
      alert('You are registered');
      let userNameValue = userName.value;
      localStorage.setItem('register-user-value',JSON.stringify(userNameValue))
      window.location = 'index.html';
    })
    .catch((error) => {
       let errorCode = error.code;
       const errorMessage = error.message;
       console.log("🚀 ~ errorMessage:", errorMessage)
       alert(errorMessage);
    });
    
})