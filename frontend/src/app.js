import { bindFormSubmit } from "./expenses-create/bind-form.js";
import { showExpenses } from "./expenses-list/show-expenses.js";

const form = document.getElementById("expense-form");
const container = document.getElementById("app");

bindFormSubmit(form, container);
showExpenses(container);