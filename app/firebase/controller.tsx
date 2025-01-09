'use client'
import nookies from 'nookies';
import { addData, getUser } from "./model";
import { errorMsg, successMsg } from './utils'
export async function login(user: string, pass: string) {
  // console.log("API Key:", process.env.NEXT_PUBLIC_FIREBASE_API_KEY);
  try {
    const getData = await getUser(user, pass).then((response) => {
      if (Object.keys(response).length === 0) return errorMsg('No data found.')
      Object.keys(response).map((key) => {
        nookies.set(null, key, response[key as keyof typeof response]);
        nookies.set(null, 'user_login', 'login');
      });
      return successMsg('Successfully Logged In.')
    })
    return getData
  } catch (error) {
    console.log(error)
    return errorMsg('check console for error.')
  }
}
// -------------------------- User -------------------------------------

// -------------------------- Income -----------------------------------
export interface IncomeData {
  description: string;
  expected: number;
  amount: number;
}
export async function income(arrayData: IncomeData) {
  if (arrayData.description === '' || arrayData.expected === 0 || arrayData.amount === 0) {
    return errorMsg('Please fill up all fields.')
  }
  if (arrayData.amount <= 0) {
    return errorMsg("Amount Can't be negative.")
  }
  if (arrayData.expected <= 0) {
    return errorMsg("Amount can't be negative.")
  }
  const data = {
    description: arrayData.description,
    expected: arrayData.expected,
    amount: arrayData.amount
  }
  return await addData('income', data)
}
// -------------------------- Bills -----------------------------------
export interface BillsData {
  description: string;
  dueDate: string;
  budget: number;
  actual: number;
}
export async function bills(arrayData: BillsData) {
  if (arrayData.description === '' || arrayData.dueDate === '' || arrayData.budget === 0 || arrayData.actual === 0) {
    return errorMsg('Please fill up all fields.')
  }
  // if (arrayData.budget <= 0) {
  //   return errorMsg("Amount Can't be negative.")
  // }
  const data = {
    description: arrayData.description,
    dueDate: arrayData.dueDate,
    budget: arrayData.budget,
    actual: arrayData.actual
  }
  return await addData('bills', data)
}
// -------------------------- Expenses ---------------------------------
export interface ExpensesData {
  category: string;
  budget: number;
}
export async function expenses(arrayData: ExpensesData) {
  if (arrayData.category === '' || arrayData.budget === 0) {
    return errorMsg('Please fill up all fields.')
  }
  // if (arrayData.budget <= 0) {
  //   return errorMsg("Amount Can't be negative.")
  // }
  const data = {
    description: arrayData.category,
    dueDate: arrayData.budget
  }
  return await addData('expenses', data)
}
// -------------------------- Expense Tracker --------------------------
export interface ExpenseTrackerData {
  date: string;
  amount: number;
  description: string;
  category: string;
}
export async function expenseTracker(arrayData: ExpenseTrackerData) {
  if (arrayData.description === '' || arrayData.date === '' || arrayData.amount === 0) {
    return errorMsg('Please fill up all fields.')
  }
  // if (arrayData.budget <= 0) {
  //   return errorMsg("Amount Can't be negative.")
  // }
  const data = {
    date: arrayData.date,
    amount: arrayData.amount,


    description: arrayData.description,


    category: arrayData.category
  }
  return await addData('expenseTracker', data)
}
// -------------------------- Saving -----------------------------------