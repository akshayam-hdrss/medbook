import {
  addDoc,
  collection,
  getDocs,
  getFirestore,
  where,
  query,
} from "firebase/firestore";
import { app } from "../config";

const db = getFirestore(app);

export const addReview = async (data) => {
  try {
    await addDoc(collection(db, "reviews"), data);
    console.log("success adding review");
  } catch (e) {
    console.log(e);
  }
};

export const getReviews = async (id) => {
  try {
    const q = query(collection(db, "reviews"), where("fourthid", "==", id));
    const querySnapshot = await getDocs(q);
    const reviews = querySnapshot.docs.map((doc) => doc.data());
    return reviews;
  } catch (e) {
    console.log(e);
  }
};
