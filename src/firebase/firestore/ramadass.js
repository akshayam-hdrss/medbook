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

export async function uploadRamadassImages(photos) {
  try {
    const uploadPromises = photos.map((file) => {
      const storageRef = ref(storage, `ramadassgallery/${file.name}`);
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
export async function addRamadass(data, photo = null) {
  try {
    let profile;
    if (photo != null) {
      profile = await uploadIcons(photo, "ramadass");
      data.profile = profile;
    }
    const result = await updateDoc(doc(db, "ramadass", "ramadass"), data);
    console.log("update ramadass");
  } catch (e) {
    console.log(e);
  }
}
export async function getRamadass() {
  try {
    const result = await getDoc(doc(db, "ramadass", "ramadass"));
    if (result.exists()) {
      return result.data();
    }
  } catch (e) {
    console.log(e);
  }
}

export async function getGallery() {
  try {
    const snapshot = await getDoc(doc(db, "ramadass/ramadass"));
    return snapshot.data().gallery;
  } catch (e) {
    console.log(e);
  }
}

export async function addGallery(photos) {
  try {
    const urls = await uploadRamadassImages(photos);
    urls.map(async (photo) => {
      await updateDoc(doc(db, "ramadass/ramadass"), {
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
    await updateDoc(doc(db, "ramadass/ramadass"), {
      gallery: arrayRemove(photo),
    });
  } catch (e) {
    console.log(e);
  }
}
