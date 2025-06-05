import { createUserWithEmailAndPassword } from "firebase/auth";
import auth from "../config.js";
import { app } from "../config";

import { doc, setDoc, getFirestore } from "firebase/firestore";
const db = getFirestore(app);

export default async function signUp(
  mobile = null,
  email,
  password,
  name,
  executive
) {
  let result = null;
  try {
    result = await createUserWithEmailAndPassword(auth, email, password);
    const user = result.user;
    if (executive == true) {
      await setDoc(doc(db, "executives", user.uid), {
        username: name,
        email: user.email,
        mobile: mobile,
        execstatus: "inactive",
      });
    } else {
      await setDoc(doc(db, "users", user.uid), {
        name: name,
        email: user.email,
        mobile: mobile,
      });
    }
    await setDoc(doc(db, "users", user.uid), {
      username: name,
      email: user.email,
      executive: executive,
      mobile: mobile,
    });
    return user;
  } catch (error) {
    console.error("Error signing up:", error);
    throw error;
  }
}
