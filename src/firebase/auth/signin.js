import { signInWithEmailAndPassword, getAuth } from "firebase/auth";
import auth from "../config.js";

export default async function signIn(email, password) {
  let result = null;
  try {
    result = await signInWithEmailAndPassword(auth, email, password);
    return result.user;
  } catch (error) {
    console.error("Error signing in:", error);
    throw error;
  }
}
