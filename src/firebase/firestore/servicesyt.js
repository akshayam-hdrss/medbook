import { app } from "../config";
import {
  getFirestore,
  doc,
  updateDoc,
  getDoc,
  getDocs,
} from "firebase/firestore";
const db = getFirestore(app);

export const getYt = async (
  type,
  rootprevious = null,
  beforeprevious = null,
  previous = null
) => {
  try {
    let docRef;
    if (rootprevious) {
      docRef = doc(
        db,
        `${type}/${rootprevious}/${rootprevious}col/${beforeprevious}/${beforeprevious}col/${previous}`
      );
    } else if (beforeprevious) {
      docRef = doc(
        db,
        `${type}/${beforeprevious}/${beforeprevious}col/${previous}`
      );
    } else if (previous) {
      docRef = doc(db, `${type}/${previous}`);
    } else {
      docRef = doc(db, `${type}/yt`);
    }
    const snapshot = await getDoc(docRef);
    const data = snapshot.data().link;
    return data;
  } catch (e) {
    console.log(e);
  }
};

export const updateYt = async (
  link,
  type,
  rootprevious = null,
  beforeprevious = null,
  previous = null
) => {
  try {
    let docRef;
    if (rootprevious) {
      docRef = doc(
        db,
        `${type}/${rootprevious}/${rootprevious}col/${beforeprevious}/${beforeprevious}col/${previous}`
      );
    } else if (beforeprevious) {
      docRef = doc(
        db,
        `${type}/${beforeprevious}/${beforeprevious}col/${previous}`
      );
    } else if (previous) {
      docRef = doc(db, `${type}/${previous}`);
    } else {
      docRef = doc(db, `${type}/yt`);
    }

    await updateDoc(docRef, { link: link });
  } catch (e) {
    console.log(e);
  }
};
