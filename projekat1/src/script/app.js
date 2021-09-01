const budgetTitleMonth = document.querySelector(".budget__title--month");
const budgetValue = document.querySelector(".budget__value");
const budgetIncomeValue = document.querySelector(".budget__income--value");
const budgetExpensesValue = document.querySelector(".budget__expenses--value");
const budgetExpensesPercentage = document.querySelector(
  ".budget__expenses--percentage"
);

const selectType = document.querySelector(".add__type");
const addDescription = document.querySelector(".add__description");
const addValue = document.querySelector(".add__value");

const confirmButton = document.querySelector(".add__btn");

const incomeList = document.querySelector(".income__list");
const expensesList = document.querySelector(".expenses__list");

const allIncomes = [];
const allExpenses = [];

class Income {
  constructor(id, description, value){
    this.id = id;
    this.value = value;
    this.description = description;
  }
  addToArray(item,arr){
    arr.push(item);
  }
}

class Expense extends Income {
  constructor(id, description, value){
    super(id, description, value);
    this.percentage = -1;
  }
}