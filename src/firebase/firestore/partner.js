import { app } from "../config";
import {
  getFirestore,
  doc,
  addDoc,
  setDoc,
  collection,
  updateDoc,
  getDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import {
  ref,
  deleteObject,
  getStorage,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { uploadIcons } from "@/firebase/firestore/common";
const db = getFirestore(app);
const storage = getStorage(app);

export async function uploadPartnerImages(photos) {
  try {
    const uploadPromises = photos.map((file) => {
      const storageRef = ref(storage, `partnergallery/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);
      return new Promise((resolve, reject) => {
        uploadTask.on(
          "state_changed",
          null,
          (error) => reject(error),
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then(resolve).catch(reject);
          }
        );
      });
    });
    const downloadURLs = await Promise.all(uploadPromises);
    return downloadURLs;
  } catch (e) {
    console.log(e);
  }
}
export async function addPartner(data, photo = null) {
  try {
    let profile;
    if (photo != null) {
      profile = await uploadIcons(photo, "partner");
      data.profile = profile;
    }
    const result = await updateDoc(doc(db, "partner", "partner"), data);
    console.log("update partner");
  } catch (e) {
    console.log(e);
  }
}
export async function getPartner() {
  try {
    const result = await getDoc(doc(db, "partner", "partner"));
    if (result.exists()) {
      return result.data();
    }
  } catch (e) {
    console.log(e);
  }
}

export async function getGallery() {
  try {
    const snapshot = await getDoc(doc(db, "partner/partner"));
    return snapshot.data().gallery;
  } catch (e) {
    console.log(e);
  }
}

export async function addGallery(photos) {
  try {
    const urls = await uploadPartnerImages(photos);
    urls.map(async (photo) => {
      await updateDoc(doc(db, "partner/partner"), {
        gallery: arrayUnion(photo),
      });
    });
  } catch (e) {
    console.log(e);
  }
}

export async function deleteGalleryPhoto(photo) {
  try {
    const storageRef = ref(storage, photo);
    await deleteObject(storageRef);
    await updateDoc(doc(db, "partner/partner"), {
      gallery: arrayRemove(photo),
    });
  } catch (e) {
    console.log(e);
  }
}
