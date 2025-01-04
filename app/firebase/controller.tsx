'use client'
import nookies from 'nookies';
import {  getUser } from "./model";
import { errorMsg, successMsg } from './utils'
export async function login(user: string, pass: string) {
  // console.log("API Key:", process.env.NEXT_PUBLIC_FIREBASE_API_KEY);
  // try {
    const getData = await getUser(user, pass).then((response) => {
      if (Object.keys(response).length === 0) return errorMsg('No data found.')
      Object.keys(response).map((key) => {
        nookies.set(null, key, response[key as keyof typeof response]);
        nookies.set(null, 'user_login', 'login');
      });
      return successMsg('Successfully Logged In.')
    })
    return getData
  // } catch (error) {
  //   return errorMsg(error)
  // }
}
// -------------------------- User -------------------------------------

// -------------------------- Income -----------------------------------
// export async function income(arrayData: any) {
//   console.log('data controller')
//   if (arrayData.description === '' || arrayData.expected === '' || arrayData.amount === '') {
//     return errorMsg('Please fill up all fields.')
//   }
//   if (arrayData.amount <= 0) {
//     return errorMsg("Amount Can't be negative.")
//   }
//   if (arrayData.expected <= 0) {
//     return errorMsg("Amount can't be negative.")
//   }
//   // console.log(addIncome(arrayData))
//   console.log('nagana ba?')
//   // console.log(await addIncome(arrayData))
//   console.log('gumana naman')
//   // return console.log(arrayData)
// }