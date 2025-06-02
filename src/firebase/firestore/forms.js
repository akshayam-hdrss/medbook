import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  updateDoc,
} from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { app } from "../config";
import { uploadFilesAndSaveURLs } from "./common";
const db = getFirestore(app);
const storage = getStorage(app);

export async function getForms() {
  try {
    const news = [];
    const result = await getDocs(collection(db, "forms"));
    result.forEach((doc) => {
      news.push({ id: doc.id, ...doc.data() });
    });
    return news;
  } catch (e) {
    console.log(e);
  }
}

export async function addForms(data) {
  try {
    await addDoc(collection(db, "forms"), data);
    console.log("news added");
  } catch (e) {
    console.log(e);
  }
}

export async function deleteForms(id) {
  try {
    await deleteDoc(doc(db, "forms", id));
    console.log("deleted news");
  } catch (e) {
    console.log(e);
  }
}

export async function getOneForms(id) {
  try {
    const snapshot = await getDoc(doc(db, `forms/${id}`));
    return snapshot.data();
  } catch (e) {
    console.log(e);
  }
}
