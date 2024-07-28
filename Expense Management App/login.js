import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js";
import { auth } from "/config.js"

const form = document.getElementById('form');
const email = document.getElementById('email');
const password = document.getElementById('password');

form.addEventListener('submit', event => {
  event.preventDefault();
  signInWithEmailAndPassword(auth, email.value, password.value)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log("🚀 ~ .then ~ user:", user);
      alert(`Login Successfull`);

      localStorage.setItem('user-with-email',JSON.stringify(user));
      window.location = 'home.html'
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log("🚀 ~ errorMessage:", errorMessage);
      alert(`${errorMessage}`)
    });

})



// ., Sing In With Google

const googleButton = document.getElementById('google-button');
googleButton.addEventListener('click', () => {

  const provider = new GoogleAuthProvider();
  console.log(googleButton.innerHTML)
  signInWithPopup(auth, provider)
    .then((result) => {
      const user = result.user;
      console.log(user);
      localStorage.setItem('user-with-google',JSON.stringify(user));
      // window.location = 'home.html'

    }).catch((error) => {
      const errorMessage = error.message;
      console.log(errorMessage);
      alert(`${errorMessage}`);
    });
})