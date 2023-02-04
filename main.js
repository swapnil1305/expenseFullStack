function saveToLocalStorage(event){
    event.preventDefault();
    const amount=event.target.amount.value;
    const description=event.target.description.value;
    const category=event.target.category.value;
    const obj={
        amount,description,category
    }
    axios.post("http://localhost:6000/addexpenses", obj)
    .then((response) => {
        console.log(response);
        showNewExpenseOnScreen(response.data.newExpense);
    })
    .catch((err) => {
        document.body.innerHTML = document.body.innerHTML + "<h3> Something went wrong </h3>"
        console.log(err);
    })
    //localStorage.setItem(obj.description, JSON.stringify(obj))
        //showNewExpenseOnScreen(obj)
}


document.addEventListener('DOMContentLoaded', () => {
    axios.get("http://localhost:6000/getexpenses")
    .then((response) => {
        console.log(response);
        for(var i=0; i<response.data.length; i++){
            showNewExpenseOnScreen(response.data.allExpenses[i]);
        }
    })
    .catch((err) => {
        console.log(err)
    });
});

function showNewExpenseOnScreen(expense){
    document.getElementById('amount').value='';
    document.getElementById('description').value='';
    document.getElementById('category').value='';

    const parentNode=document.getElementById('listOfExpenses');
    //const childHTML=`<li> ${expense.amount} ${expense.description} ${expense.category} </li>`
    const childHTML=`<li id=${expense.id}>${expense.amount} ${expense.description} ${expense.category}
        <button onclick=deleteExpense('${expense.id}')>Delete Expenses</button>
        <button onclick=editExpense('${expense.amount}','${expense.description}','${expense.category}','${expense.id}')>Edit Expense</button>
        </li>`
        parentNode.innerHTML = parentNode.innerHTML + childHTML;
}

function editExpense(amount,description,category,expenseId){
    document.getElementById('amount').value=amount;
    document.getElementById('description').value=description;
    document.getElementById('category').value=category;

    deleteExpense(expenseId)
}

function deleteExpense(expenseId){
    axios.delete(`https://http://localhost:6000/deleteexpenses/${expenseId}`)
    .then((response) => {
        removeExpenseFromScreen(expenseId);
    })
    .catch((err) => console.log(err));
    /* console.log(description)
    localStorage.removeItem(description);
    removeUserFromScreen(description); */
}
 function removeExpenseFromScreen(expenseId){
    const parentNode=document.getElementById('listOfExpenses');
    const childNodeToBeDeleted= document.getElementById(expenseId)
    parentNode.removeChild(childNodeToBeDeleted)
 }