export const brojaci = {
  brojacRashoda: 0,
  brojacPrihoda: 0,
};

export let podaci = {
  allItems: {
    exp: [],
    inc: [],
  },
  totals: {
    exp: 0,
    inc: 0,
  },
  budget: 0,
  percentage: -1,
};

// fje za opste podatke
function calculateTotalExpenses() {
  let expen = 0;
  podaci.allItems.exp.forEach((item) => {
    expen += item.value;
  });
  podaci.totals.exp = expen;
  return expen;
}

function calculateTotalIncomes() {
  let inc = 0;
  podaci.allItems.inc.forEach((item) => {
    inc += item.value;
  });
  podaci.totals.inc = inc;
  return inc;
}

function calulateBudget(exp, inc) {
  return inc - exp;
}

function calculatePercentage(inc, exp) {
  if (inc > 0) return Math.round((exp / inc) * 100);
  else return -1;
}

function calculation() {
  let totInc = calculateTotalIncomes();
  let totExp = calculateTotalExpenses();
  podaci.budget = calulateBudget(podaci.totals.exp, podaci.totals.inc);
  podaci.percentage = calculatePercentage(totInc, totExp);
}

function removeItem(id, tip, rendEl) {
  let index = podaci.allItems[tip].findIndex((item) => item.id == id);
  podaci.allItems[tip].splice(index, 1);
  rendEl.remove();

  calculation();
  renderTop(
    podaci.totals.inc,
    podaci.totals.exp,
    podaci.budget,
    podaci.percentage
  );
  reRenderPercentages();
  storeData();
}

let getMonth = (date) => {
  //let date = new Date();
  let month = date.getMonth();

  switch (month) {
    case 0:
      return "Januaru";
    case 1:
      return "Februaru";
    case 2:
      return "Martu";
    case 3:
      return "Aprilu";
    case 4:
      return "Maju";
    case 5:
      return "Junu";
    case 6:
      return "Julu";
    case 7:
      return "Augustu";
    case 8:
      return "Septembru";
    case 9:
      return "Oktobru";
    case 10:
      return "Novembru";
    case 11:
      return "Decembru";
    default:
      return -1;
  }
};

let getYear = (date) => {
  return date.getFullYear();
};

function storeData() {
  localStorage.clear(); //ovako se osiguravam da je uvek sacuvano sa poslednjom promenom
  const data = JSON.stringify(podaci);
  const sviPodaci = localStorage.setItem("podaci", data);
  return sviPodaci;
}
// function redFokus(el) {
//   if (el.value == "exp") {
//     this.classList.add("red-focus");
//   } else {
//     this.classList.remove("red-focus");
//   }
// }

export {
  calculateTotalExpenses,
  calculateTotalIncomes,
  calulateBudget,
  calculatePercentage,
  calculation,
  storeData,
  // redFokus,
};

// fje za renderovanje

function clearInputs(addDescription, addValue) {
  addDescription.value = "";
  addValue.value = "";
}

function prikaziDatum() {
  let date = new Date();
  const budgetTitleMonth = document.querySelector(".budget__title");
  budgetTitleMonth.textContent = "";
  budgetTitleMonth.textContent = `Dostupan budžet u ${getMonth(date)} ${getYear(
    date
  )}:`;
}

function renderTop(totInc, totExp, budg, perce) {
  const budgetValue = document.querySelector(".budget__value");
  const budgetIncomeValue = document.querySelector(".budget__income--value");
  const budgetExpensesValue = document.querySelector(
    ".budget__expenses--value"
  );
  const budgetExpensesPercentage = document.querySelector(
    ".budget__expenses--percentage"
  );

  let budgetSign = "+";
  if (totExp > totInc) budgetSign = "";
  budgetValue.textContent = `${budgetSign} ${budg.toFixed(2)}`;
  budgetIncomeValue.textContent = `+ ${totInc.toFixed(2)}`;
  budgetExpensesValue.textContent = `- ${totExp.toFixed(2)}`;

  if (perce === -1) budgetExpensesPercentage.textContent = "-";
  else budgetExpensesPercentage.textContent = `${perce}%`;
}

// renderovanje donjeg dela

const incomeList = document.querySelector(".income__list");
const expensesList = document.querySelector(".expenses__list");

function renderPercentage(value) {
  const itemPercentageDiv = document.createElement("div");
  itemPercentageDiv.className = "item__percentage";
  let perc = calculatePercentage(podaci.totals.inc, value);
  itemPercentageDiv.textContent = `${perc}%`;

  return itemPercentageDiv;
}

// function clearEventListeners(element) {
//   const clonedElement = element.cloneNode(true);
//   element.replaceWith(clonedElement);
//   return clonedElement;
// }
function reRenderPercentages() {
  let percentageElements = document.getElementsByClassName("item__percentage");
  percentageElements = Array.from(percentageElements);

  if (percentageElements.length > 0) {
    percentageElements.forEach((element) => {
      // const clonedElement = element.cloneNode(true); // nije potreban
      let text = element.previousElementSibling.textContent;
      text = text.trim().split(" ");
      text = Number(text[0]);
      let perc = calculatePercentage(podaci.totals.inc, text);
      element.textContent = `${perc}%`;
    });
  } else return;
}

function renderItem(tip, id, description, value) {
  let text = "";
  if (tip == "inc") text = "income-";
  else text = "expense-";

  const itemDiv = document.createElement("div");
  itemDiv.classList.add("item", "clearfix");
  itemDiv.id = `${text}${id}`;

  const itemDescriptionDiv = document.createElement("div");
  itemDescriptionDiv.classList.add("item", "clearfix");
  itemDescriptionDiv.textContent = `${description}`;

  const itemValueWrapper = document.createElement("div");
  itemValueWrapper.classList.add("right", "clearfix");

  itemDiv.append(itemDescriptionDiv, itemValueWrapper);

  let budgetSign = "+";
  if (tip == "exp") budgetSign = "-";
  const itemValueDiv = document.createElement("div");
  itemValueDiv.classList.add("item__value");
  itemValueDiv.textContent = `${budgetSign}${value}`;

  const itemPercentageDiv = renderPercentage(value);
  // const itemPercentageDiv = document.createElement("div");
  // itemPercentageDiv.className = "item__percentage";
  // let perc = calculatePercentage(podaci.totals.inc, value);
  // itemPercentageDiv.textContent = `${perc}`;

  const itemDeleteDiv = document.createElement("div");
  itemDeleteDiv.classList.add("item__delete");

  const itemDeleteBtn = document.createElement("button");
  itemDeleteBtn.classList.add("item__delete--btn");

  const deleteSign = document.createElement("i");
  deleteSign.className = "ion-ios-close-outline";

  itemDeleteBtn.append(deleteSign);
  itemDeleteDiv.append(itemDeleteBtn);
  if (tip == "exp")
    itemValueWrapper.append(itemValueDiv, itemPercentageDiv, itemDeleteDiv);
  else itemValueWrapper.append(itemValueDiv, itemDeleteDiv);

  itemDeleteBtn.addEventListener("click", () => {
    removeItem(id, tip, itemDiv);
  });

  if (tip == "inc") incomeList.append(itemDiv);
  else expensesList.append(itemDiv);
}

export {
  prikaziDatum,
  renderTop,
  renderItem,
  clearInputs,
  reRenderPercentages,
};
