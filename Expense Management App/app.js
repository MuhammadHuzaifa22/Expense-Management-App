// import {onAuthStateChanged} from "https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js";
// import { auth } from "/config.js"


// onAuthStateChanged(auth, (user) => {
//     if (user) {
//       const uid = user.uid;
//       console.log("🚀 ~ onAuthStateChanged ~ uid:", uid)
//     } else {
//       window.location = 'register.html';
//     }
//   });
  
  
  const listSection = document.querySelector('.list-section');
  const form = document.getElementById('expense-from');
  const expenseType = document.getElementById('expense-type');
  const expenseAmount = document.getElementById('expense');


  
  let arr = [];
  
  form.addEventListener('submit', event =>{
    event.preventDefault();
    if((expenseType.value === '' || expenseType.value === null) && expenseAmount.value === '' || expenseAmount.value === null){
      alert(`Please fill input fields`);
    }else if((expenseType.value === '' || expenseType.value === null) && (expenseAmount.value !== '' || expenseAmount.value !== null)){
      alert(`Please enter *expense type*`);
    }else if((expenseAmount.value === '' || expenseAmount.value === null) && (expenseType.value !== '' || expenseType.value !== null)){
      alert(`Please enter *expense amount*`);
    }
    
      let now = new Date();
      let formattedDateTime = now.toLocaleString();
  
      let obj = {
      Type: `${expenseType.value}`,
      Amount : `${expenseAmount.value}`,
      DateAndTime :`${formattedDateTime}`
    }

    listSection.style.display = 'block';
    listSection.style.transition = '0.6s ease in';
    arr.push(obj);
    console.log(arr)

    console.log(expenseType.value);
    console.log(expenseAmount.value)
    console.log("🚀 ~ arr:", arr);

    renderList(arr);  
    
    let totalAmount = 0;
    let totalAmountArray = [];
    totalAmountArray.push(obj.Amount);
    console.log("🚀 ~ renderList ~ totalAmount:", totalAmountArray);
    
  })

const ulExpenseType = document.getElementById('ul-expense-type');
const ulExpenseDate = document.getElementById('ul-expense-date');
const ulExpenseAmount = document.getElementById('ul-expense-amount');


function renderList(arr){
    ulExpenseDate.innerHTML = '';
    ulExpenseType.innerHTML = '';
    ulExpenseAmount.innerHTML = '';

  for(let i = 0; i <= arr.length;i++){
    ulExpenseType.innerHTML += `<li>${arr[i].Type} <button id="editt">Edit</button></li>`
    ulExpenseAmount.innerHTML += `<li>${arr[i].Amount} <button onclick="editLiExpenseAmount(${i})">Edit</button></li>`
    ulExpenseDate.innerHTML += `<li>${arr[i].DateAndTime}</li>`    
    const Edit = document.getElementById('editt');
    Edit.onclick = () => deleteLiExpenseType(i)
  }
}
  
function deleteLiExpenseType(i){
  ulExpenseType.innerHTML = '';
 const Delete = 'sds'
 const arrSplice = arr.splice(i,1);
 console.log(arrSplice);
 for(let j = 0; j <= arr.length;j++){
  ulExpenseType.innerHTML = `${arr[j]}`
 }
 
}