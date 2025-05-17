const fs = require("fs");

// Загружаем JSON-файл с транзакциями
const transactions = JSON.parse(fs.readFileSync("transaction.json"));

// Класс для представления транзакции
class Transaction {
    constructor({ transaction_id, transaction_date, transaction_amount, transaction_type, transaction_description, merchant_name, card_type }) {
        this.transaction_id = transaction_id;
        this.transaction_date = transaction_date;
        this.transaction_amount = parseFloat(transaction_amount);
        this.transaction_type = transaction_type;
        this.transaction_description = transaction_description;
        this.merchant_name = merchant_name;
        this.card_type = card_type;
    }

    // Возвращает строковое представление транзакции
    string() {
        return JSON.stringify(this, null, 2);
    }
}

// Класс для анализа транзакций
class TransactionAnalyzer {
    constructor(transactions) {
        this.transactions = transactions.map(t => new Transaction(t));
    }

    addTransaction(transaction) {
        this.transactions.push(new Transaction(transaction));
    }

    getAllTransactions() {
        return this.transactions;
    }

    getUniqueTransactionType() {
        return [...new Set(this.transactions.map(t => t.transaction_type))];
    }

    calculateTotalAmount() {
        return this.transactions.reduce((sum, t) => sum + t.transaction_amount, 0);
    }

    calculateTotalAmountByDate(year, month, day) {
        return this.transactions
            .filter(t => {
                const date = new Date(t.transaction_date);
                return (!year || date.getFullYear() === year) &&
                       (!month || date.getMonth() + 1 === month) &&
                       (!day || date.getDate() === day);
            })
            .reduce((sum, t) => sum + t.transaction_amount, 0);
    }

    getTransactionByType(type) {
        return this.transactions.filter(t => t.transaction_type === type);
    }

    getTransactionsInDateRange(startDate, endDate) {
        return this.transactions.filter(t => {
            const date = new Date(t.transaction_date);
            return date >= new Date(startDate) && date <= new Date(endDate);
        });
    }

    getTransactionsByMerchant(merchantName) {
        return this.transactions.filter(t => t.merchant_name === merchantName);
    }

    calculateAverageTransactionAmount() {
        return this.calculateTotalAmount() / this.transactions.length;
    }

    getTransactionsByAmountRange(minAmount, maxAmount) {
        return this.transactions.filter(t => t.transaction_amount >= minAmount && t.transaction_amount <= maxAmount);
    }

    calculateTotalDebitAmount() {
        return this.getTransactionByType("debit").reduce((sum, t) => sum + t.transaction_amount, 0);
    }

    findMostTransactionsMonth() {
        const count = {};
        this.transactions.forEach(t => {
            const month = t.transaction_date.slice(0, 7);
            count[month] = (count[month] || 0) + 1;
        });
        return Object.keys(count).reduce((a, b) => count[a] > count[b] ? a : b);
    }

    findMostDebitTransactionMonth() {
        const count = {};
        this.getTransactionByType("debit").forEach(t => {
            const month = t.transaction_date.slice(0, 7);
            count[month] = (count[month] || 0) + 1;
        });
        return Object.keys(count).reduce((a, b) => count[a] > count[b] ? a : b);
    }

    mostTransactionTypes() {
        const debitCount = this.getTransactionByType("debit").length;
        const creditCount = this.getTransactionByType("credit").length;
        return debitCount > creditCount ? "debit" : creditCount > debitCount ? "credit" : "equal";
    }

    getTransactionsBeforeDate(date) {
        return this.transactions.filter(t => new Date(t.transaction_date) < new Date(date));
    }

    findTransactionById(id) {
        return this.transactions.find(t => t.transaction_id === id);
    }

    mapTransactionDescriptions() {
        return this.transactions.map(t => t.transaction_description);
    }
}

// Создаем объект анализатора и тестируем методы
const analyzer = new TransactionAnalyzer(transactions);
//console.log(analyzer.getUniqueTransactionType());
//console.log(analyzer.calculateTotalAmount()); // Общая сумма всех транзакций
//console.log(analyzer.getTransactionByType('debit')); // Все транзакции типа 'debit'
console.log(analyzer.findTransactionById('5')); // Найти транзакцию по ID

