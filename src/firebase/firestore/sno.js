import { app } from "../config";
import {
  getFirestore,
  doc,
  collection,
  setDoc,
  getDoc,
  getDocs,
  deleteDoc,
  arrayRemove,
  arrayUnion,
  updateDoc,
  where,
  query,
  orderBy,
} from "firebase/firestore";
import { ref, deleteObject, getStorage } from "firebase/storage";

import { uploadFilesAndSaveURLs } from "@/firebase/firestore/common";

const db = getFirestore(app);
const storage = getStorage(app);

export async function getSnoLevel1ServicesProducts(type) {
  try {
    let data = [];
    const q = query(
      collection(db, type),
      where("__name__", "not-in", ["ads", "yt"]),
      orderBy("sno")
    );
    const snapshot = await getDocs(q);
    snapshot.forEach((doc) => {
      data.push({ id: doc.id, sno: doc.data().sno, name: doc.data().name });
    });
    return data;
  } catch (e) {
    console.log(e);
  }
}

export async function addSnoLevel1ServicesProducts(type, data) {
  try {
    data.map(async (value) => {
      await setDoc(
        doc(db, `${type}/${value.id}`),
        {
          sno: Number(value.sno),
        },
        { merge: true }
      );
    });
    console.log("updated sno level1");
  } catch (e) {
    console.log(e);
  }
}

export async function getSnoLevel2ServicesProducts(level1, type) {
  try {
    let data = [];
    const q = query(
      collection(db, `${type}/${level1}/${level1}col`),
      where("__name__", "not-in", ["ads", "yt"]),
      orderBy("sno")
    );
    const snapshot = await getDocs(q);
    snapshot.forEach((doc) => {
      data.push({ id: doc.id, sno: doc.data().sno, name: doc.data().name });
    });
    return data;
  } catch (e) {
    console.log(e);
  }
}

export async function addSnoLevel2ServicesProducts(level1, type, data) {
  try {
    data.map(async (value) => {
      await setDoc(
        doc(db, `${type}/${level1}/${level1}col/${value.id}`),
        {
          sno: Number(value.sno),
        },
        { merge: true }
      );
    });
    console.log("updated sno level2");
  } catch (e) {
    console.log(e);
  }
}

export async function getSnoLevel3ServicesProducts(level1, level2, type) {
  try {
    let data = [];
    const q = query(
      collection(db, `${type}/${level1}/${level1}col/${level2}/${level2}col`),
      where("__name__", "not-in", ["ads", "yt"]),
      orderBy("sno")
    );
    const snapshot = await getDocs(q);
    snapshot.forEach((doc) => {
      data.push({ id: doc.id, sno: doc.data().sno, name: doc.data().name });
    });
    return data;
  } catch (e) {
    console.log(e);
  }
}

export async function addSnoLevel3ServicesProducts(level1, level2, type, data) {
  try {
    data.map(async (value) => {
      await setDoc(
        doc(
          db,
          `${type}/${level1}/${level1}col/${level2}/${level2}col/${value.id}`
        ),
        {
          sno: Number(value.sno),
        },
        { merge: true }
      );
    });
    console.log("updated sno level2");
  } catch (e) {
    console.log(e);
  }
}
