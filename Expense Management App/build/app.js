const listSection = document.querySelector('.list-section');
const form = document.getElementById('expense-from');
const expenseType = document.getElementById('expense-type');
const expenseAmount = document.getElementById('expense');
const ulExpenseType = document.getElementById('ul-expense-type');
const ulExpenseDate = document.getElementById('ul-expense-date');
const ulExpenseAmount = document.getElementById('ul-expense-amount');
const ulExpenseDay = document.getElementById('ul-expense-day');
let totalExpense = document.getElementById('total-expense');
const detailList = document.querySelector('.detail-list');
const deleteAllButton = document.getElementById('deleteAllButton');
const logoSectionHome = document.querySelector('.logo-section-home');
const signOutDetailButton = document.getElementById('sign-out-detail-button');
let totalArr = [];
let arr = [];
let usersObjArr = [];
let usersObj = JSON.parse(localStorage.getItem('user-with-email'));
let registeredName = JSON.parse(localStorage.getItem('register-user-value'));
let signedWithGoogleArr = [];
let signedWithGoogle = JSON.parse(localStorage.getItem('user-with-google'));
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js";
import { auth } from "/config.js";


onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/auth.user
    const uid = user.uid;
    console.log(uid);
  } else {
    window.location = 'index.html';

  }
});




form.addEventListener('submit', event => {
  event.preventDefault();

  if ((expenseType.value === '' || expenseType.value === null) && expenseAmount.value === '' || expenseAmount.value === null) {
    alert('Please fill input fields');
  } else if (typeof (expenseType.value) === 'Number') {
    alert('Please enter *type* not number');
  } else if ((expenseType.value === '' || expenseType.value === null) && (expenseAmount.value !== '' || expenseAmount.value !== null)) {
    alert('Please enter *expense type*');
  } else if ((expenseAmount.value === '' || expenseAmount.value === null) && (expenseType.value !== '' || expenseType.value !== null)) {
    alert('Please enter *expense amount*');
  } else {
    if (isNaN(expenseType.value)) {
      if (expenseType.value.length > 10) {
        alert('Maximum length of *expense* is 10');
      } else {
        if (expenseAmount.value.length >= 8) {
          alert('Maximum length of *amount* is 8');
        } else {
          let startFrom0 = expenseAmount.value.split('');
          if (startFrom0[0] == '0') {
            alert('Amount should not start with *0*');
          } else {
            let startCapitalLetter = expenseType.value.split('');
            if (startCapitalLetter[0] === startCapitalLetter[0].toUpperCase()) {
              alert('Expense added');
              let now = new Date();
              let formattedDateTime = now.toLocaleString();

              let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
              let daysDate = new Date();
              let dateNumber = daysDate.getDay();
              let dayName = days[dateNumber];

              let obj = {
                Type: expenseType.value,
                Amount: parseFloat(expenseAmount.value),
                DateAndTime: formattedDateTime,
                Day: dayName
              };
              totalArr.push(obj.Amount);

              listSection.style.display = 'block';
              listSection.style.transition = '0.6s ease-in';
              arr.push(obj);
              renderList();
            } else {
              alert('First letter should be in *capital* form');
            }
          }
        }
      }
    } else {
      expenseType.value = '';
      alert('Please enter *expense type* in string e.g., Fees of institute');
    }
  }
});

function renderList() {
  ulExpenseType.innerHTML = '';
  ulExpenseAmount.innerHTML = '';
  ulExpenseDate.innerHTML = '';
  ulExpenseDay.innerHTML = '';
  totalExpense.innerHTML = '';

  let sum = 0;

  for (let i = 0; i < totalArr.length; i++) {
    sum += totalArr[i];
  }
  console.log(totalArr)
  arr.forEach((item, index) => {
    const typeLi = document.createElement('li');
    typeLi.style.display = 'flex';
    typeLi.style.gap = '10px';
    typeLi.style.alignItems = 'center';

    const deleteButton = document.createElement('button');
    deleteButton.className = 'deleteButton';
    deleteButton.innerHTML = 'Delete <i class="fa-solid fa-trash"></i>';
    deleteButton.addEventListener('click', () => deleteExpense(index));

    const typeText = document.createTextNode(item.Type);

    const editTypeButton = document.createElement('button');
    editTypeButton.className = 'editBut';
    editTypeButton.innerHTML = 'Edit <i class="fa-solid fa-pen-to-square"></i>';
    editTypeButton.addEventListener('click', () => editExpense(index));

    typeLi.appendChild(deleteButton);
    typeLi.appendChild(typeText);
    typeLi.appendChild(editTypeButton);
    ulExpenseType.appendChild(typeLi);

    const amountLi = document.createElement('li');
    amountLi.className = 'expense-amount';
    amountLi.innerHTML = `${item.Amount} `;

    const editAmountButton = document.createElement('button');
    editAmountButton.className = 'editBut';
    editAmountButton.innerHTML = 'Edit <i class="fa-solid fa-pen-to-square"></i>';
    editAmountButton.addEventListener('click', () => editAmount(index));

    amountLi.appendChild(editAmountButton);
    ulExpenseAmount.appendChild(amountLi);

    const dateLi = document.createElement('li');
    dateLi.style.marginTop = '7px';
    dateLi.textContent = item.DateAndTime;
    ulExpenseDate.appendChild(dateLi);

    const dayLi = document.createElement('li');
    dayLi.style.marginTop = '7px';
    dayLi.textContent = item.Day;
    ulExpenseDay.appendChild(dayLi);
  });

  totalExpense.innerHTML = `Total Expense: ${sum}`;
  expenseType.value = '';
  expenseAmount.value = '';
}

function deleteExpense(index) {
  arr.splice(index, 1);
  totalArr.splice(index, 1);
  if (totalArr.length === 0) {
    listSection.style.display = 'none';
  } else {
    listSection.style.display = 'block';
  }
  renderList();
}

function editExpense(index) {
  const updateExpenseType = prompt('Enter new expense type');

  let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  let daysDate = new Date();
  let dateNumber = daysDate.getDay();
  if (updateExpenseType !== null && updateExpenseType !== '') {
    let firstWordCapitalCheck = updateExpenseType.split('');
    if (firstWordCapitalCheck[0] === firstWordCapitalCheck[0].toUpperCase()) {
      if (isNaN(updateExpenseType)) {
        let updatedExpense = {
          Type: updateExpenseType,
          Amount: arr[index].Amount,
          DateAndTime: new Date().toLocaleString(),
          Day: days[dateNumber]
        };

        arr.splice(index, 1, updatedExpense);
        renderList();

      } else {
        alert('Please enter *string*');
      }
      console.log("🚀 ~ editExpense ~ totalArr:", totalArr)
      console.log("🚀 ~ editExpense ~ totalArr:", totalArr)
    } else {
      alert('First letter should be *capital*');
    }
  } else {
    alert('Please re-enter expense');
  }
}

function editAmount(index) {
  let updatedExpenseAmount = prompt('Enter new expense amount');

  let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  let daysDate = new Date();
  let dateNumber = daysDate.getDay();
  if (updatedExpenseAmount !== null && updatedExpenseAmount !== '') {
    if (isNaN(updatedExpenseAmount)) {
      alert('Please enter *number*');
    } else {
      let checkZero = updatedExpenseAmount.split('');
      if (checkZero[0] === '0') {
        alert('First number should not be *zero(0)*');
      } else {
        if (updatedExpenseAmount.length <= 8) {
          totalArr.splice(index, 1, Number(updatedExpenseAmount));

          let updatedExpense = {
            Type: arr[index].Type,
            Amount: updatedExpenseAmount,
            DateAndTime: new Date().toLocaleString(),
            Day: days[dateNumber]
          };

          arr.splice(index, 1, updatedExpense);
          renderList();
          console.log(totalArr);
        } else {
          alert('You cannot enter an amount greater than *8* digits');
        }
      }
    }
  } else {
    alert('Please re-enter amount');
  }
}

// Function to delete all expenses
function deleteAll() {
  ulExpenseType.innerHTML = '';
  ulExpenseAmount.innerHTML = '';
  ulExpenseDate.innerHTML = '';
  ulExpenseDay.innerHTML = '';
  totalExpense.innerHTML = 'Total Expense: 0';
  arr.splice(0, arr.length);
  totalArr.splice(0, totalArr.length);
  setTimeout(() => {
    listSection.style.display = 'none';
  }, 1000);
}

// Attach event listener to delete all button
deleteAllButton.addEventListener('click', deleteAll);

signOutDetailButton.addEventListener('click', () => {
  if (detailList.style.display === 'block') {
    detailList.style.display = 'none';
  } else {
    detailList.style.display = 'block';
  }
})

// ., Sing Out With Email
if (usersObj) {
  usersObjArr.push(usersObj);
}

import { signOut } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js";
signOutDetailButton.addEventListener('click', () => {
  if (registeredName && !signedWithGoogle) {

    for (let i = 0; i < usersObjArr.length; i++) {
      detailList.innerHTML = `
      <h3 class="detail-listh3"><i class="fa-solid fa-file-signature"></i> ${registeredName}</h3>
      <h4 class="detail-listh4"><i class="fa-regular fa-envelope"></i>  ${usersObj.email}</h4>
      <button class="detail-list-button" id="signOutButton">Sign Out <i class="fa-solid fa-arrow-right-from-bracket"></i></button>`;
    }
  } else {
    console.log('You are not registered with eamil');
  }

  // ., Sign Out Function
  if (registeredName) {
    const signOutButton = document.getElementById('signOutButton');
    console.log(`You are registered with email`);

    // Add an event listener to the button
    signOutButton.addEventListener('click', function () {
      signOut(auth).then(() => {
        alert(`Sign-out successful.`);
        window.location = 'index.html';
        localStorage.removeItem('register-user-value');
        localStorage.removeItem('user-with-email');
      }).catch((error) => {
        console.log(error);
        alert(error)
      });
    });

  }
})

// ., Resgiter With Google;
if (signedWithGoogle && !registeredName) {
  console.log(signedWithGoogle)
  signedWithGoogleArr.push(signedWithGoogle);
  console.log(`You are registered with Google`);
  if (signedWithGoogle.photoURL) {
    signOutDetailButton.src = `${signedWithGoogle.photoURL}`
    signOutDetailButton.addEventListener('click', () => {

      for (let j = 0; j < signedWithGoogleArr.length; j++) {
        detailList.innerHTML = `
          <h3 class="detail-listh3"><i class="fa-solid fa-file-signature"></i> ${signedWithGoogle.displayName}</h3>
          <h4 class="detail-listh4"><i class="fa-regular fa-envelope"></i> ${signedWithGoogle.email}</h4>
          <h5 class="detail-listh4"><i class="fa-solid fa-id-card"></i> User Id: ${signedWithGoogle.providerData[0].uid}</h5>
          <button class="detail-list-button" id="signOutButton">Sign Out <i class="fa-solid fa-arrow-right-from-bracket"></i></button>`;
      }

      const signOutButton = document.getElementById('signOutButton');

      // Add an event listener to the button
      signOutButton.addEventListener('click', function () {
        signOut(auth).then(() => {
          alert(`Sign-out successful.`);
          localStorage.removeItem('user-with-google');
          window.location = 'index.html';
        }).catch((error) => {
          console.log(error);
          alert(error)
        })
      });
    });
  }
}

const daysOfWeek = ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
const todayDate = new Date();
const dayExecuter = todayDate.getDay() + 1;
console.log("🚀 ~ dayExecuter:", dayExecuter)
let tdayDateIndex = daysOfWeek[dayExecuter];
console.log("🚀 ~ tdayDateIndex:", tdayDateIndex);
const newDateDay = new Date().getDay();
console.log("🚀 ~ newDateDay:", daysOfWeek[newDateDay])

// if(daysOfWeek[dayExecuter+2]){
  // localStorage.setItem('newDayArr',JSON.stringify(arr));
  // console.log(daysOfWeek[dayExecuter],'sdsd');
  // console.log('as')
// }