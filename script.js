document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("expense-form");
  const descriptionInput = document.getElementById("description");
  const amountInput = document.getElementById("amount");
  const expenseList = document.getElementById("expense-list");

  // Load existing expenses from localStorage (if any)
  let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

  // Function to render the expenses list
  function renderExpenses() {
    expenseList.innerHTML = "";
    expenses.forEach((expense, index) => {
      const li = document.createElement("li");
      li.innerHTML = `
        ${expense.description}: $${expense.amount}
        <button class="delete" onclick="deleteExpense(${index})">Delete</button>
      `;
      expenseList.appendChild(li);
    });
  }

  // Add an expense
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const description = descriptionInput.value;
    const amount = parseFloat(amountInput.value);

    if (description && amount) {
      expenses.push({ description, amount });
      localStorage.setItem("expenses", JSON.stringify(expenses));

      descriptionInput.value = "";
      amountInput.value = "";

      renderExpenses();
    }
  });

  // Delete an expense
  window.deleteExpense = function (index) {
    expenses.splice(index, 1);
    localStorage.setItem("expenses", JSON.stringify(expenses));
    renderExpenses();
  };

  // Initial render of expenses
  renderExpenses();
});
