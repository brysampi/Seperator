import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "./firebase";

export async function getUser(user: string, pass: string) {
  // console.log("API Key:", process.env.NEXT_PUBLIC_FIREBASE_API_KEY);
  try {
    const usersRef = collection(db, "users");
    
    const que = query(
      usersRef,
      where("username", "==", user),
      where("password", "==", pass)
    );
    const querySnapshot = await getDocs(que);

    if (querySnapshot.empty) {
      console.log("No users found");
      return [];
    }
    const users = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    // console.log('oo pasok')
    // console.log("Users fetched:", users);
    return users;
  } catch (error) {
    console.error("Error fetching users:", error);
    return [];
  }
}

