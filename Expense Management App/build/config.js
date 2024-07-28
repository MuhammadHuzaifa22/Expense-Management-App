import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js";
import{getAuth} from "https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js";

  const firebaseConfig = {
    apiKey: "AIzaSyCrd7OzmdBh8LxwdvJRZ8rlFErAD2ceDrU",
    authDomain: "fir-authentication111.firebaseapp.com",
    projectId: "fir-authentication111",
    storageBucket: "fir-authentication111.appspot.com",
    messagingSenderId: "192651985278",
    appId: "1:192651985278:web:89aec967f4fb85c820b32f",
    measurementId: "G-LG7QNBX2Y6"
  };


 export const app = initializeApp(firebaseConfig);
 export const auth = getAuth(app);