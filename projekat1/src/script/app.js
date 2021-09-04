import { brojaci, podaci } from "./service.js";
import { calculation } from "./service.js";
import { prikaziDatum, renderTop, renderItem, clearInputs } from "./service.js";

// const budgetTitleMonth = document.querySelector(".budget__title");
// const budgetValue = document.querySelector(".budget__value");
// const budgetIncomeValue = document.querySelector(".budget__income--value");
// const budgetExpensesValue = document.querySelector(".budget__expenses--value");
// const budgetExpensesPercentage = document.querySelector(
//   ".budget__expenses--percentage"
// );

// preuzimanje objekata, koji mi trebaju globalno, iz doma
const selectType = document.querySelector(".add__type");
const addDescription = document.querySelector(".add__description");
const addValue = document.querySelector(".add__value");

const confirmButton = document.querySelector(".add__btn");

// const incomeList = document.querySelector(".income__list");
// const expensesList = document.querySelector(".expenses__list");

// vrsim renderovanje datuma i budget, rashod, prrihod na nulu
prikaziDatum();
renderTop(
  podaci.totals.inc,
  podaci.totals.exp,
  podaci.budget,
  podaci.percentage
);

// fja za validaciju ulaznih podataka
function isValid() {
  let isValid = true;
  if (Number(addValue.value) < 0 || Number(addValue.value) == NaN)
    isValid = false;
  //  if(selectType.value != 'exp' || selectType.value != 'inc' ) isValid = false;
  if (addDescription.value.trim() == "") isValid = false;

  return isValid;
}

// opsta klasa Item sa
class Item {
  constructor(id, description, value) {
    this.id = id;
    this.value = Number(value);
    this.description = description;
  }
  static addItem(tip, description, value) {
    if (!isValid()) return;

    let item;
    let id;
    if (tip == "inc") {
      id = brojaci.brojacPrihoda++;
      item = new Income(id, description, value);
      podaci.allItems.inc.push(item);
      renderItem(tip, id, description, value);
    } else {
      id = brojaci.brojacRashoda++;
      item = new Expense(id, description, value);
      podaci.allItems.exp.push(item);
      renderItem(tip, id, description, value);
    }

    console.log(selectType.value);
    console.log(isValid());
    console.log(podaci);
    return item;
  }

  //odavde nisam mogao da je povezem  pa sam je prebacio u service.js

  // static removeItem(id, tip, rendEl) {
  //   let index = podaci.allItems[tip].findIndex((item) => item.id == id);
  //   podaci.allItems[tip].splice(index, 1);
  //   rendEl.remove();
  // }
}

class Income extends Item {
  constructor(id, description, value) {
    super(id, description, value);
  }
}

class Expense extends Item {
  constructor(id, description, value) {
    super(id, description, value);
    this.percentage = -1;
  }
}
// console.log(podaci, brojaci);

function addingItemHandler() {
  Item.addItem(selectType.value, addDescription.value, addValue.value);
  calculation();
  // let totInc = calculateTotalIncomes();
  // let totExp = calculateTotalExpenses();
  // podaci.budget = calulateBudget(podaci.totals.exp, podaci.totals.inc);
  // podaci.percentage = calculatePercentage(totInc, totExp);

  renderTop(
    podaci.totals.inc,
    podaci.totals.exp,
    podaci.budget,
    podaci.percentage
  );

  clearInputs(addDescription, addValue);
  console.log(podaci);
}

confirmButton.addEventListener("click", addingItemHandler);
