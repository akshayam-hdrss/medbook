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

export async function uploadCompanyImages(photos) {
  try {
    const uploadPromises = photos.map((file) => {
      const storageRef = ref(storage, `companiesgallery/${file.name}`);
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
export async function addCompany(data, photo = null,cover=null,name) {
  try {
    let profile;
    if (photo != null) {
      profile = await uploadIcons(photo, "companies");
      data.profile = profile;
    }
    if (cover != null) {
        cover = await uploadIcons(cover, "companies");
        data.cover = cover;
      }
    const result = await updateDoc(doc(db,"companies", `${name}`), data);
    console.log("update company");
  } catch (e) {
    console.log(e);
  }
}
export async function getCompany(name) {
  try {
    const result = await getDoc(doc(db, "companies", `${name}`));
    if (result.exists()) {
      return result.data();
    }
  } catch (e) {
    console.log(e);
  }
}

export async function getGallery(name) {
  try {
    const snapshot = await getDoc(doc(db,`companies/${name}`));
    return snapshot.data().gallery;
  } catch (e) {
    console.log(e);
  }
}

export async function addGallery(photos,name) {
  try {
    const urls = await uploadCompanyImages(photos);
    urls.map(async (photo) => {
      await updateDoc(doc(db, `companies/${name}`), {
        gallery: arrayUnion(photo),
      });
    });
  } catch (e) {
    console.log(e);
  }
}

export async function deleteGalleryPhoto(photo,name) {
  try {
    const storageRef = ref(storage, photo);
    await deleteObject(storageRef);
    await updateDoc(doc(db, `companies/${name}`), {
      gallery: arrayRemove(photo),
    });
  } catch (e) {
    console.log(e);
  }
}
