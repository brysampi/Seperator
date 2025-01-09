'use server'
import { addDoc, collection, getDocs, limit, query, where } from "firebase/firestore";
import { cookies } from "next/headers";
import { db } from "./firebase";
import { errorMsg, successMsg } from './utils'

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
export async function addData(table: string, arrayData: { [key: string]: string | number }) {
    try {
        const cookieStore = await cookies();
        if (cookieStore)
            if (!cookieStore.get('id')?.value)
                return errorMsg('No LoggedIn User Found.')
            else {
                const userID = cookieStore.get('id')?.value
                const collectionRef = collection(db, table)
                await addDoc(collectionRef, { ...arrayData, user: userID, createdAt: new Date() })
                return successMsg('Successfully Added.')
            }
        else
            return errorMsg('No Cookies Found.')
    } catch (error) {
        console.log(error)
        return errorMsg('check console for error.')
    }
}