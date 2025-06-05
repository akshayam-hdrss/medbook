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
} from "firebase/firestore";
import { ref, deleteObject, getStorage, getMetadata } from "firebase/storage";

import { uploadFilesAndSaveURLs } from "@/firebase/firestore/common";

const db = getFirestore(app);
const storage = getStorage(app);

export async function deleteAdImages(ad) {
  try {
    const storageRef = ref(storage, ad);
    await getMetadata(storageRef)
      .then(() => {
        deleteObject(storageRef)
          .then(() => console.log("deleted images"))
          .catch((e) => console.log(e));
      })
      .catch((e) => console.log(e));
  } catch (e) {
    console.log(e);
  }
}

export const getServiceAds = async (
  type = null,
  rootprevious = null,
  beforeprevious = null,
  previous = null,
  home = null
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
    } else if (home) {
      docRef = doc(db, "advertisements/ads");
    } else {
      docRef = doc(db, `${type}/ads`);
    }
    const snapshot = await getDoc(docRef);
    const data = snapshot.data().ads;
    return data;
  } catch (e) {
    console.log(e);
  }
};

export const updateServiceAds = async (
  ads,
  type,
  rootprevious = null,
  beforeprevious = null,
  previous = null,
  home = null
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
    } else if (home) {
      docRef = doc(db, "advertisements/ads");
    } else {
      docRef = doc(db, `${type}/ads`);
    }
    const adUrls = await uploadFilesAndSaveURLs(ads);
    adUrls.map(async (ad) => {
      await updateDoc(docRef, { ads: arrayUnion(ad) });
    });
  } catch (e) {
    console.log(e);
  }
};
export const deleteServiceAds = async (
  valueToDelete,
  type,
  rootprevious = null,
  beforeprevious = null,
  previous = null,
  home = null
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
    } else if (home) {
      docRef = doc(db, "advertisements/ads");
    } else {
      docRef = doc(db, `${type}/ads`);
    }

    await updateDoc(docRef, {
      ads: arrayRemove(valueToDelete),
    });
    console.log("ad removed");
    await deleteAdImages(valueToDelete);
  } catch (e) {
    console.log(e);
  }
};
