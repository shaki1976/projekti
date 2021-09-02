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
  brojacRashoda: 0,
  brojacPrihoda: 0,
}

let podaci = {
  allItems: {
    exp: [],
    inc: []
  },
  totals: {
    exp: 0,
    inc: 0
  },
  budget: 0,
  procenat: -1
};

function isValid() {
  let isValid = true;
  if(Number(addValue.value) < 0 || Number(addValue.value) == NaN) isValid = false;
//  if(selectType.value != 'exp' || selectType.value != 'inc' ) isValid = false;
 if(addDescription.value.trim() == "") isValid = false;

return isValid;
}

class Item {
  constructor(id, description, value) {
    this.id = id;
    this.value = Number(value);
    this.description = description;
  }
 static addItem(tip, description, value) {
    if(!isValid()) return;

    let item;
    let id;
    if (tip == 'inc') {
      id = brojaci.brojacPrihoda++;
      item = new Income(id, description, value);
      podaci.allItems.inc.push(item);
    } else {
      id = brojaci.brojacRashoda++;
      item = new Expense(id, description, value);
      podaci.allItems.exp.push(item);
    }
    console.log(selectType.value)
    console.log(isValid());
    console.log(podaci);
    return item;
  }

  removeItem(id, tip){
    let index = podaci.allItems[tip].findIndex((item) => item.id == id);
    podaci.allItems[tip].splice(index,1);
  }
}

class Income extends Item {
  constructor(id, description, value){super(id, description, value)}
  
}

class Expense extends Item {
  constructor(id, description, value) {
    super(id, description, value);
    this.percentage = -1;
  }
}

function addingItemHandler(){
 Item.addItem(selectType.value, addDescription.value, addValue.value)
}

confirmButton.addEventListener('click', addingItemHandler )