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

const brojaci = {
  brojacRashoda = 0,
  brojacPrihoda = 0,
}

let podaci = {
  allItems: { 
  exp:[],
  inc:[]
  },
  totals:{
      exp:0,
      inc:0
  },
  budget: 0,
  procenat: -1
};



class Item {
  constructor(id, description, value) {
    this.id = id;
    this.value = value;
    this.description = description;
  }
  addItem(tip, description, value){
    let item;
    let id;
    if(tip == 'inc') {
      id = brojacPrihoda++;
      item = new Income(id,description, value);
prihodi++;
    }else {
      id = brojacRashoda++;
      item = new Expense(id,description, value);
      rashodi++;
    }
    return item;
  }
}

class Income extends Item {
  super(id, description, value);
}

class Expense extends Item {
  constructor(id, description, value) {
    super(id, description, value);
    this.percentage = -1;
  }
}

