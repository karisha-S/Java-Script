/** @typedef {{ id: number, date: string, amount: number, category: string, description: string }} Transaction */

let transactions = [];
let idCounter = 0;

const tableBody = document.querySelector("#transactionTable tbody");
const totalDisplay = document.getElementById("total");
const fullDescription = document.getElementById("fullDescription");
const form = document.getElementById("transactionForm");

/**
 * Добавляет транзакцию в список
 * @param {Event} e
 */
form.addEventListener("submit", function (e) {
  e.preventDefault();
  addTransaction();
});

/**
 * Создаёт и добавляет новую транзакцию
 */
function addTransaction() {
  const amount = parseFloat(document.getElementById("amount").value);
  const category = document.getElementById("category").value.trim();
  const description = document.getElementById("description").value.trim();

  if (isNaN(amount) || category === "" || description === "") {
    alert("Пожалуйста, заполните все поля корректно.");
    return;
  }

  const transaction = {
    id: ++idCounter,
    date: new Date().toLocaleString(),
    amount,
    category,
    description,
  };

  transactions.push(transaction);
  addTransactionToTable(transaction);
  calculateTotal();
  form.reset();
}

/**
 * Добавляет строку транзакции в таблицу
 * @param {Transaction} transaction
 */
function addTransactionToTable(transaction) {
  const tr = document.createElement("tr");
  tr.className = transaction.amount >= 0 ? "green" : "red";
  tr.dataset.id = transaction.id;

  tr.innerHTML = `
    <td>${transaction.id}</td>
    <td>${transaction.date}</td>
    <td>${transaction.category}</td>
    <td>${transaction.description.split(" ").slice(0, 4).join(" ")}</td>
    <td><button class="delete-btn">Удалить</button></td>
  `;

  tableBody.appendChild(tr);
}

/**
 * Удаляет транзакцию по ID
 * @param {number} id
 */
function deleteTransaction(id) {
  transactions = transactions.filter(t => t.id !== id);
  const row = document.querySelector(`tr[data-id="${id}"]`);
  if (row) row.remove();
  calculateTotal();
}

/**
 * Пересчитывает и отображает общую сумму транзакций
 */
function calculateTotal() {
  const total = transactions.reduce((sum, t) => sum + t.amount, 0);
  totalDisplay.textContent = `Общая сумма: ${total}`;
}

// Делегирование событий: удаление и отображение подробного описания
document.querySelector("table").addEventListener("click", function (e) {
  const target = e.target;

  if (target.classList.contains("delete-btn")) {
    const row = target.closest("tr");
    const id = Number(row.dataset.id);
    deleteTransaction(id);
  } else if (target.closest("tr") && !target.classList.contains("delete-btn")) {
    const id = Number(target.closest("tr").dataset.id);
    const transaction = transactions.find(t => t.id === id);
    if (transaction) {
      fullDescription.textContent = `Полное описание: ${transaction.description}`;
    }
  }
});
