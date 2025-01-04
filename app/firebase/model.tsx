'use server'
import {  collection, getDocs, limit, query, where } from "firebase/firestore";
// import { cookies } from "next/headers";
import { db } from "./firebase";
// import { errorMsg, successMsg } from './utils'

// -------------------------- User -------------------------------------
export async function getUser(user: string, pass: string) {
    try {
        const usersRef = collection(db, "users");

        const que = query(
            usersRef,
            where("username", "==", user),
            where("password", "==", pass),
            limit(1)
        );
        const querySnapshot = await getDocs(que);

        if (querySnapshot.empty) {
            console.log("No users found");
            return [];
        }
        // Get Multiple Data
        // const userData = querySnapshot.docs.map((doc) => ({
        //   id: doc.id,
        //   ...doc.data(),
        // }));

        // Get the first data since i use limit
        const doc = querySnapshot.docs[0];
        const userData = {
            id: doc.id,
            ...doc.data(),
        };

        return userData;
    } catch (error) {
        console.error("Error fetching users:", error);
        return [];
    }
}
// -------------------------- Income -----------------------------------
// export async function addIncome(arrayData: any) {
//     console.log('Income Added.')
//     const cookieStore = await cookies();
//     console.log(cookieStore.get('userID')?.value)
//     return cookieStore.get('userID')?.value
//     try {
//         const cookieStore = await cookies();
//         if (cookieStore)
//             if (!cookieStore.get('userID')?.value)
//                 return errorMsg('No LoggedIn User Found.')
//             else {
//                 const userID = cookieStore.get('userID')?.value
//                 const collectionRef = collection(db, 'income')
//                 await addDoc(collectionRef, {
//                     description: arrayData.description,
//                     expected: arrayData.expected,
//                     amount: arrayData.amount,
//                     user: userID,
//                     createdAt: new Date(),
//                     updatedAt: new Date()
//                 })
//                 return successMsg('Successfully Added.')
//             }
//         else
//             return errorMsg('No Cookies Found.')
//     } catch (error) {
//         return errorMsg(error)
//     }
// }


// -------------------------- Adjustment -------------------------------
// -------------------------- Bills ------------------------------------
// -------------------------- Expenses ---------------------------------
// -------------------------- Expense Tracker --------------------------
// -------------------------- Saving -----------------------------------

