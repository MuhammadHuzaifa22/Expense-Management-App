const listSection = document.querySelector('.list-section');
const form = document.getElementById('expense-from');
const expenseType = document.getElementById('expense-type');
const expenseAmount = document.getElementById('expense');
const ulExpenseType = document.getElementById('ul-expense-type');
const ulExpenseDate = document.getElementById('ul-expense-date');
const ulExpenseAmount = document.getElementById('ul-expense-amount');
let arr = [];


form.addEventListener('submit', event => {
  event.preventDefault()

  if ((expenseType.value === '' || expenseType.value === null) && expenseAmount.value === '' || expenseAmount.value === null) {
    alert(`Please fill input fields`);
  } else if ((expenseType.value === '' || expenseType.value === null) && (expenseAmount.value !== '' || expenseAmount.value !== null)) {
    alert(`Please enter *expense type*`);
  } else if ((expenseAmount.value === '' || expenseAmount.value === null) && (expenseType.value !== '' || expenseType.value !== null)) {
    alert(`Please enter *expense amount*`);
  } else {


    let now = new Date();
    let formattedDateTime = now.toLocaleString();

    let obj = {
      Type: `${expenseType.value}`,
      Amount: `${expenseAmount.value}`,
      DateAndTime: `${formattedDateTime}`
    }


    listSection.style.display = 'block';
    listSection.style.transition = '0.6s ease in';
    arr.push(obj);
    console.log(arr)
    console.log(expenseType.value);
    console.log(expenseAmount.value)
    console.log("🚀 ~ arr:", arr);
    renderList();
  }

})


function renderList() {
  ulExpenseType.innerHTML = '';
  ulExpenseAmount.innerHTML = '';
  ulExpenseDate.innerHTML = '';
  arr.map((item, index) => {
    ulExpenseType.innerHTML += `<li>${item.Type} <button class="editBut" id="dataContainer" onclick="editExpense(${index})">Edit <i class="fa-solid fa-pen-to-square"></i></button></li>`;
    ulExpenseAmount.innerHTML += `<li>${item.Amount}  <button class="edit-button-app-js" onclick="editAmount(${index})">Edit <i class="fa-solid fa-pen-to-square"></i></button></li>`;
    ulExpenseDate.innerHTML += `<li>${item.DateAndTime}</li>`;
  });
  
}

function editExpense(index) {
  const updateExpenseType = prompt('Enter new expense type');
  
  let updatedExpense = {
    Type: updateExpenseType,
    Amount: arr[index].Amount,
    DateAndTime: new Date().toLocaleString()
  }
  arr.splice(index, 1, updatedExpense)
  renderList();
}

function editAmount(index) {
  const updatedExpenseAmount = prompt(`Enter new expense amount`);
  let updatedExpense = {
    Type: arr[index].Type,
    Amount: updatedExpenseAmount,
    DateAndTime: new Date().toLocaleString()
  }

  arr.splice(index, 1, updatedExpense)
  renderList();
}


const days = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];
const daysDate = new Date();
const dateNumber = daysDate.getDay();

const Num = days.indexOf(dateNumber);
console.log("🚀 ~ Num:", Num)
