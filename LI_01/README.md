# Индивидуальная (лабораторная) работа №1

# Анализатор транзакций (Transaction Analyzer)

## Описание

Данный проект представляет собой консольное приложение для анализа транзакций на JavaScript. Приложение загружает данные из файла `transactions.json`, анализирует их и предоставляет различные методы для работы с транзакциями.

## Файлы проекта

- `transactions.json`– содержит список транзакций в формате JSON.
- `index.js` – основной файл, где реализована логика работы с транзакциями.
- `TransactionAnalyzer.js` – содержит класс `TransactionAnalyzer`, который выполняет анализ данных.

## Установка и запуск

### 1. Установите Node.js

Перед запуском убедитесь, что у вас установлен **Node.js**. Проверить можно командой:


`node -v`


Если Node.js не установлен, скачайте и установите его с официального сайта (https://nodejs.org/).

### 2. Запуск проекта

Перейдите в папку проекта и выполните команду:


`node index.js`


## Функции `TransactionAnalyzer`

Класс `TransactionAnalyzer` включает в себя следующие методы:

1. **`addTransaction(transaction)`** – добавляет новую транзакцию.
2. **`getAllTransaction()`** – возвращает список всех транзакций.
3. **`getUniqueTransactionType()`** – возвращает массив уникальных типов транзакций.
4. **`calculateTotalAmount()`** – вычисляет общую сумму всех транзакций.
5. **`calculateTotalAmountByDate(year, month, day)`** – считает сумму транзакций за определённую дату.
6. **`getTransactionByType(type)`** – возвращает список транзакций определённого типа (`debit` или `credit`).
7. **`getTransactionsInDateRange(startDate, endDate)`** – ищет транзакции в заданном диапазоне дат.
8. **`getTransactionsByMerchant(merchantName)`** – фильтрует транзакции по названию компании.
9. **`calculateAverageTransactionAmount()`** – рассчитывает среднюю сумму всех транзакций.
10. **`getTransactionsByAmountRange(minAmount, maxAmount)`** – возвращает транзакции в заданном диапазоне сумм.
11. **`calculateTotalDebitAmount()`** – вычисляет сумму всех `debit`-транзакций.
12. **`findMostTransactionsMonth()`** – находит месяц с наибольшим количеством транзакций.
13. **`findMostDebitTransactionMonth()`** – находит месяц с наибольшим числом `debit`-транзакций.
14. **`mostTransactionTypes()`** – определяет, каких транзакций больше (`debit` или `credit`).
15. **`getTransactionsBeforeDate(date)`** – находит все транзакции до указанной даты.
16. **`findTransactionById(id)`** – ищет транзакцию по ID.
17. **`mapTransactionDescriptions()`** – возвращает массив с описаниями всех транзакций.

## Пример данных `transactions.json`

```json
[
    {
        "transaction_id": "1",
        "transaction_date": "2019-01-01",
        "transaction_amount": "100.00",
        "transaction_type": "debit",
        "transaction_description": "Payment for groceries",
        "merchant_name": "SuperMart",
        "card_type": "Visa"
    }
]
```

## Ответы на контрольные вопросы

1. **Какие примитивные типы данных существуют в JavaScript?**
   
   В JavaScript существуют следующие примитивные типы данных:
   - `string` (строка)
   - `number` (число)
   - `bigint` (большие числа)
   - `boolean` (логический тип: true/false)
   - `undefined` (значение не присвоено)
   - `null` (отсутствие значения)
   - `symbol` (уникальные идентификаторы)

2. **Какие методы массивов вы использовали для обработки и анализа данных в вашем приложении, и как они помогли в выполнении задачи?**
   
   В проекте использовались методы массивов, такие как:
   - `map()` – применялся для создания массива описаний транзакций.
   - `filter()` – использовался для поиска транзакций по типу, диапазону сумм и датам.
   - `reduce()` – применялся для вычисления общей суммы транзакций.
   - `find()` – использовался для поиска транзакции по ID.
   - `some()` – проверялось, есть ли хотя бы одна транзакция определённого типа.
   - `sort()` – использовался для сортировки транзакций по дате или сумме.

3. **В чем состоит роль конструктора класса?**
   
   Конструктор класса (`constructor`) в JavaScript инициализирует объект при создании экземпляра класса. В нашем случае конструктор `TransactionAnalyzer` загружает и сохраняет список транзакций в память.

4. **Каким образом вы можете создать новый экземпляр класса в JavaScript?**
   
   Новый экземпляр класса создаётся с помощью оператора `new`. Например:
   
   ```js
   const analyzer = new TransactionAnalyzer();
   ```

