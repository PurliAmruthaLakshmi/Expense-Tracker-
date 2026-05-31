const form = document.getElementById("transaction-form");
const text = document.getElementById("text");
const amount = document.getElementById("amount");
const category = document.getElementById("category");

const balance = document.getElementById("balance");
const income = document.getElementById("income");
const expense = document.getElementById("expense");

const list = document.getElementById("transaction-list");

let transactions =
JSON.parse(localStorage.getItem("transactions")) || [];

function saveData() {
localStorage.setItem(
"transactions",
JSON.stringify(transactions)
);
}

function updateUI() {

list.innerHTML = "";

let totalIncome = 0;
let totalExpense = 0;

transactions.forEach((t,index)=>{

const li = document.createElement("li");

li.innerHTML = `
${t.text} (${t.category})
₹${t.amount}

<button onclick="deleteTransaction(${index})">
❌
</button>
`;

list.appendChild(li);

if(t.amount > 0)
totalIncome += Number(t.amount);
else
totalExpense += Math.abs(t.amount);

});

balance.textContent =
`₹${totalIncome-totalExpense}`;

income.textContent =
`₹${totalIncome}`;

expense.textContent =
`₹${totalExpense}`;

updateChart();
saveData();
}

form.addEventListener("submit",(e)=>{

e.preventDefault();

transactions.push({
text:text.value,
amount:Number(amount.value),
category:category.value
});

text.value="";
amount.value="";

updateUI();

});

function deleteTransaction(index){

transactions.splice(index,1);

updateUI();

}

let chart;

function updateChart(){

const categories={};

transactions.forEach(t=>{

if(t.amount<0){

categories[t.category] =
(categories[t.category]||0)
+ Math.abs(t.amount);

}

});

const labels =
Object.keys(categories);

const values =
Object.values(categories);

if(chart){
chart.destroy();
}

chart = new Chart(
document.getElementById("expenseChart"),
{
type:"pie",
data:{
labels:labels,
datasets:[{
data:values
}]
}
}
);

}

document
.getElementById("downloadBtn")
.addEventListener("click",()=>{

let csv =
"Description,Amount,Category\n";

transactions.forEach(t=>{

csv +=
`${t.text},${t.amount},${t.category}\n`;

});

const blob =
new Blob([csv],{
type:"text/csv"
});

const a =
document.createElement("a");

a.href =
URL.createObjectURL(blob);

a.download =
"expense-report.csv";

a.click();

});

updateUI();