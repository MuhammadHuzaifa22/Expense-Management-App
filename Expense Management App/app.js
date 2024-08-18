// ., Import signOut , onAuthStateChanged and auth 
import { signOut } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js";
import { auth } from "/config.js";

// ., Declare variables
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


// ., On auth state change function
onAuthStateChanged(auth, (user) => {
  if (user) {
    const uid = user.uid;
    console.log(uid);
  } else {
    window.location = 'index.html';

  }
});



// .,Event listener on submit function
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
              console.log(arr)
              
              renderList();

              // ., Recent page section started
              const daysOfWeek = ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
              const todayDate = new Date();
              const dayExecuter = todayDate.getDay()+1;
              
              if (daysOfWeek[dayExecuter] === daysOfWeek[0]) {
                let setArr = [];
                let setObj = {
                  expenseAmount: expenseAmount.value,
                  expenseType: expenseType.value
                }
                setArr.push(setObj);
                console.log(setArr);

                console.log(`${daysOfWeek[0]} Expnese ==> ${setArr}`)
              }


              if (daysOfWeek[dayExecuter] === daysOfWeek[1]) {
                let sunArr = [];
                let sunObj = {
                  expenseAmount: expenseAmount.value,
                  expenseType: expenseType.value
                }
                sunArr.push(sunObj);
                console.log(sunArr);

                console.log(`${daysOfWeek[1]} Expnese ==> ${sunArr}`)
              }

              if (daysOfWeek[dayExecuter] === daysOfWeek[2]) {
                let monArr = [];
                let monObj = {
                  expenseAmount: expenseAmount.value,
                  expenseType: expenseType.value
                }
                monArr.push(monObj);
                console.log(monArr);

                console.log(`${daysOfWeek[2]} Expnese ==> ${monArr}`)
              }

              if (daysOfWeek[dayExecuter] === daysOfWeek[3]) {
                let tueArr = [];
                let tueObj = {
                  expenseAmount: expenseAmount.value,
                  expenseType: expenseType.value
                }
                tueArr.push(tueObj);
                console.log(tueArr);

                console.log(`${daysOfWeek[3]} Expnese ==>${tueArr}`)
              }

              if (daysOfWeek[dayExecuter] === daysOfWeek[4]) {
                let wedArr = [];
                let wedObj = {
                  expenseType: expenseType.value,
                  expenseAmount: expenseAmount.value,
                }
                wedArr.push(wedObj);
                console.log(wedArr);

                console.log(`${daysOfWeek[4]} Expense ==>`,`Expense Type: `,wedArr[0].expenseType,`Expense Amount: `,wedArr[0].expenseAmount);
                localStorage.setItem('wedArr',JSON.stringify(wedArr));
                
              }

              if (daysOfWeek[dayExecuter] === daysOfWeek[5]) {
                let thursArr = [];
                let thursObj = {
                  expenseAmount: expenseAmount.value,
                  expenseType: expenseType.value
                }
                thursArr.push(thursObj);
                console.log(thursArr);

                console.log(`${daysOfWeek[5]} Expnese ==> ${thursArr}`)
              }

              if (daysOfWeek[dayExecuter] === daysOfWeek[6]) {
                let friArr = [];
                let friObj = {
                  expenseAmount: expenseAmount.value,
                  expenseType: expenseType.value
                }
                friArr.push(friObj);
                console.log(friArr);

                console.log(`${daysOfWeek[6]} Expnese ==> ${friArr}`)
              }
              // ., Recent page section ended


            } else {
              alert('First letter should be in *capital* form');
            }
              console.log("🚀 ~ arr:", arr)
              console.log("🚀 ~ arr:", arr)
          }
        }
      }
    } else {
      expenseType.value = '';
      alert('Please enter *expense type* in string e.g., Fees of institute');
    }
  }
});

// ., Render list function
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
  console.log(arr);
localStorage.setItem('alldayArr',JSON.stringify(arr));
  arr.map((item) => {
    ulExpenseType.innerHTML += `<li class="todoLi"><button class="deleteBtn">Delete <i class="fa-solid fa-trash"></i></button> ${item.Type} <button class="editBut">Edit <i class="fa-solid fa-pen"></i></button></li>`
    ulExpenseAmount.innerHTML += `<li> ${item.Amount} <button class="editButAmount">Edit <i class="fa-solid fa-pen"></i></button></li>`
    ulExpenseDate.innerHTML += `<li class="dateLi"> ${item.DateAndTime}</li>`
    ulExpenseDay.innerHTML += `<li class="dayLi">${item.Day}</li>`
  })

  // ., Delete button function
  const deleteBtn = document.querySelectorAll('.deleteBtn');
  console.log("🚀 ~ renderList ~ deleteBtn:", deleteBtn)
  deleteBtn.forEach((btn, index) => {
    btn.addEventListener('click', () => {
      arr.splice(index, 1);
      totalArr.splice(index, 1);
      if (totalArr.length === 0) {
        listSection.style.display = 'none';
      } else {
        listSection.style.display = 'block';
      }
      renderList();
    })

  })


  // ., Edit type function
  const editTypeBtn = document.querySelectorAll('.editBut');
  editTypeBtn.forEach((btn, index) => {
    btn.addEventListener('click', () => {
      editTypeBtn[index].textContent = 'Edited';
      const updateExpenseType = prompt('Enter new expense type');

      // ., For get edit time
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
        } else {
          alert('First letter should be *capital*');
        }
      } else {
        alert('Please re-enter expense');
      }

      console.log(`Edit type btn clicked.`, index);

    })
  })


  // ., Edit Amount function
  const editAmountBtn = document.querySelectorAll('.editButAmount');
  console.log("🚀 ~ renderList ~ editAmountBtn:", editAmountBtn)
  editAmountBtn.forEach((editAmntBtn, index) => {
    editAmntBtn.addEventListener('click', () => {
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

    })

  })

  totalExpense.innerHTML = `Total Expense: ${sum}`;
  // expenseType.value = '';
  // expenseAmount.value = '';
}


// ., Sign out function with user details section
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


  // ., Sign out function
  if (registeredName) {
    const signOutButton = document.getElementById('signOutButton');
    console.log(`You are registered with email`);
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

// ., Delelte all function
deleteAllButton.addEventListener('click', () => {
  totalArr.splice(0, totalArr.length);
  console.log(totalArr);
  if (totalArr.length === 0) {
    ulExpenseType.innerHTML = '';
    ulExpenseAmount.innerHTML = '';
    ulExpenseDate.innerHTML = '';
    ulExpenseDay.innerHTML = '';
  }
  totalExpense.innerHTML = `Total Expense: 0`;
  setTimeout(() => {
    listSection.style.display = 'none';
  }, 1000)
})

