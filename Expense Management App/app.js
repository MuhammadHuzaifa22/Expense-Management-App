const listSection = document.querySelector('.list-section');
const form = document.getElementById('expense-from');
const expenseType = document.getElementById('expense-type');
const expenseAmount = document.getElementById('expense');
const ulExpenseType = document.getElementById('ul-expense-type');
const ulExpenseDate = document.getElementById('ul-expense-date');
const ulExpenseAmount = document.getElementById('ul-expense-amount');
const ulExpenseDay = document.getElementById('ul-expense-day');
let totalExpense = document.getElementById('total-expense');
let totalArr = [];
let arr = [];

form.addEventListener('submit', event => {
  event.preventDefault();

  if ((expenseType.value === '' || expenseType.value === null) && expenseAmount.value === '' || expenseAmount.value === null) {
    alert(`Please fill input fields`);
  } else if (typeof (expenseType.value) === 'Number') {
    alert(`Please enter *type* not number`);
  }
  else if ((expenseType.value === '' || expenseType.value === null) && (expenseAmount.value !== '' || expenseAmount.value !== null)) {
    alert(`Please enter *expense type*`);
  } else if ((expenseAmount.value === '' || expenseAmount.value === null) && (expenseType.value !== '' || expenseType.value !== null)) {
    alert(`Please enter *expense amount*`);
  } else {
    if (isNaN(expenseType.value)) {
      if (expenseType.value.length > 10) {
        alert(`Maximun length of *expense* is 10`);
      } else {
        if (expenseAmount.value.length >= 8) {
          alert(`Maximum length  of *amount* is  8`)
        } else {
          let startFrom0 = expenseAmount.value.split('');
          console.log("🚀 ~ startFrom0:", startFrom0[0]);
          if (startFrom0[0] == '0') {
            alert(`Amount should not starts with *0*`)
          } else {
            alert(`Expense added`);
            let now = new Date();
            let formattedDateTime = now.toLocaleString();

            let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
            let daysDate = new Date();
            let dateNumber = daysDate.getDay();

            let dayName = days[dateNumber];
            console.log("🚀 ~ dayName:", dayName);

            let obj = {
              Type: `${expenseType.value}`,
              Amount: parseFloat(expenseAmount.value),
              DateAndTime: `${formattedDateTime}`,
              Day: dayName
            }
            totalArr.push(obj.Amount);

            listSection.style.display = 'block';
            listSection.style.transition = '0.6s ease in';
            arr.push(obj);
            console.log(arr)
            console.log(expenseType.value);
            console.log(expenseAmount.value)
            console.log("🚀 ~ arr:", arr);
            renderList();
          }
        }
      }
    } else {
      expenseType.value = '';
      alert(`Please enter *expense type* in string eg: Fees of institute`);
    }

  }
})


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

  console.log("The sum of the numbers is: " + sum);
  

  console.log(totalArr);

  arr.map((item, index) => {
    ulExpenseType.innerHTML += `<li>${item.Type} <button class="editBut"  onclick="editExpense(${index})">Edit <i class="fa-solid fa-pen-to-square"></i></button></li>`;
    ulExpenseAmount.innerHTML += `<li class="expense-amount">${item.Amount}  <button class="editBut" onclick="editAmount(${index})">Edit <i class="fa-solid fa-pen-to-square"></i></button></li>`;
    ulExpenseDate.innerHTML += `<li style="margin-top:7px" >${item.DateAndTime}</li>`;
    ulExpenseDay.innerHTML += `<li style="margin-top:7px">${item.Day}</li>`
    totalExpense.innerHTML = `Total Expense: ${sum}`
  });

}

function editExpense(index) {
  const updateExpenseType = prompt('Enter new expense type');

  let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  let daysDate = new Date();
  let dateNumber = daysDate.getDay();
if(updateExpenseType !== null && updateExpenseType !== ''){

  if (isNaN(updateExpenseType)) {
    let updatedExpense = {
      Type: updateExpenseType,
      Amount: arr[index].Amount,
      DateAndTime: new Date().toLocaleString(),
      Day: days[dateNumber]
    }

    arr.splice(index, 1, updatedExpense)
    renderList();

  } else {
    alert(`Please enter *string*`)
  }
}else{
  alert(`Please re enter expense`);
}
}

function editAmount(index) {
  let updatedExpenseAmount = prompt(`Enter new expense amount`);

  
  let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  let daysDate = new Date();
  let dateNumber = daysDate.getDay();
if(updatedExpenseAmount !== null && updatedExpenseAmount !== ''){

  if (isNaN(updatedExpenseAmount)) {
    alert(`Please enter *number*`);
  } else {
    let checkZero = updatedExpenseAmount.split('');
    console.log("🚀 ~ editAmount ~ checkZero:", checkZero)
    if(checkZero[0] === '0'){
      alert(`First number should not be *zero(0)*`)
    }else{

      
      totalArr.push(Number(updatedExpenseAmount))
    if (updatedExpenseAmount.length <= 8) {
      let updatedExpense = {
        Type: arr[index].Type,
        Amount: updatedExpenseAmount,
        DateAndTime: new Date().toLocaleString(),
        Day: days[dateNumber]
      }

      arr.splice(index, 1, updatedExpense);
      renderList();

    } else {
      alert(`You cannot enter amount which is greater than *8* digits`)
    }
  }
  }
}else{
  alert(`Please re enter amount`);
}
}