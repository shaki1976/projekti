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
  procenat: -1,
};

// fje za opste podatke
function calculateTotalExpenses() {
  let expen = 0;
  podaci.allItems.exp.forEach((item) => {
    expen += item.value;
  });
  podaci.totals.exp = expen;
}

function calculateTotalIncomes() {
  let inc = 0;
  podaci.allItems.inc.forEach((item) => {
    inc += item.value;
  });
  podaci.totals.inc = inc;
}

function calulateBudget(exp, inc) {
  return inc - exp;
}

export { calculateTotalExpenses, calculateTotalIncomes, calulateBudget };
