import { app } from "../config";
import {
  getFirestore,
  doc,
  collection,
  getDocs,
  addDoc,
} from "firebase/firestore";

const db = getFirestore(app);

export const submitFooterForm = async (name, number, email) => {
  try {
    await addDoc(collection(db, "footerforms"), {
      name: name,
      number: number,
      email: email,
    });
    console.log("submitted footer forms");
  } catch (e) {
    console.log(e);
  }
};

export const getFooterForms = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "footerforms"));
    const data = querySnapshot.docs.map((doc) => doc.data());
    return data;
  } catch (e) {
    console.log(e);
  }
};
