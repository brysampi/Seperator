'use client'
import AddIncome from "./components/Income";
import LoginPage from "./components/LoginPage";
import AddBiils from "./components/Bills";
import AddExpenses from "./components/Expenses";
import AddExpensesTracker from "./components/ExpenseTrackker";

export default function Home() {
  return (
    <div>
      <LoginPage />
      <br />
      ------------- Income -------------
      <br />
      <AddIncome />
      ------------- Bills -------------
      <br />
      <AddBiils />
      ------------- Expenses -------------
      <br />
      <AddExpenses />
      ------------- Expenses Tracker -------------
      <br />
      <AddExpensesTracker />
    </div>
  )
}
