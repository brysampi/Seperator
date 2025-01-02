import { collection, getDocs, limit, query, where } from "firebase/firestore";
import { db } from "./firebase";
import nookies from 'nookies';

export async function login(user: string, pass: string) {
  const getData = await getUser(user, pass).then((response) => {
     console.log(Array.isArray(response))

    

    // nookies.set(null, 'user_login', 'login');
  })
  return getData
}
export async function getUser(user: string, pass: string) {
  // console.log("API Key:", process.env.NEXT_PUBLIC_FIREBASE_API_KEY);
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
    // const users = querySnapshot.docs.map((doc) => ({
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

